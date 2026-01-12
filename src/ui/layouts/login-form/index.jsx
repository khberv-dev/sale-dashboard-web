import st from './main.module.scss'
import { Button, Card, Text, TextInput, useToaster } from '@gravity-ui/uikit'
import { useForm } from 'react-hook-form'
import { useSignInMutation } from '@/services/auth/query.js'
import { useEffect } from 'react'

function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const signIn = useSignInMutation()
    const { add } = useToaster()

    const onSubmit = (data) => {
        signIn.mutate({ ...data })
    }

    useEffect(() => {
        if (signIn.error) {
            const message = signIn.error.response.data.message

            add({
                name: 'login-error',
                content: message,
                theme: 'danger'
            })
        }
    }, [signIn.error])

    return (
        <Card className={ st.container }>
            <form onSubmit={ handleSubmit(onSubmit) } className={ st.form }>
                <Text style={ { textAlign: 'center' } } variant={ 'header-1' }>Tizimga kirish</Text>
                <TextInput
                    placeholder={ 'Login' }
                    { ...register('username', { required: true }) }/>
                <TextInput
                    placeholder={ 'Parol' }
                    type={ 'password' }
                    { ...register('password', { required: true }) }/>
                <Button view={ 'action' } type={ 'submit' }>Login</Button>
            </form>
        </Card>
    )
}

export default LoginForm