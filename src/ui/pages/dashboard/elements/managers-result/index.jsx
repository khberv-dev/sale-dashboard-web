import st from './main.module.scss'
import { getAvatarUrl } from "@/utils/url-resolver.js";
import { Avatar } from "@gravity-ui/uikit";
import { formatNumber, formatTime } from "@/utils/formatter.js";
import ProgressBar from "@/ui/pages/dashboard/progress-bar/index.jsx";

function ManagersResult({ daily, total, ...props }) {
    return (
        <div
            className={ st.container }
            { ...props }>
            <div className={ st.header }>
                <div className={ st.headerTitle }>
                    Sotuvchilar natijalari
                </div>
            </div>
            <table cellSpacing={ 0 } style={ { width: '100%' } }>
                <tbody>
                { total.map((manager, index) =>
                    <tr key={ index }>
                        <td width={ 30 }>{ index + 1 }</td>
                        <td width={ 50 }>
                            <Avatar
                                size={ 'm' }
                                text={ manager.firstName + ' ' + manager.lastName }
                                imgUrl={ getAvatarUrl(manager.avatar) }/>
                        </td>
                        <td className={ st.managerName }>
                            <span>
                                { manager.firstName }
                            </span>
                            <br/>
                            <span>
                                { manager.lastName }
                            </span>
                        </td>
                        <td className={ st.managerSale }>
                            { formatNumber(manager.sale) + ' UZS' }
                        </td>
                        <td className={ st.managerPlan }>
                            { formatNumber(manager.plan) + ' UZS' }
                        </td>
                        <td className={ st.managerSaleRate }>
                            { manager.leadCount ? (manager.saleCount / manager.leadCount * 100).toFixed(2) + '%' : '-' }
                        </td>
                        <td>
                            { formatTime(manager.callDuration) }
                        </td>
                        <td width={ 300 }>
                            <div style={ { display: 'flex', alignItems: 'center', gap: '8px' } }>
                                <ProgressBar
                                    progress={ manager.sale / manager.plan * 100 }
                                    color={ manager.sale / manager.plan > 0.8 ? '#23c45f' : '#f97316' }
                                    style={ { flex: '1' } }/>
                                <div style={ { width: '30px' } }>
                                    { (manager.sale / manager.plan * 100).toFixed() + '%' }
                                </div>
                            </div>
                        </td>
                    </tr>
                ) }
                </tbody>
            </table>
        </div>
    )
}

export default ManagersResult