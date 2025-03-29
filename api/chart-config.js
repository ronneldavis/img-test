const chartConfig = {
    "data": {
        "labels": [
            "2015"
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

module.exports = chartConfig; 