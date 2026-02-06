import { AsideHeader } from '@gravity-ui/navigation'
import { CircleDollar, FileText, Gear, House, ListCheck, Pencil, Persons, SquareListUl } from '@gravity-ui/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuthContext from '@/providers/auth/useAuthContext.js'
import useLocalStorage from '@/hooks/useLocalStorage.js'
import NavFooter from '@/ui/layouts/side-navigation/nav-footer.jsx'

function SideNavigation({ children }) {
    const auth = useAuthContext()
    const [navState, setNavState] = useLocalStorage('nav', { compact: false })
    const location = useLocation()
    const nav = useNavigate()

    const toggleCompact = () => {
        setNavState(old => ({ ...old, compact: !old.compact }))
    }

    const menuItems = [
        {
            title: 'Asosiy',
            icon: House,
            link: ''
        },
        {
            title: 'Sotuv',
            icon: SquareListUl,
            link: 'sales'
        },
        {
            title: 'Sotuv turlari',
            icon: Pencil,
            link: 'sale-types',
            forAdmin: true
        },
        {
            title: 'Menejerlar',
            icon: Persons,
            link: 'managers',
            forAdmin: true
        },
        {
            title: 'Davomat',
            icon: ListCheck,
            link: 'attendances',
            forAdmin: true
        },
        {
            title: 'Shartnomalar',
            icon: FileText,
            link: 'contracts',
            forAdmin: true
        },
        {
            title: 'Sozlamalar',
            icon: Gear,
            link: 'settings'
        }
    ].filter(item => !item.forAdmin || item.forAdmin && auth.user.role === 'ADMIN')
        .map(item => ({
            ...item,
            current: location.pathname === `/${ item.link }`,
            onItemClick: () => {
                nav(item.link)
            }
        }))

    const logo = {
        text: 'Sotuv',
        icon: CircleDollar,
        onClick: toggleCompact
    }

    const footer = () => {
        return <NavFooter
            user={ auth.user }
            isCompact={ navState.compact }/>
    }

    return (
        <AsideHeader
            logo={ logo }
            compact={ navState.compact }
            menuItems={ menuItems }
            renderContent={ () => children }
            renderFooter={ footer }/>
    )
}

export default SideNavigation