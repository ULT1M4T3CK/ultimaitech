# VYBR!S Downloads

- **VYBRIS-Install.exe** – Windows setup wizard (primary). Built from installer/VYBRIS-Install.py.
- **VYBRIS-Install.sh** – Mac/Linux bootstrap. Fetches zip and runs wizard.
- **vybris-1.0.0.zip** – Full package, fetched by the installers.

To build the .exe (on Windows):
```
cd VYBRIS/installer && build-exe.bat
```
Copy VYBRIS-Install.exe to this folder.

To update:
1. Run `./create-release.sh 1.0.1` in VYBRIS
2. Copy vybris-1.0.0.zip, VYBRIS-Install.sh, VYBRIS-Install.exe here
3. Update ZIP_URL in both installers if version changed
