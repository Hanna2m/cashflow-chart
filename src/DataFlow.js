import { useState, useEffect } from "react";
import axios from 'axios';
import getPeriodFlow from "./utils/getPeriodFlow";

const getData = async() => {
  try {
    const result = await axios.get('https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws/transactions',{
      headers: {
        'Authorization': '34044a757e0385e54e8c5141bad3bb3abb463727afac3cccb8e31d313db9a370'
      }
    })
    return result;
  } catch (error) {
    console.log(error)
  }
}

export const DataFlow = async() => {
  const fetchData = async() => {
    const response = await getData()
    console.log('response', response)
    return response.data;
  }
  const data = await fetchData()
  console.log(data)
  return data
} 
