export default function getDayBalance(startDate, endBalance, dayCashFlow) {
  const chartData = [];
  console.log(dayCashFlow)
  let balance = endBalance;

  const length = dayCashFlow.length

  for (let i = length-1; i >=0 ; i-- ){
    if (dayCashFlow[i].status !== 'CANCELLED'){
      chartData.push({date: new Date(dayCashFlow[i].date), balance: balance})
      balance -= dayCashFlow[i].amount;
    }
  }
  return chartData
}