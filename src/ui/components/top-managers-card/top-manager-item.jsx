import st from './item.module.scss'
import { Avatar, Text } from '@gravity-ui/uikit'
import { formatNumber } from '@/utils/formatter.js'
import { getAvatarUrl } from '@/utils/url-resolver.js'
import { useMemo } from 'react'

const COLORS = ['#4361ee', '#f72585', '#7209b7']
const SIZE = 110
const ALL_CORNERS = [
    { top: -SIZE / 2, left: -SIZE / 2 },
    { top: -SIZE / 2, left: `calc(100% - ${ SIZE / 2 }px)` },
    { top: `calc(100% - ${ SIZE / 2 }px)`, left: -SIZE / 2 },
    { top: `calc(100% - ${ SIZE / 2 }px)`, left: `calc(100% - ${ SIZE / 2 }px)` },
]

function TopManagerItem({ firstName, lastName, sale, avatar, colorIndex }) {
    const fullName = firstName + ' ' + lastName

    const bubbles = useMemo(() =>
        [...ALL_CORNERS].sort(() => Math.random() - 0.5).slice(0, 3),
    [])

    return (
        <div className={ st.card } style={ { background: COLORS[colorIndex] } }>
            { bubbles.map((b, i) => (
                <div
                    key={ i }
                    className={ st.bubble }
                    style={ { top: b.top, left: b.left } }
                />
            )) }
            <div className={ st.content }>
                <Avatar
                    size={ 'xl' }
                    text={ fullName }
                    theme={ 'brand' }
                    imgUrl={ getAvatarUrl(avatar) }/>
                <Text variant={ 'subheader-3' } className={ st.name }>{ fullName }</Text>
                <Text className={ st.sale } variant={ 'body-1' }>{ formatNumber(sale) } so'm</Text>
            </div>
        </div>
    )
}

export default TopManagerItem
