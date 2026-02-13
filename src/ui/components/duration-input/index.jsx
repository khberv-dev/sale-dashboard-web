import { TextInput } from "@gravity-ui/uikit";
import { useState } from "react";
import { formatDuration } from "@/utils/formatter.js";

function DurationInput({ onChange }) {
    const [value, setValue] = useState('')

    const handleChange = (e) => {
        const value = formatDuration(e.target.value)

        setValue(value)
        onChange(value)
    }

    return (
        <TextInput
            placeholder={ '00:00:00' }
            value={ value }
            onChange={ handleChange }/>
    )
}

export default DurationInput