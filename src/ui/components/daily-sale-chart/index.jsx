import { Bar } from 'react-chartjs-2'
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js'
import { generateMonthDays } from '@/utils/generator.js'
import { formatCompact } from '@/utils/formatter.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function DailySaleChart({ saleData }) {
    const data = {
        labels: generateMonthDays(),
        datasets: [
            {
                label: 'Kunlik sotuv',
                data: saleData,
                backgroundColor: (context) => {
                    const { ctx, chartArea } = context.chart
                    if (!chartArea) return 'rgba(79,142,247,0.8)'
                    const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
                    g.addColorStop(0, 'rgba(79,142,247,0.85)')
                    g.addColorStop(1, 'rgba(79,142,247,0.25)')
                    return g
                },
                borderRadius: 6,
                borderSkipped: false,
                barThickness: 10,
                hoverBackgroundColor: 'rgba(79,142,247,1)',
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

    return (
        <Bar data={ data } options={ options }/>
    )
}

export default DailySaleChart
