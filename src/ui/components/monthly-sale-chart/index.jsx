import { Line } from 'react-chartjs-2'
import { generateLastMonths } from '@/utils/generator.js'
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from 'chart.js'
import { formatCompact } from '@/utils/formatter.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

function MonthlySaleChart({ saleData }) {
    const data = {
        labels: generateLastMonths(),
        datasets: [
            {
                label: 'Oylik sotuv',
                data: saleData,
                tension: 0.5,
                borderColor: '#90c536',
                backgroundColor: (context) => {
                    const { ctx, chartArea } = context.chart
                    if (!chartArea) return 'rgba(144,197,54,0.1)'
                    const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
                    g.addColorStop(0, 'rgba(144,197,54,0.25)')
                    g.addColorStop(1, 'rgba(144,197,54,0)')
                    return g
                },
                fill: true,
                pointRadius: 3,
                pointHoverRadius: 6,
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
                grid: { color: 'transparent' },
                ticks: { color: '#6b7280', font: { size: 10 } },
            },
            y: {
                grid: { color: 'rgba(0,0,0,0.06)' },
                ticks: {
                    color: '#6b7280',
                    font: { size: 10 },
                    callback: (value) => formatCompact(value),
                },
            },
        },
    }

    return <Line data={ data } options={ options }/>
}

export default MonthlySaleChart
