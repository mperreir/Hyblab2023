"use strict";

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [1970, 1979, 1988, 2000, 2010, 2020],
        datasets: [{
            data: [1587600, 1262700, 1016800, 663800, 490000, 390000],
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        legend:
        {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    fontSize: 15
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    fontSize: 15,
                    min: 1587600,
                    max: 390000,
                    stepSize: 50000,
                    callback: function (value, index, values) {
                        if (value === 1587600 || value === 390000) {
                            return value;
                        }
                    }
                },
            }]
        },
        animation: {
            duration: 2000,
            easing: "easeInOutQuad"
        }
    }
});
