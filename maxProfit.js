// Brute Force Solution

const data = [
    {name: 'T', time:5, earn: 1500},
    {name:'P', time:4, earn: 1000},
    {name:'CP', time:10, earn: 2000}
]
// function maxProfit(n) {
//   let maximumProfit = 0;
//
//   for (const record of data) {
//     if (record.time > n) continue;
//
//     const currentProfit =
//       (n - record.time) * record.earn;
//
//     // Recursive call to calculate future profit ( to be optimized using dynamic programming )
//     const futureProfit =
//       maxProfit(n - record.time);
//
//     maximumProfit = Math.max(
//       maximumProfit,
//       currentProfit + futureProfit
//     );
//   }
//
//   return maximumProfit;
// }
//
// console.log(maxProfit(n=13));

// Dynamic Programming Solution ( Above solution + memoization )

const memo = {};

function maxProfit(n) {

  if (n in memo) {
    return memo[n];
  }

  let maxProfitVal = 0;
  let solutions = [];

  for (const building of data) {

    if (building.time > n) {
      continue;
    }

    const currentProfit =
      (n - building.time) * building.earn;

    const future =
      maxProfit(n - building.time);

    const actualProfit =
      currentProfit + future.profit;

    const actualSolutions =
      future.solutions.map(solution => ({
        ...solution,
        [building.name]:
          solution[building.name] + 1
      }));

    if (actualProfit > maxProfitVal) {

      maxProfitVal = actualProfit;
      solutions = actualSolutions;

    } else if (
      actualProfit === maxProfitVal
    ) {

      solutions.push(...actualSolutions);
    }
  }

  if (solutions.length === 0) {
    solutions.push({
      T: 0,
      P: 0,
      C: 0
    });
  }

  memo[n] = {
    profit: maxProfitVal,
    solutions
  };

  return memo[n];
}

function formatSolution(solution) {
  return `T: ${solution.T} P: ${solution.P} C: ${solution.C}`;
}

function printOutput(n) {
  const output = maxProfit(n);
  console.log(`Earnings: $${output.profit}`);
  console.log('Solutions');
  output.solutions.forEach((solution, i) => {
    console.log(`${i + 1}. ${formatSolution(solution)}`);
  });
}

printOutput(13);
printOutput(7);
printOutput(8);
printOutput(49);
