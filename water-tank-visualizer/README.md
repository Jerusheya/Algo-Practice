# Water Tank Visualizer

This folder contains a small frontend project that visualizes the classic water-trapping problem using HTML, CSS, and JavaScript.

## What this project does
- Accepts a list of block heights as input
- Computes the total trapped water
- Displays the result visually in the browser

## Project structure

- index.html — main page layout
- script.js — input handling and visualization logic
- css/
  - styles.css — base layout and table styling
  - animation.css — water fill animation

## Run locally
From this folder, run:

```bash
npx serve .
```

This will start a simple local server and provide a URL you can open in your browser to view the visualizer.

## Usage notes
- Enter sample inputs such as:
  - 0,4,0,0,0,6,0,6,4,0
  - 3,0,2,0,4
  - 5,0,1,0,5
- Click Generate to see the visualization and computed water output.

## Related project
For the main repository overview, see the solution section in the root README.
