import { TextInput } from '@gravity-ui/uikit'
import { formatNumber } from '@/utils/formatter.js'

function NumberInput({ value, onChange, ...props }) {
    const handleInputChange = (e) => {
        const val = e.target.value
        const formatted = formatNumber(val)

        onChange(formatted)
    }

    return (
        <TextInput
            { ...props }
            value={ value }
            onChange={ handleInputChange }
        />
    )
}

export default NumberInput