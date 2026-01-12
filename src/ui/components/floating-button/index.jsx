import st from './main.module.scss'
import { Button, Icon } from '@gravity-ui/uikit'

function FloatingButton({ icon, onClick }) {
    return (
        <Button
            size={'xl'}
            className={ st.button }
            onClick={ onClick }
            view={ 'action' }>
            <Icon data={ icon }/>
        </Button>
    )
}

export default FloatingButton