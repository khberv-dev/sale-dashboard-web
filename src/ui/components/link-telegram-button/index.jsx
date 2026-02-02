import st from './main.module.scss'
import icTelegram from '@/assets/icTelegram.svg'

function LinkTelegramButton({ userId }) {
    const onLinkButtonClick = () => {
        window.open(`https://t.me/iteach_staff_bot?start=${ userId }`)
    }

    return (
        <div
            className={ st.buttonContainer }
            onClick={ onLinkButtonClick }>
            <img
                className={ st.telegramIcon }
                src={ icTelegram }
                alt="telegram"/>
            <span className={ st.linkTitle }>Telegram ulash</span>
        </div>
    )
}

export default LinkTelegramButton