import React, { useEffect, useState } from "react";
import { Line,Bar } from 'react-chartjs-2';
import axios from 'axios';
import './Dashboard.css';
import Sidebar from "./Sidebar";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, BarElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, BarElement);
const Dashboard=()=>{
const [data,setData] = useState({ labels: [], values: [] });

useEffect(()=>{
    const fetchData = async()=>{
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');

            const labels = response.data.slice(0,5).map(post=>post.title)
            const values = response.data.slice(0,5).map(post=>post.id)

            setData({labels,values})
        }
        catch(err){
            console.error(err)
        }
    }
    fetchData();

    
},[])

const chartData={
    labels: data.labels,
    datasets: [
        {
          label: 'Dummy Data from JSONPlaceholderc (Line)',
          data: data.values,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
        },
      ],
}

const barChartData={
    labels: data.labels,
    datasets: [
        {
          label: 'Dummy Data from JSONPlaceholderc (bar)',
          data: data.values,
          backgroundColor: 'rgba(75,192,192,0.5)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        },
      ],

}
return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {data ? (
        <div className="chart-container">
            <h3>Line Graph</h3>
            <Line data={chartData} />
            <h3>Bar Graph</h3>
            <Bar data={barChartData}/>
            </div>
        
      ) : (
        <p>Loading chart...</p>
      )}
      <div >
        <Sidebar></Sidebar>

    </div>
    </div>
    
  )
}

export default Dashboard;