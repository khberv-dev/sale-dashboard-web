import { Line } from "react-chartjs-2"
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from "chart.js"
import { formatCompact } from "@/utils/formatter.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${ r },${ g },${ b },${ alpha })`
}

function LineChart({ saleData, color }) {
    const data = {
        labels: saleData.map((_, index) => index + 1),
        datasets: [
            {
                label: "Sotuv",
                data: saleData,
                borderColor: color,
                backgroundColor: (context) => {
                    const { ctx, chartArea } = context.chart
                    if (!chartArea) return hexToRgba(color, 0.15)
                    const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
                    g.addColorStop(0, hexToRgba(color, 0.2))
                    g.addColorStop(1, hexToRgba(color, 0))
                    return g
                },
                fill: true,
                tension: 0.4,
                pointRadius: 2,
                pointHoverRadius: 5,
                borderWidth: 2,
            },
        ],
    }

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (item) => ' ' + formatCompact(item.raw),
                },
            },
        },
        scales: {
            x: {
                grid: { color: '#00000000' },
                ticks: {
                    color: '#6b7280',
                    font: { family: "'Sora'", size: 10 },
                },
            },
            y: {
                grid: { color: '#1f232e' },
                ticks: {
                    color: '#6b7280',
                    font: { family: "'Sora'", size: 10 },
                    callback: (value) => formatCompact(value),
                },
            },
        },
    }

    return <Line data={ data } options={ options }/>
}

export default LineChart
