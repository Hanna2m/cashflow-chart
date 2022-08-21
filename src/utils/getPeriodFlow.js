import {format, addDays } from 'date-fns';
import getDayBalance from './getDayBalance';

export default function getPeriodFlow (startDate, period, endBalance, dayCashFlow) {
  const length = dayCashFlow.length
  const periodStart = format(addDays(new Date(dayCashFlow[length-1].date), -period+1), 'yyyy-MM-dd')
  const periodCashFlow = dayCashFlow.filter((item) => format(new Date(item.date), 'yyyy-MM-dd') >= periodStart)
  console.log('data to show: ', periodCashFlow)
  const dayBalance = getDayBalance(startDate, endBalance,periodCashFlow);

  return dayBalance.sort((a,b) =>{return new Date(a.date) - new Date(b.date)} )
}
