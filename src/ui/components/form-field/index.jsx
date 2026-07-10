import { Text } from '@gravity-ui/uikit'
import st from './main.module.scss'

function FormField({ label, children }) {
    return (
        <div className={ st.field }>
            <Text variant={ 'body-2' } color={ 'secondary' } className={ st.label }>{ label }</Text>
            { children }
        </div>
    )
}

export default FormField
