const ROWS = 10;
const COLS = 20;

const tableEle = document.getElementById('grid');
const inputEle = document.getElementById('tankInput');
const inputDisplay = document.getElementById('inputDisplay');
const outputDisplay = document.getElementById('outputDisplay');
const generateBtn = document.getElementById('generateBtn');

const updateTable = (rowVal, colVal) => {

    const fragment = document.createDocumentFragment();

    for (let rowIndex = 0; rowIndex < rowVal; rowIndex++) {

        const row = document.createElement('tr');

        for (let colIndex = 0; colIndex < colVal; colIndex++) {
            row.appendChild(document.createElement('td'));
        }

        fragment.appendChild(row);
    }

    tableEle.appendChild(fragment);
};

const clearTank = () => {

    for (const row of tableEle.rows) {

        for (const cell of row.cells) {

            cell.classList.remove('wall');
            cell.classList.remove('water');
        }
    }
};

const calculateWaterVolume = (tank) => {

    let left = 0;
    let right = tank.length - 1;

    let leftMax = 0;
    let rightMax = 0;

    let waterVol = 0;

    while (left < right) {

        if (tank[left] <= tank[right]) {

            leftMax = Math.max(leftMax, tank[left]);
            waterVol += leftMax - tank[left];
            left++;

        } else {

            rightMax = Math.max(rightMax, tank[right]);
            waterVol += rightMax - tank[right];
            right--;
        }
    }

    return waterVol;
};

const renderWaterTank = (tank) => {

    clearTank();

    const leftMaxArr = [];
    const rightMaxArr = [];

    leftMaxArr[0] = tank[0];

    for (let i = 1; i < tank.length; i++) {
        leftMaxArr[i] = Math.max(
            leftMaxArr[i - 1],
            tank[i]
        );
    }

    rightMaxArr[tank.length - 1] = tank[tank.length - 1];

    for (let i = tank.length - 2; i >= 0; i--) {
        rightMaxArr[i] = Math.max(
            rightMaxArr[i + 1],
            tank[i]
        );
    }

    const rows = tableEle.rows;
    const maxRows = rows.length;

    for (let colIndex = 0; colIndex < tank.length; colIndex++) {

        const wallHeight = tank[colIndex];
        const waterHeight = Math.max(
            0,
            Math.min(
                leftMaxArr[colIndex],
                rightMaxArr[colIndex]
            ) - wallHeight
        );

        // Painting walls

        for (let h = 0; h < wallHeight; h++) {
            const rowIndex = maxRows - 1 - h;
            if (rowIndex >= 0) {
                rows[rowIndex]
                    .cells[colIndex]
                    .classList.add('wall');
            }
        }

        // Painting water

        for (let h = wallHeight;h < wallHeight + waterHeight; h++ ) {
            const rowIndex = maxRows - 1 - h;
            if (rowIndex >= 0) {
                rows[rowIndex]
                    .cells[colIndex]
                    .classList.add('water');
            }
        }
    }

    inputDisplay.textContent =
        `Input: [${tank.join(', ')}]`;

    outputDisplay.textContent =
        `Output: ${calculateWaterVolume(tank)} Units`;
};

const generateTank = () => {

    const tank = inputEle.value
        .split(',')
        .map(item => Number(item.trim()))
        .filter(item => !Number.isNaN(item));

    if (!tank.length) {
        return;
    }

    renderWaterTank(tank);
};

// Create table only once
updateTable(ROWS, COLS);

generateBtn.addEventListener(
    'click',
    generateTank
);

// Initial render
generateTank();