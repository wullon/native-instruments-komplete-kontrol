Native-Instruments Komplete Kontrol
==================================

Initial support for Native Instruments Komplete Kontrol S25 Controller in Bitwig Studio

Installation:

Load the "Komplete Kontrol S25 Bitwig.ncc" into the Native Instruments Controller Editor and sync with your keyboard.

Install the file "KompleteKontrolS25.control.js" into your user directory/Documents/Bitwig Studio/Controller Scripts/Native Instruments

Functions:

There are three Presets "Mix", "Track" and "Device" that can be switched with the arrows on the right end of the Komplete Kontrol.

"Mix" controls the volume of 8 tracks.
"Track" controls the volume of the selected/cursor track, pan and up to 6 sends.
"Device" controls the 8 macros of the selected/cursor device.

The transport controls do what is expected, but the "Stop" button has a special function:
If you press it quickly, it stops transport.
If you press and hold it and press "Loop" at the same time, you toggle through the three modes mentioned above.
If you press and hold "Stop" and press "RWD" or "FFW" at the same time, you navigate:
In "Mix" mode you can move the track banck up and down.
In "Track" mode you move the track selection up and down.
In "Device" mode you select the cursor decice.

The reason for this slightly convoluted structure is, that the controller doesn't send anything to Bitwig Studio when you select a different Preset. Only after a knob is moved, Bitwig knows which mode it is in. Since you may not always want to wiggle a know to let Bitwig know, there is the alternate mode with the stop and loop button combined.
