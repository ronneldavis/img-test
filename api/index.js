const { createCanvas } = require('@napi-rs/canvas');
const Chart = require('chart.js/auto');

const chartConfig = {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Monthly Sales',
            data: [65, 59, 80, 81, 56, 55],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

module.exports = async (req, res) => {
    try {
        const canvas = createCanvas(800, 400);
        const ctx = canvas.getContext('2d');

        // Create chart
        new Chart(ctx, chartConfig);

        // Set response headers
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', 'attachment; filename=chart.png');

        // Get the PNG buffer and send it
        const pngData = await canvas.encode('png');
        res.send(pngData);
    } catch (error) {
        res.status(500).send('Error generating image: ' + error.message);
    }
};
