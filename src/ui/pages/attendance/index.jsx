import { useGetTodayAttendances, useRegisterAttendanceMutation } from "@/services/manager/query.js";
import { TableSkeleton } from '@/ui/components/skeleton/index.jsx'
import ManagerAttendanceTable from "@/ui/components/manager-attendance-table/index.jsx";

function AttendancePage() {
    const attendances = useGetTodayAttendances()
    const registerAttendance = useRegisterAttendanceMutation()

    const attendanceRegister = (userId) => {
        registerAttendance.mutate({ userId })
    }

    return (
        <div>
            { attendances.isLoading ? <TableSkeleton rows={ 10 }/> :
                <>
                    <ManagerAttendanceTable
                        data={ attendances.data }
                        onAttendanceRegisterClick={ attendanceRegister }/>
                </>
            }
        </div>
    )
}

export default AttendancePage