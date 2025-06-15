# OBS Studio Clock Widgets

A collection of customizable clock widgets for OBS Studio, deployable via GitHub Pages.

## Features

- Multiple clock styles (digital, analog, stopwatch, countdown)
- Easy to use in OBS as Browser Sources
- Responsive design
- Customizable through URL parameters

## How to Use

1. Deploy this repository to GitHub Pages
2. In OBS Studio, add a new Browser Source
3. Use one of the following URLs (replace `yourusername` with your GitHub username):

   - Simple Digital Clock: `https://yourusername.github.io/repo/?clock=digital-simple`
   - Modern Digital Clock: `https://yourusername.github.io/repo/?clock=digital-modern`
   - Simple Analog Clock: `https://yourusername.github.io/repo/?clock=analog-simple`
   - Minimal Analog Clock: `https://yourusername.github.io/repo/?clock=analog-minimal`
   - Stopwatch: `https://yourusername.github.io/repo/?clock=stopwatch`
   - Countdown Timer: `https://yourusername.github.io/repo/?clock=countdown`
   - Date Display: `https://yourusername.github.io/repo/?clock=date-display`
   - Timezone Clock: `https://yourusername.github.io/repo/?clock=timezone`

4. Customize the width/height in OBS as needed

## Customization

You can customize some clocks with URL parameters:

- Stopwatch controls appear automatically when added to OBS
- Countdown timer can be controlled with on-screen buttons
- For digital clocks, you can add `&color=hexcode` to change the text color
- For analog clocks, add `&size=300` to change the size

## Development

To run locally:
1. Clone this repository
2. Open `index.html` in a browser
3. Make changes as needed
4. Commit and push to deploy to GitHub Pages
