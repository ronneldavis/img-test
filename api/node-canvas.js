const { createCanvas } = require('canvas');
const Chart = require('chart.js/auto');
const chartConfig = require('./chart-config');

module.exports = async (req, res) => {
    try {
        const canvas = createCanvas(800, 400);
        const ctx = canvas.getContext('2d');

        // Create chart
        new Chart(ctx, chartConfig);

        // Set response headers
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', 'attachment; filename=node-canvas-chart.png');

        // Stream the canvas directly to response
        const stream = canvas.createPNGStream();
        stream.pipe(res);
    } catch (error) {
        res.status(500).send('Error generating image: ' + error.message);
    }
}; 