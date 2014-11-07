Native-Instruments Komplete Kontrol
==================================

Basic support for Native Instruments Komplete Kontrol S Controllers in Bitwig Studio.

Installation:

Load the "Komplete Kontrol S Bitwig.ncc" into the Native Instruments Controller Editor and sync with your keyboard.

Install the file "KompleteKontrolS.control.js" into your user directory/Documents/Bitwig Studio/Controller Scripts/Native Instruments

Functions:

There are three Presets "Mix", "Track" and "Device" that can be switched with the arrows on the right end of the Komplete Kontrol.

"Mix" controls the volume of 8 tracks.
"Track" controls the volume of the selected/cursor track, pan and up to 6 sends.
"Device" controls the 8 macros of the selected/cursor device.

The transport controls do what is expected, but the "Stop" button has a special function:
If you press it quickly, it stops transport.
If you press and hold it and press "Loop" at the same time, you cycle through the three modes mentioned above.

If you press and hold "Stop" and press "RWD" or "FFW" at the same time, you navigate:
In "Mix" mode you can move the track bank up and down.
In "Track" mode you move the track selection up and down.
In "Device" mode you select the cursor decice.

Known Issues:
- Autodetection does not work so far for unclear reasons.
- You need to manually install the controller and select the three inputs and outputs in the order they show up in the dropdowns.
- The script does currently not work on Linux as far as we know.
- If you use the Komplete Kontrol VST, you need to switch between the different instances of the plugin with the "INSTANCE" button on the controller.
- To switch to above mentioned Bitwig Studio functions, you need to switch to "Midi" with the "INSTANCE" button.
