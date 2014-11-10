Native-Instruments Komplete Kontrol
==================================

Basic support for Native Instruments Komplete Kontrol S Controllers in Bitwig Studio.

Installation:

Load the "Komplete Kontrol S Bitwig.ncc" into the Native Instruments Controller Editor and sync with your keyboard.

Install the file "KompleteKontrolS.control.js" into your user directory -> /Documents/Bitwig Studio/Controller Scripts/Native Instruments

Functions:

The transport controls do what is expected, but the "Stop" button has a special function:
If you press it quickly, it stops transport.
If you press and hold it and press "Loop" at the same time, you cycle through the available modes:
- "Mix Mode" controls the volume of 8 tracks.
- "Track Mode" controls the volume of the selected/cursor track, pan and up to 6 sends.
- "Device Mode" controls the 8 macros of the selected/cursor device.
- "User Mode" controls 2 banks of 8 user assignable controls.

If you press and hold "Stop" and press "RWD" or "FFW" at the same time, you navigate:
- In "Mix Mode" you can move the track bank up and down.
- In "Track Mode" you move the track selection up and down.
- In "Device Mode" you select the cursor decice.
- In "User Mode" you select User Bank 1 with RWD and User Bank 2 with FFW.

Known Issues:
- The script does currently not work on Linux as far as we know.
- If you use the Komplete Kontrol VST, you need to switch between the different instances of the plugin with the "INSTANCE" button on the controller.
- To switch to above mentioned Bitwig Studio functions, you need to switch to "MIDI MODE" with the "INSTANCE" button.
