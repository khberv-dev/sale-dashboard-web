import st from './main.module.scss'
import { Avatar, Button, Icon, Label, Text, TextInput } from '@gravity-ui/uikit'
import { SettingsSkeleton } from '@/ui/components/skeleton/index.jsx'
import useAuthContext from '@/providers/auth/useAuthContext.js'
import { Controller, useForm } from 'react-hook-form'
import NumberInput from '@/ui/components/number-input/index.jsx'
import { useGetMonthPlanQuery, useSetMonthPlanMutation } from '@/services/manager/query.js'
import { extractNumber, formatNumber } from '@/utils/formatter.js'
import { useUpdatePasswordMutation } from '@/services/auth/query.js'
import LinkTelegramButton from '@/ui/components/link-telegram-button/index.jsx'
import { getAvatarUrl } from '@/utils/url-resolver.js'
import { ArrowRightFromSquare, CircleDollar, Gear, Person, Pencil } from '@gravity-ui/icons'

function SettingsPage() {
    const monthPlan = useGetMonthPlanQuery()
    const setMonthPlan = useSetMonthPlanMutation()
    const updatePassword = useUpdatePasswordMutation()
    const { handleSubmit, control, reset } = useForm()
    const updatePasswordForm = useForm()
    const auth = useAuthContext()

    const user = auth.user
    const fullName = user.firstName + (user.lastName ? ' ' + user.lastName : '')

    const onLogoutClick = () => auth.logOut()

    const onPlanFormSubmit = async (data) => {
        await setMonthPlan.mutateAsync({ plan: extractNumber(data.plan) })
        reset()
    }

    const onPasswordUpdateFormSubmit = async (data) => {
        await updatePassword.mutateAsync(data)
        updatePasswordForm.reset()
    }

    if (monthPlan.isLoading) return <SettingsSkeleton/>

    return (
        <div className={ st.page }>
            <div className={ st.inner }>

                {/* ── Profile card ── */}
                <div className={ st.profileCard }>
                    <div className={ st.profileBanner }/>
                    <div className={ st.profileBody }>
                        <Avatar
                            className={ st.profileAvatar }
                            size="xl"
                            text={ fullName }
                            imgUrl={ getAvatarUrl(user.avatar) }
                            theme="brand"
                        />
                        <div className={ st.profileInfo }>
                            <Text variant="header-2" className={ st.profileName }>{ fullName }</Text>
                            <Text variant="body-2" className={ st.profileUsername }>@{ user.username }</Text>
                            <Label theme={ user.role === 'ADMIN' ? 'info' : 'normal' } size="s">
                                { user.role }
                            </Label>
                        </div>
                    </div>
                </div>

                {/* ── Monthly plan ── */}
                <div className={ st.card }>
                    <div className={ st.sectionHeader }>
                        <span className={ st.iconWrap } style={ { background: '#eff6ff' } }>
                            <Icon data={ CircleDollar } size={ 16 } style={ { color: '#4f8ef7' } }/>
                        </span>
                        <Text variant="subheader-2">Oylik plan</Text>
                    </div>
                    <div className={ st.divider }/>
                    <form className={ st.form } onSubmit={ handleSubmit(onPlanFormSubmit) }>
                        <Controller
                            name="plan"
                            control={ control }
                            render={ ({ field }) =>
                                <NumberInput
                                    defaultValue={ formatNumber(monthPlan.data) }
                                    placeholder="Oylik plan miqdori"
                                    { ...field }/>
                            }/>
                        <Button view="action" type="submit" width="max">Saqlash</Button>
                    </form>
                </div>

                {/* ── Password ── */}
                <div className={ st.card }>
                    <div className={ st.sectionHeader }>
                        <span className={ st.iconWrap } style={ { background: '#f0fdf4' } }>
                            <Icon data={ Pencil } size={ 16 } style={ { color: '#22c55e' } }/>
                        </span>
                        <Text variant="subheader-2">Parol yangilash</Text>
                    </div>
                    <div className={ st.divider }/>
                    <form
                        className={ st.form }
                        onSubmit={ updatePasswordForm.handleSubmit(onPasswordUpdateFormSubmit) }>
                        <TextInput
                            type="password"
                            placeholder="Eski parol"
                            size="l"
                            { ...updatePasswordForm.register('oldPassword', { required: true }) }
                        />
                        <TextInput
                            type="password"
                            placeholder="Yangi parol"
                            size="l"
                            { ...updatePasswordForm.register('password', { required: true }) }
                        />
                        <TextInput
                            type="password"
                            placeholder="Parolni tasdiqlang"
                            size="l"
                            { ...updatePasswordForm.register('passwordConfirm', { required: true }) }
                        />
                        <Button view="action" type="submit" width="max">O'zgartirish</Button>
                    </form>
                </div>

                {/* ── Integrations ── */}
                <div className={ st.card }>
                    <div className={ st.sectionHeader }>
                        <span className={ st.iconWrap } style={ { background: '#eff6ff' } }>
                            <Icon data={ Person } size={ 16 } style={ { color: '#4361ee' } }/>
                        </span>
                        <Text variant="subheader-2">Integratsiyalar</Text>
                    </div>
                    <div className={ st.divider }/>
                    <div className={ st.integrationRow }>
                        <div className={ st.integrationLabel }>
                            <Text variant="body-2" color="secondary">Telegram botini ulash orqali bildirishnomalar olishingiz mumkin</Text>
                        </div>
                        <LinkTelegramButton userId={ user.id }/>
                    </div>
                </div>

                {/* ── Logout ── */}
                <div className={ st.logoutCard } onClick={ onLogoutClick }>
                    <span className={ st.logoutIconWrap }>
                        <Icon data={ ArrowRightFromSquare } size={ 20 }/>
                    </span>
                    <div className={ st.logoutText }>
                        <span className={ st.logoutTitle }>Tizimdan chiqish</span>
                        <span className={ st.logoutSub }>{ fullName } · { user.username }</span>
                    </div>
                    <span className={ st.logoutArrow }>→</span>
                </div>

            </div>
        </div>
    )
}

export default SettingsPage
