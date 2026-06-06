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

  let maximumProfit = 0;

  for (const record of data) {
    if (record.time > n) continue;

    const currentProfit =
      (n - record.time) * record.earn;

    const futureProfit =
      maxProfit(n - record.time);

    maximumProfit = Math.max(
      maximumProfit,
      currentProfit + futureProfit
    );
  }

  memo[n] = maximumProfit;
  return maximumProfit;
}

console.log(maxProfit(7));
console.log(maxProfit(8));
console.log(maxProfit(13));
