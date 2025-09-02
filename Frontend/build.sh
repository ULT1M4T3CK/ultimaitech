#!/bin/bash
echo "Installing dependencies..."
npm ci

echo "Building project..."
./node_modules/.bin/vite build

echo "Build completed!"
