import { useGetContracts } from '@/services/contract/query.js'
import ContractsTable from '@/ui/components/contracts-table/index.jsx'

function ContractPage() {
    const { data: contracts } = useGetContracts()

    return (
        <div>
            { contracts ?
                <ContractsTable data={ contracts }/>
                : '' }
        </div>
    )
}

export default ContractPage