// Native Instruments Komplete Kontrol S25

loadAPI(1);

host.defineController("Native Instruments", "Komplete Kontrol S25", "1.0", "c196a280-50a8-11e4-916c-0800200c9a66");
host.defineMidiPorts(3, 3);
host.addDeviceNameBasedDiscoveryPair(["Komplete Kontrol- 1", "Komplete Kontrol EXT- 1", "Komplete Kontrol DAW-1"], ["Komplete Kontrol-1", "Komplete Kontrol EXT-1", "Komplete Kontrol DAW-1"]);

var LOWEST_CC = 1;
var HIGHEST_CC = 119;

var KK = {
play : 94,
stop : 93,
rec : 95,
loop : 86,
rwd : 91,
ffw : 92,
pressed : false
};

KK.isPlaying = false;
KK.isRecording = false;
KK.isLoop = false;
KK.stopTime = false;
KK.modeName = ["Mix", "Track", "Device"];
KK.mode = 0;

KK.trackHasChanged = false;
KK.deviceHasChanged = false;

function init()
{
   KK.note = host.getMidiInPort(0).createNoteInput("NI Komplete Kontrol", "??????");
   KK.note.setShouldConsumeEvents(false);
   KK.note.assignPolyphonicAftertouchToExpression(0, NoteExpression.TIMBRE_UP, 2)

   host.getMidiInPort(0).setMidiCallback(onMidi);
   host.getMidiInPort(0).setSysexCallback(onSysex);
   host.getMidiInPort(1).setMidiCallback(onMidi1);
   host.getMidiInPort(1).setSysexCallback(onSysex1);
   host.getMidiInPort(2).setMidiCallback(onMidi2);
   host.getMidiInPort(2).setSysexCallback(onSysex2);

   // Make CCs freely mappable
   userControls = host.createUserControlsSection(HIGHEST_CC - LOWEST_CC + 1);

   for(var i=LOWEST_CC; i<=HIGHEST_CC; i++)
   {
      userControls.getControl(i - LOWEST_CC).setLabel("CC" + i);
   }

   transport = host.createTransport();
   cTrack = host.createCursorTrack(6, 0);
   cDevice = cTrack.getPrimaryDevice();
   tracks = host.createTrackBank(8, 0, 0);

   setIndications();

   // Observer:
   transport.addIsPlayingObserver(function(on) {
      KK.isPlaying = on;
      host.getMidiOutPort(2).sendMidi(144, KK.play, on ? 127 : 0);
      host.getMidiOutPort(2).sendMidi(144, KK.stop, on ? 0 : 127);
   });
   transport.addIsRecordingObserver(function(on) {
      KK.isRecording = on;
      host.getMidiOutPort(2).sendMidi(144, KK.rec, on ? 127 : 0);
   });
   transport.addIsLoopActiveObserver(function(on) {
      KK.isLoop = on;
      host.getMidiOutPort(2).sendMidi(144, KK.loop, on ? 127 : 0);
   });

   cTrack.addNameObserver(50, "None", function(name) {
      if (KK.trackHasChanged) {
         host.showPopupNotification("Track: " + name);
         KK.trackHasChanged = false;
      }
   })
   cDevice.addNameObserver(50, "None", function(name) {
      if (KK.deviceHasChanged) {
         host.showPopupNotification("Device: " + name);
         KK.deviceHasChanged = false;
      }
   })
}



function onMidi(status, data1, data2)
{
   println("Midi 0")
   printMidi(status, data1, data2);

   if (isChannelController(status))
   {
      var inc = 0;
      if (data2 < 64) {
         inc = data2;
      }
      else {
         inc = -(128 - data2);
      }
      if (data1 >= 14 && data1 < 22) {
         if (KK.mode != 0) {
            KK.mode = 0;
            setIndications();
            host.showPopupNotification(KK.modeName[KK.mode]);
         }
         tracks.getTrack(data1-14).getVolume().inc(inc, 255);
      }
      else if (data1 >= 22 && data1 < 30) {
         if (KK.mode != 1) {
            KK.mode = 1;
            setIndications();
            host.showPopupNotification(KK.modeName[KK.mode]);
         }
         if (data1 === 22) {
            cTrack.getVolume().inc(inc, 255);
         }
         else if (data1 === 23) {
            cTrack.getPan().inc(inc, 255);
         }
         else {
            cTrack.getSend(data1-24).inc(inc, 255);
         }
      }
      else if (data1 >= 30 && data1 < 38) {
         if (KK.mode != 2) {
            KK.mode = 2;
            setIndications();
            host.showPopupNotification(KK.modeName[KK.mode]);
         }
         cDevice.getMacro(data1-30).getAmount().inc(inc, 255);
      }
   }
}
function onMidi1(status, data1, data2)
{
   println("Midi 1")
   printMidi(status, data1, data2);
}

function onMidi2(status, data1, data2) {
   println("Midi 2")
   printMidi(status, data1, data2);

   if (isNoteOn(status)) {
      if (data2 > 64) {
         //code
         switch(data1) {
            case KK.play:
               transport.play();
               break;
            case KK.stop:
               KK.stopTime = true;
               KK.pressed = true;
               host.scheduleTask(setStopTimer, null, 400);
               break;
            case KK.rec:
               transport.record()
               break;
            case KK.loop:
               if (KK.pressed) {
                  KK.mode = (KK.mode + 1) % 3;
                  host.showPopupNotification(KK.modeName[KK.mode]);
                  setIndications();
               }
               else {
                  transport.toggleLoop();
               }
               break;
            case KK.ffw:
               if (KK.pressed) {
                  switch (KK.mode) {
                     case 0:
                        tracks.scrollTracksDown();
                        break;
                     case 1:
                        KK.trackHasChanged = true;
                        cTrack.selectNext();
                        break;
                     case 2:
                        KK.deviceHasChanged = true;
                        cDevice.switchToDevice(DeviceType.ANY,ChainLocation.NEXT);
                        break;
                  }
               }
               else {
                  transport.fastForward();
               }
               break;
            case KK.rwd:
               if (KK.pressed) {
                  switch (KK.mode) {
                     case 0:
                        tracks.scrollTracksUp();
                        break;
                     case 1:
                        KK.trackHasChanged = true;
                        cTrack.selectPrevious();
                        break;
                     case 2:
                        KK.deviceHasChanged = true;
                        cDevice.switchToDevice(DeviceType.ANY,ChainLocation.PREVIOUS);
                        break;
                  }
               }
               else {
                  transport.rewind();
               }
               break;
         }
      }
      else {
         switch(data1) {
            case KK.play:
               break;
            case KK.stop:
               if (KK.stopTime) {
                  transport.stop();
               }
               KK.pressed = false;
               break;
            case KK.rec:
               break;
            case KK.loop:
               break;
            case KK.ffw:
               break;
            case KK.rwd:
               break;
         }
      }
   }
}

function setStopTimer () {
   KK.stopTime = false;
   host.showPopupNotification(KK.modeName[KK.mode]);
}

function setIndications () {
   var mix = false;
   var track = false;
   var device = false;
   switch (KK.mode) {
      case 0:
         mix = true;
         break;
      case 1:
         track = true;
         break;
      case 2:
         device = true;
         break;
   }
   for (var i = 0; i < 8; i++) {
      tracks.getTrack(i).getVolume().setIndication(mix);
      cDevice.getMacro(i).getAmount().setIndication(device);
   }
   cTrack.getVolume().setIndication(track);
   cTrack.getPan().setIndication(track);
   for (var j = 0; j < 6; j++) {
      cTrack.getSend(j).setIndication(track);
   }

}

function onSysex(data) {
   println("Sysex0")
   printSysex(data);
}
function onSysex1(data) {
   println("Sysex1")
   printSysex(data);
}
function onSysex2(data) {
   println("Sysex2")
   printSysex(data);
}
function exit()
{
}
