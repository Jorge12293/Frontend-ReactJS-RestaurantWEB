import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);
const data = {
  labels: [
    'Red',
    'Green',
    'Yellow'
  ]
  ,
  datasets: [{
    data: [200, 50, 100],
    backgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ]
  }]
};
function Anillo() {
  return (
    <div>

        
        <h2 style={{ color:'white' }}>Doughnut Example</h2>
        <div style={{ background:'white' ,position: "relative", margin: "auto", width: "80vw", height: '70vh' }}>
            <Doughnut 
                data={data} 
                width={50}
                height={50}
                options={{
                    maintainAspectRatio: false
                }}
            />
    
        </div>
    </div>
    
  );
}
export default Anillo;