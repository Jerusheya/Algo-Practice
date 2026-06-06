# Algo-Practice

This repository contains a collection of practice projects and algorithmic solutions designed to strengthen problem-solving, frontend implementation, and React application skills.

## Overview

The work is organized into three parts:

1. Max Profit Problem — an algorithmic optimization challenge
2. Water Tank Visualizer — an interactive frontend visualization
3. Team Workflow Board — a small React + TypeScript project

---

## 1. Max Profit Problem

### Problem Statement
Mr. X wants to develop properties on a strip of land in Mars Land. He can choose from the following building types:

- Theatre
  - Build time: 5 units
  - Land usage: 2 x 1 parcel
  - Earnings: $1500 per unit of operation
- Pub
  - Build time: 4 units
  - Land usage: 1 x 1 parcel
  - Earnings: $1000 per unit of operation
- Commercial Park
  - Build time: 10 units
  - Land usage: 3 x 1 parcel
  - Earnings: $2000 per unit of operation

### Key Rules
- He has unlimited land capacity for this problem.
- Only one property can be developed at a time.
- The goal is to determine the best combination of properties for a given time unit input, n.
- The output format should indicate the number of each property developed:
  - T = Theatre
  - P = Pub
  - C = Commercial Park

### Example Test Cases
- Input time: 7
  - Example output earnings: $3000
- Input time: 8
  - Example output earnings: $4500
- Input time: 13
  - Example output earnings: $16500

### Solution File
- File: maxProfit.js
- Run with:
  ```bash
  node maxProfit.js
  ```

---

## 2. Water Tank Visualizer

### Goal
This project demonstrates the classic water trapping problem using a simple web interface built with HTML, CSS, and JavaScript.

### What It Does
- Accepts block heights as input
- Computes the total units of water trapped between the blocks
- Visualizes the solution in the browser for easier understanding

### How to Run
For the local web preview, use the following command from the water-tank-visualizer folder:

```bash
npx serve .
```

Then open the generated local URL in your browser.

For the full setup notes and usage guide, see:

- water-tank-visualizer/README.md

---

## 3. Team Workflow Board

### Goal
This project is a React + TypeScript application that simulates a simple team workflow board.

### Reference
For implementation details, setup instructions, and project structure, please refer to:

- team-workflow-board/README.md

---

## Project Structure

- maxProfit.js
- water-tank-visualizer/
- team-workflow-board/

## Summary

This repository combines algorithm practice, frontend visualization, and React application development into one learning workspace for hands-on problem solving.

