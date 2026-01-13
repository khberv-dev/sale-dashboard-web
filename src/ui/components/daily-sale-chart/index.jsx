import { Bar } from 'react-chartjs-2'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { generateMonthDays } from '@/utils/generator.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

function DailySaleChart({ saleData }) {
    const data = {
        labels: generateMonthDays(),
        datasets: [
            {
                label: 'Kunlik sotuv',
                data: saleData,
                backgroundColor: '#414575',
                barThickness: 10
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    }

    return (
        <Bar
            data={ data }
            options={ options }/>
    )
}

export default DailySaleChart