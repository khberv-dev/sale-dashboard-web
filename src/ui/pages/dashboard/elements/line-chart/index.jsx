import { Line } from "react-chartjs-2";

function LineChart({ saleData, color }) {
    const data = {
        labels: saleData.map((sale, index) => index + 1),
        datasets: [
            {
                label: "Sotuv",
                data: saleData,
                borderColor: color,
                backgroundColor: (context) => {
                    const g = context.chart.ctx.createLinearGradient(
                        0,
                        0,
                        0,
                        200,
                    );
                    g.addColorStop(0, "rgba(79,142,247,0.18)");
                    g.addColorStop(1, "rgba(79,142,247,0)");
                    return g;
                },
                fill: true,
                tension: 0.4,
                pointRadius: 2,
                borderWidth: 2
            },
        ],
    }

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false
        },
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    color: '#00000000',
                    borderColor: '#00000000',
                },
                ticks: {
                    color: '#6b7280',
                    font: {
                        family: "'Sora'",
                        size: '10px'
                    }
                }
            },
            y: {
                grid: {
                    color: '#1f232e',
                    borderColor: '#1f232e',
                },
                ticks: {
                    minRotation: 30,
                    color: '#6b7280',
                    font: {
                        family: "'Sora'",
                        size: '10px'
                    },
                    callback: function (value) {
                        return value / 1_000_000 + ' mln'
                    }
                }
            }
        }
    }

    return (
        <Line
            data={ data }
            options={ options }/>
    )
}

export default LineChart