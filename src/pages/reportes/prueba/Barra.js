import React from 'react';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Mes',
      backgroundColor: ['rgba(255,99,132,1)', "blue", "green", "blue", "red", "blue"],
      borderColor: ['rgba(255,99,132,1)', "blue", "green", "blue", "red", "blue"],
      borderWidth: 1,
      hoverBackgroundColor: ['rgba(255,99,132,0.4)', "blue", "green", "blue", "red", "blue"],
      hoverBorderColor: ['rgba(255,99,132,1)', "blue", "green", "blue", "red", "blue"],
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
function Barra() {
  return (
    <div>
        <h2 style={{ color:'white' }}>Bar Example (custom size)</h2>
        <div style={{ background:'white' ,position: "relative", margin: "auto", width: "80vw", height: '70vh' }}>
            <Bar
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
export default Barra;