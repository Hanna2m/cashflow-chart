import { useState, useEffect } from "react";
import { format } from "date-fns";
import './App.css';
import LineChart from './components/LineChart';
import getPeriodFlow from "./utils/getPeriodFlow";
import { DataFlow } from "./DataFlow"



function App() {
  const [transactionData, setTransactionData] = useState();
  const [userData, setUserData] = useState(null)
  const [period, setPeriod] = useState(3);
  let isFetching = false;

  const fetchData = async () => {
    if (!transactionData && !isFetching) {
      isFetching = true
      try {
        const data = await DataFlow()
        setTransactionData(data.transactions);
      } finally {
        isFetching = false;
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [])
  useEffect(()=>{
    if (transactionData) {
      updateUserData()
    }
  }, [period])

  const updateUserData = () => {
    const numberOfDays = transactionData.length 
    transactionData.sort((a,b) =>{return new Date(a.date) - new Date(b.date)} )
    const periodEnd = new Date(transactionData[numberOfDays - 1].date)
    const fetchedUserData = getPeriodFlow(periodEnd, period, endBalance, transactionData);

    console.log('fetched', fetchedUserData)

    const rawUserData = {labels: [], usersGain: []};
    fetchedUserData.forEach(userData => {
      rawUserData.labels.push(format(userData.date, 'dd.MMM'));
      rawUserData.usersGain.push(userData.balance);
    })
  
    setUserData({
      labels: rawUserData.labels,
      datasets: [
        {
          label: "User balance",
          data: rawUserData.usersGain,
          backgroundColor: [
            "#f3ba2f"
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }
  const endBalance = 118;

  if (!transactionData) {
    return "Loading...";
  } 

  if (!userData) {
    updateUserData();
    return "Loading..."
  }

  return (
    <>
    <div className="balance-info">
      <h2>Balance: {endBalance} EUR</h2>
    </div>
    <div className='filter'>
      <button className='custom-button' onClick={()=>{setPeriod(3)}}>3 days</button>
      <button className='custom-button' onClick={()=>{setPeriod(5)}}>5 days</button>
      <button className='custom-button' onClick={()=>{setPeriod(30)}}>1 month</button>
      <button className='custom-button' onClick={()=>{setPeriod(90)}}>3 months</button>
    </div>
    <div className="App">
      <LineChart chartData={userData}/>
    </div>
    </>
    
  );
}

export default App;
