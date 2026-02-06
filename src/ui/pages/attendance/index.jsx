import { useGetTodayAttendances, useRegisterAttendanceMutation } from "@/services/manager/query.js";
import { Spin } from "@gravity-ui/uikit";
import ManagerAttendanceTable from "@/ui/components/manager-attendance-table/index.jsx";

function AttendancePage() {
    const attendances = useGetTodayAttendances()
    const registerAttendance = useRegisterAttendanceMutation()

    const attendanceRegister = (userId) => {
        registerAttendance.mutate({ userId })
    }

    return (
        <div>
            { attendances.isLoading ? <Spin/> :
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