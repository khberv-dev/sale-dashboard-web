import st from './main.module.scss'
import { Button, Card, Spin, Text, TextInput } from '@gravity-ui/uikit'
import useAuthContext from '@/providers/auth/useAuthContext.js'
import { Controller, useForm } from 'react-hook-form'
import NumberInput from '@/ui/components/number-input/index.jsx'
import { useGetMonthPlanQuery, useSetMonthPlanMutation } from '@/services/manager/query.js'
import { extractNumber, formatNumber } from '@/utils/formatter.js'
import { useUpdatePasswordMutation } from '@/services/auth/query.js'
import LinkTelegramButton from "@/ui/components/link-telegram-button/index.jsx";

function SettingsPage() {
    const monthPlan = useGetMonthPlanQuery()
    const setMonthPlan = useSetMonthPlanMutation()
    const updatePassword = useUpdatePasswordMutation()
    const { handleSubmit, control, reset } = useForm()
    const updatePasswordForm = useForm()
    const auth = useAuthContext()

    const onLogoutClick = () => {
        auth.logOut()
    }

    const onPlanFormSubmit = async (data) => {
        await setMonthPlan.mutateAsync({
            plan: extractNumber(data.plan)
        })
        reset()
    }

    const onPasswordUpdateFormSubmit = async (data) => {
        await updatePassword.mutateAsync(data)
        updatePasswordForm.reset()
    }

    if (monthPlan.isLoading) {
        return <Spin/>
    }

    return (
        <div className={ st.container }>
            <Text variant={ 'header-1' }>Sozlamalar</Text>
            <br/><br/>
            <Card className={ st.profileCard }>
                <form className={ st.formContainer } onSubmit={ handleSubmit(onPlanFormSubmit) }>
                    <Text variant={ 'subheader-1' }>Plan o'zgartirish</Text>
                    <Controller
                        name={ 'plan' }
                        control={ control }
                        render={ ({ field }) =>
                            <NumberInput
                                defaultValue={ formatNumber(monthPlan.data) }
                                placeholder={ 'Oylik plan' }
                                { ...field }/>
                        }/>
                    <Button view={ 'action' } type={ 'submit' }>Saqlash</Button>
                </form>
                <br/><br/>
                <form className={ st.formContainer }
                      onSubmit={ updatePasswordForm.handleSubmit(onPasswordUpdateFormSubmit) }>
                    <Text variant={ 'subheader-1' }>Parol yangilash</Text>
                    <TextInput
                        type={ 'password' }
                        placeholder={ 'Eski parol' }
                        { ...updatePasswordForm.register('oldPassword', { required: true }) }
                    />
                    <TextInput
                        type={ 'password' }
                        placeholder={ 'Yangi parol' }
                        { ...updatePasswordForm.register('password', { required: true }) }
                    />
                    <TextInput
                        type={ 'password' }
                        placeholder={ 'Parolni tasdiqlang' }
                        { ...updatePasswordForm.register('passwordConfirm', { required: true }) }
                    />
                    <Button view={ 'action' } type={ 'submit' }>O'zgartirish</Button>
                </form>
                <br/>
                <LinkTelegramButton userId={ auth.user.id }/>
                <br/><br/>
                <Button
                    onClick={ onLogoutClick }
                    view={ 'outlined-danger' }>Tizimdan chiqish</Button>
            </Card>
        </div>
    )
}

export default SettingsPage