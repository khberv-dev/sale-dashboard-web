import { Line } from 'react-chartjs-2'
import { generateLastMonths } from '@/utils/generator.js'
import { Chart as ChartJS, LineElement, PointElement } from 'chart.js'

ChartJS.register(
    PointElement,
    LineElement
)

function MonthlySaleChart({ saleData }) {
    const data = {
        labels: generateLastMonths(),
        datasets: [
            {
                label: 'Oylik sotuv',
                data: saleData,
                tension: 0.5,
                borderColor: '#90c536',
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
        <Line data={ data } options={ options }/>
    )
}

export default MonthlySaleChart