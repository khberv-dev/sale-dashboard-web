import st from './main.module.scss'
import { Button, Card, Text } from '@gravity-ui/uikit'
import useAuthContext from '@/providers/auth/useAuthContext.js'

function SettingsPage() {
    const auth = useAuthContext()

    const onLogoutClick = () => {
        auth.logOut()
    }

    return (
        <div className={ st.container }>
            <Text variant={ 'header-1' }>Sozlamalar</Text>
            <br/><br/>
            <Card className={ st.profileCard }>
                <Button
                    onClick={ onLogoutClick }
                    view={ 'outlined-danger' }>Tizimdan chiqish</Button>
            </Card>
        </div>
    )
}

export default SettingsPage