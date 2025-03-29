const { createCanvas } = require('@napi-rs/canvas');
const Chart = require('chart.js/auto');
const { MatrixController, MatrixElement } = require('chartjs-chart-matrix');

Chart.register(MatrixController, MatrixElement);

const chartConfig = {
    "data": {
        "datasets": [
            {
                "data": [
                    {
                        "v": 1,
                        "x": 1,
                        "y": 5
                    },
                    {
                        "v": 3,
                        "x": 1,
                        "y": 6
                    },
                    {
                        "v": 1,
                        "x": 2,
                        "y": 0
                    },
                    {
                        "v": 9,
                        "x": 2,
                        "y": 1
                    },
                    {
                        "v": 2,
                        "x": 2,
                        "y": 2
                    },
                    {
                        "v": 2,
                        "x": 2,
                        "y": 4
                    },
                    {
                        "v": 2,
                        "x": 2,
                        "y": 5
                    },
                    {
                        "v": 1,
                        "x": 2,
                        "y": 6
                    },
                    {
                        "v": 11,
                        "x": 3,
                        "y": 1
                    },
                    {
                        "v": 1,
                        "x": 3,
                        "y": 2
                    },
                    {
                        "v": 1,
                        "x": 3,
                        "y": 3
                    },
                    {
                        "v": 4,
                        "x": 3,
                        "y": 4
                    },
                    {
                        "v": 1,
                        "x": 3,
                        "y": 6
                    },
                    {
                        "v": 4,
                        "x": 4,
                        "y": 0
                    },
                    {
                        "v": 17,
                        "x": 4,
                        "y": 1
                    },
                    {
                        "v": 1,
                        "x": 4,
                        "y": 2
                    },
                    {
                        "v": 2,
                        "x": 4,
                        "y": 4
                    },
                    {
                        "v": 9,
                        "x": 5,
                        "y": 0
                    },
                    {
                        "v": 3,
                        "x": 5,
                        "y": 1
                    },
                    {
                        "v": 1,
                        "x": 5,
                        "y": 2
                    },
                    {
                        "v": 2,
                        "x": 5,
                        "y": 4
                    },
                    {
                        "v": 1,
                        "x": 5,
                        "y": 5
                    }
                ],
                "label": "Order Count",
                "backgroundColor": "rgba(128, 0, 128, 0.6)"
            }
        ]
    },
    "type": "matrix",
    "options": {
        "scales": {
            "x": {
                "grid": {
                    "display": false
                },
                "type": "linear",
                "ticks": {
                    "autoSkip": false,
                    "stepSize": 1
                },
                "offset": true
            },
            "y": {
                "grid": {
                    "display": false
                },
                "type": "linear",
                "ticks": {
                    "autoSkip": false,
                    "stepSize": 1
                },
                "offset": true
            }
        },
        "plugins": {
            "title": {
                "text": "Daily Order Distribution by Week in 2015",
                "display": true
            },
            "legend": {
                "display": false
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
            datasets: config.data.datasets.map(dataset => ({
                ...dataset,
                data: dataset.data.map(item => ({
                    ...item,
                    v: Number(item.v),
                    x: Number(item.x),
                    y: Number(item.y)
                }))
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
