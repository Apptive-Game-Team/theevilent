#!/bin/bash

# Visual Verification Skill
# Purpose: Compile project and run Playwright visual tests to capture and verify screenshots.

echo "=== [Project Skill] Starting Visual Verification ==="

# 1. Check if we are in the correct directory
if [ ! -f "package.json" ]; then
  echo "Error: package.json not found in the current directory."
  exit 1
fi

# 2. Run build to check typescript/vite compilation
echo "Step 1: Running npm run build..."
npm run build
BUILD_STATUS=$?

if [ $BUILD_STATUS -ne 0 ]; then
  echo "Error: Build compilation failed."
  exit $BUILD_STATUS
fi
echo "Build succeeded."

# 3. Run playwright tests to capture screenshots
echo "Step 2: Running Playwright visual tests..."
npx playwright test
PLAYWRIGHT_STATUS=$?

if [ $PLAYWRIGHT_STATUS -ne 0 ]; then
  echo "Error: Playwright visual tests failed."
  exit $PLAYWRIGHT_STATUS
fi

echo "=== [Project Skill] Visual Verification Successful! ==="
echo "Screenshots saved to artifacts directory:"
echo " - screenshot_home.png"
echo " - screenshot_games.png"
echo " - screenshot_team.png"

exit 0
