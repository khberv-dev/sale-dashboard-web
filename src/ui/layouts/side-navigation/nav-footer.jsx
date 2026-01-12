import st from './footer.module.scss'
import { User } from '@gravity-ui/uikit'
import { getAvatarUrl } from '@/utils/url-resolver.js'

function NavFooter({ user, isCompact }) {
    const fullName = user.firstName + ' ' + (user.lastName ? user.lastName : '')
    const avatar = {
        text: fullName,
        imgUrl: getAvatarUrl(user.avatar),
        theme: 'brand',
        size: 'l'
    }

    return (
        <div className={ st.container }>
            <User
                avatar={ avatar }
                name={ !isCompact ? fullName : null }
                description={ !isCompact ? user.username : null }/>
        </div>
    )
}

export default NavFooter