const { createCanvas } = require('@napi-rs/canvas');
const Chart = require('chart.js/auto');

const chartConfig = {
    "data": {
        "labels": [
            2015
        ],
        "datasets": [
            {
                "data": [
                    32
                ],
                "label": "Number of Orders",
                "borderColor": "rgba(75, 192, 192, 1)",
                "borderWidth": 1,
                "backgroundColor": "rgba(75, 192, 192, 0.2)"
            }
        ]
    },
    "type": "bar",
    "options": {
        "plugins": {
            "title": {
                "text": "Yearly Order Count",
                "display": true
            },
            "datalabels": {
                "display": false
            }
        },
        "responsive": true,
        "maintainAspectRatio": false
    }
};

// Function to convert dataset format
function convertDatasetFormat(config) {
    return {
        ...config,
        data: {
            ...config.data,
            labels: config.data.labels.map(String),
            datasets: config.data.datasets.map(dataset => ({
                ...dataset,
                data: dataset.data.map(Number)
            }))
        }
    };
}

module.exports = async (req, res) => {
    try {
        const canvas = createCanvas(800, 400);
        const ctx = canvas.getContext('2d');

        // Convert dataset format and create chart
        const convertedConfig = convertDatasetFormat(chartConfig);
        new Chart(ctx, convertedConfig);

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
