import { Skeleton } from '@gravity-ui/uikit'
import s from './skeleton.module.scss'

const ROW_PATTERNS = [
    [30, 120, 100, 80, 90, 60],
    [30, 110, 80,  90, 70, 60],
    [30, 130, 90,  80, 100, 60],
    [30, 100, 110, 70, 80, 60],
    [30, 120, 85,  95, 75, 60],
]

export function TableSkeleton({ rows = 8 }) {
    return (
        <div className={ s.tableWrap }>
            {/* header */}
            <div className={ s.headerRow }>
                { [40, 60, 100, 80, 70, 90].map((w, i) =>
                    <Skeleton key={ i } style={ { width: w, height: 12, borderRadius: 6 } }/>
                ) }
            </div>
            {/* rows */}
            { Array.from({ length: rows }, (_, i) =>
                <div key={ i } className={ s.row }>
                    { ROW_PATTERNS[i % ROW_PATTERNS.length].map((w, j) =>
                        <Skeleton key={ j } style={ { width: w, height: 14, borderRadius: 6 } }/>
                    ) }
                </div>
            ) }
        </div>
    )
}

export function DashboardSkeleton() {
    return (
        <div className={ s.dashPage }>
            {/* summary cards */}
            <div className={ s.dashSummary }>
                { [1, 2, 3].map(i =>
                    <div key={ i } className={ s.dashCard }>
                        <Skeleton style={ { width: 80, height: 11, borderRadius: 4 } }/>
                        <Skeleton style={ { width: '70%', height: 28, borderRadius: 6, marginTop: 12 } }/>
                        <Skeleton style={ { width: '90%', height: 6, borderRadius: 3, marginTop: 16 } }/>
                    </div>
                ) }
                <div className={ s.dashCard } style={ { width: 350, flex: 'none' } }>
                    <Skeleton style={ { width: 120, height: 11, borderRadius: 4 } }/>
                    { [1, 2, 3].map(i =>
                        <div key={ i } className={ s.dashTopItem }>
                            <Skeleton style={ { width: 36, height: 36, borderRadius: '50%' } }/>
                            <div style={ { flex: 1 } }>
                                <Skeleton style={ { width: '60%', height: 12, borderRadius: 4 } }/>
                                <Skeleton style={ { width: '40%', height: 11, borderRadius: 4, marginTop: 4 } }/>
                            </div>
                        </div>
                    ) }
                </div>
            </div>
            {/* charts */}
            <div className={ s.dashCharts }>
                <div className={ s.dashChartCard }>
                    <Skeleton style={ { width: '100%', height: '100%', borderRadius: 0 } }/>
                </div>
                <div className={ s.dashChartCard }>
                    <Skeleton style={ { width: '100%', height: '100%', borderRadius: 0 } }/>
                </div>
            </div>
            {/* table */}
            <div className={ s.dashTableWrap }>
                { Array.from({ length: 6 }, (_, i) =>
                    <div key={ i } className={ s.dashTableRow }>
                        <Skeleton style={ { width: 24, height: 24, borderRadius: '50%' } }/>
                        <Skeleton style={ { width: 100, height: 13, borderRadius: 5 } }/>
                        <Skeleton style={ { flex: 1, height: 8, borderRadius: 4 } }/>
                        <Skeleton style={ { width: 60, height: 13, borderRadius: 5 } }/>
                    </div>
                ) }
            </div>
        </div>
    )
}

export function HomeSkeleton() {
    return (
        <div className={ s.homePage }>
            {/* top cards */}
            <div className={ s.homeTop }>
                <div className={ s.homeCard } style={ { width: 350 } }>
                    <Skeleton style={ { width: 120, height: 13, borderRadius: 5 } }/>
                    <Skeleton style={ { width: '80%', height: 32, borderRadius: 6, marginTop: 10 } }/>
                    <Skeleton style={ { width: '60%', height: 13, borderRadius: 5, marginTop: 8 } }/>
                    <div style={ { display: 'flex', gap: 8, marginTop: 16 } }>
                        { [80, 100, 90].map((w, i) =>
                            <Skeleton key={ i } style={ { width: w, height: 24, borderRadius: 20 } }/>
                        ) }
                    </div>
                </div>
                <div className={ s.homeCard } style={ { flex: 1, display: 'flex', gap: 16 } }>
                    { [1, 2, 3].map(i =>
                        <div key={ i } style={ {
                            flex: 1, display: 'flex', flexDirection: 'column',
                            alignItems: 'center', gap: 10
                        } }>
                            <Skeleton style={ { width: 56, height: 56, borderRadius: '50%' } }/>
                            <Skeleton style={ { width: '70%', height: 12, borderRadius: 4 } }/>
                            <Skeleton style={ { width: '50%', height: 11, borderRadius: 4 } }/>
                        </div>
                    ) }
                </div>
            </div>
            {/* filter bar */}
            <Skeleton style={ { width: '100%', height: 44, borderRadius: 12, marginTop: 16 } }/>
            {/* detail */}
            <div className={ s.homeDetail }>
                <TableSkeleton rows={ 7 }/>
                <div className={ s.homeCharts }>
                    <Skeleton style={ { width: '100%', height: 180, borderRadius: 12 } }/>
                    <Skeleton style={ { width: '100%', height: 180, borderRadius: 12 } }/>
                </div>
            </div>
        </div>
    )
}

export function SettingsSkeleton() {
    return (
        <div className={ s.settingsPage }>
            {/* profile card */}
            <div className={ s.settingsCard } style={ { padding: 0, overflow: 'hidden' } }>
                <Skeleton style={ { width: '100%', height: 72, borderRadius: 0 } }/>
                <div style={ { padding: '0 24px 20px', marginTop: -20, display: 'flex', gap: 14, alignItems: 'flex-end' } }>
                    <Skeleton style={ { width: 56, height: 56, borderRadius: '50%', flexShrink: 0 } }/>
                    <div style={ { display: 'flex', flexDirection: 'column', gap: 6, paddingBottom: 4 } }>
                        <Skeleton style={ { width: 160, height: 16, borderRadius: 5 } }/>
                        <Skeleton style={ { width: 100, height: 12, borderRadius: 4 } }/>
                        <Skeleton style={ { width: 60, height: 20, borderRadius: 10 } }/>
                    </div>
                </div>
            </div>
            {/* form cards */}
            { [120, 180].map((h, i) =>
                <div key={ i } className={ s.settingsCard }>
                    <div style={ { display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 } }>
                        <Skeleton style={ { width: 32, height: 32, borderRadius: 8 } }/>
                        <Skeleton style={ { width: 140, height: 14, borderRadius: 5 } }/>
                    </div>
                    <Skeleton style={ { width: '100%', height: 1, borderRadius: 0, marginBottom: 16 } }/>
                    <div style={ { display: 'flex', flexDirection: 'column', gap: 10 } }>
                        { Array.from({ length: i === 0 ? 1 : 3 }, (_, j) =>
                            <Skeleton key={ j } style={ { width: '100%', height: 36, borderRadius: 8 } }/>
                        ) }
                        <Skeleton style={ { width: '100%', height: 36, borderRadius: 8 } }/>
                    </div>
                </div>
            ) }
            {/* logout */}
            <Skeleton style={ { width: '100%', height: 72, borderRadius: 16 } }/>
        </div>
    )
}
