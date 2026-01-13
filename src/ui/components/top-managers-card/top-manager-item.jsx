import st from './item.module.scss'
import { Avatar, Card, Text } from '@gravity-ui/uikit'
import { formatNumber } from '@/utils/formatter.js'
import { getAvatarUrl } from '@/utils/url-resolver.js'

function TopManagerItem({ firstName, lastName, sale, avatar }) {
    const fullName = firstName + ' ' + lastName

    return (
        <Card className={ st.card }>
            <Avatar
                size={ 'xl' }
                text={ fullName }
                theme={ 'brand' }
                imgUrl={ getAvatarUrl(avatar) }/>
            <Text variant={ 'body-2' }>{ fullName }</Text>
            <Text variant={ 'body-1' } color={ 'positive' }>{ formatNumber(sale) } so'm</Text>
        </Card>
    )
}

export default TopManagerItem