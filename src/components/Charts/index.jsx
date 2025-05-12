import React from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';

const ChartComponents = ({ sortedTransactions }) => {
  // Group data by month and type (income/expense)
  const monthlyData = sortedTransactions.reduce((acc, curr) => {
    const month = moment(curr.date).format('YYYY-MM'); // Format to "YYYY-MM"
    const type = curr.type;
    const amount = Number(curr.amount);

    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    acc[month][type] += amount;

    return acc;
  }, {});

  // Get sorted months and corresponding income/expense data
  const months = Object.keys(monthlyData).sort();  // Sort months in chronological order
  const incomeSeries = months.map((month) => monthlyData[month].income);
  const expenseSeries = months.map((month) => monthlyData[month].expense);

  // Pie chart data for expenses by tag
  const pieData = sortedTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => {
      const tag = curr.tag || 'Other'; // If no tag, categorize as 'Other'
      if (!acc[tag]) acc[tag] = 0;
      acc[tag] += Number(curr.amount);
      return acc;
    }, {});

  const pieLabels = Object.keys(pieData);
  const pieValues = Object.values(pieData);

  return (
    <div
      className="charts-wrapper"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        marginTop: '2rem',
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#f9f9f9',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Bar Chart */}
      <div style={{display: 'flex', gap: '2rem'}}>




      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
          padding: '24px',
          width: '100%',
        }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>
          📊 Monthly Income vs Expenses
        </h2>
        <Chart
          options={{
            chart: {
              type: 'bar',
              height: 400,
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '40%', // Adjust the width of the bars
              },
            },
            xaxis: {
              categories: months, // Use the sorted months
              title: {
                text: 'Month', // Label for the x-axis
              },
              labels: {
                rotate: -45, // Rotate labels for better visibility
              },
            },
            yaxis: {
              title: {
                text: 'Amount (₹)', // Label for the y-axis
              },
              labels: {
                formatter: (val) => `₹${val.toFixed(2)}`, // Format y-axis labels as INR (₹)
              },
            },
            tooltip: {
              shared: true, // Enable shared tooltips
              intersect: false, // Disable intersect to fix the error
              y: {
                formatter: (value) => `₹${value.toFixed(2)}`, // Format tooltip values as INR (₹)
              },
            },
            legend: {
              position: 'top',
              horizontalAlign: 'center',
            },
          }}
          series={[
            { name: 'Income', data: incomeSeries },
            { name: 'Expense', data: expenseSeries },
          ]}
          type="bar"
          height={400}
        />
      </div>

      {/* Pie Chart */}
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
          padding: '24px',
          width: '100%',
        }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>
          💸 Expense Breakdown by Tag
        </h2>
        <Chart
          options={{
            labels: pieLabels,
            legend: { position: 'bottom' },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: { width: 300 },
                  legend: { position: 'bottom' },
                },
              },
            ],
          }}
          series={pieValues}
          type="pie"
          height={400}
        />
      </div>

      </div>
    </div>
  );
};

export default ChartComponents;
