#!/bin/bash
# VYBR!S - One-Click Installer
# Run this file after downloading – the setup wizard opens directly.
# Do not extract any ZIP manually.

set -e
INSTALL_DIR="${VYBRIS_HOME:-$HOME/VYBRIS}"
ZIP_URL="https://ultimaitech.com/downloads/vybris-1.0.0.zip"
ZIP_FILE="/tmp/vybris-download-$$.zip"
WIZARD_WIDTH=480

# Resolve actual install dir (expand ~)
INSTALL_DIR="$(eval echo "$INSTALL_DIR")"

gui_msg() {
  if command -v zenity &>/dev/null; then
    zenity --info --title="VYBR!S" --text="$1" --width=${WIZARD_WIDTH} 2>/dev/null
  elif command -v kdialog &>/dev/null; then
    kdialog --title "VYBR!S" --msgbox "$1" 2>/dev/null
  else
    echo "$1"; read -p "Press Enter..."
  fi
}

gui_error() {
  if command -v zenity &>/dev/null; then
    zenity --error --title="VYBR!S" --text="$1" --width=$((WIZARD_WIDTH+50)) 2>/dev/null
  elif command -v kdialog &>/dev/null; then
    kdialog --title "VYBR!S Error" --error "$1" 2>/dev/null
  else
    echo "ERROR: $1" >&2
  fi
  exit 1
}

# --- Step 1: Download ---
echo "Downloading VYBR!S..."
if command -v curl &>/dev/null; then
  curl -sL -o "$ZIP_FILE" "$ZIP_URL" || { rm -f "$ZIP_FILE"; gui_error "Download failed. Check your internet connection."; }
elif command -v wget &>/dev/null; then
  wget -q -O "$ZIP_FILE" "$ZIP_URL" || { rm -f "$ZIP_FILE"; gui_error "Download failed. Check your internet connection."; }
else
  gui_error "curl or wget is required. Please install one of them."
fi
if [ ! -f "$ZIP_FILE" ] || [ ! -s "$ZIP_FILE" ]; then
  rm -f "$ZIP_FILE"
  gui_error "Download failed. Check your internet connection."
fi

# --- Step 2: Extract ---
echo "Preparing installation..."
mkdir -p "$INSTALL_DIR"
if command -v unzip &>/dev/null; then
  unzip -q -o "$ZIP_FILE" -d "$INSTALL_DIR"
else
  gui_error "unzip is required. Install it with: sudo apt install unzip"
fi
rm -f "$ZIP_FILE"

# Find extracted folder (zip may have a root folder like vybris-1.0.0/)
EXTRACTED="$INSTALL_DIR"
if [ -d "$INSTALL_DIR/vybris-1.0.0" ]; then
  EXTRACTED="$INSTALL_DIR/vybris-1.0.0"
elif [ -d "$INSTALL_DIR/vybris-1.0" ]; then
  EXTRACTED="$INSTALL_DIR/vybris-1.0"
fi

# --- Step 3: Run wizard ---
if [ -f "$EXTRACTED/Install-VYBRIS" ]; then
  chmod +x "$EXTRACTED/Install-VYBRIS"
  exec bash "$EXTRACTED/Install-VYBRIS"
else
  gui_error "Installation files incomplete. Please download again from ultimaitech.com/install"
fi
