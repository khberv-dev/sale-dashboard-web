import st from './main.module.scss'
import LoginForm from '@/ui/layouts/login-form/index.jsx'

function LoginPage() {
    return (
        <div className={ st.body }>
            <LoginForm/>
        </div>
    )
}

export default LoginPage