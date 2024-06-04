import { RowsReport } from './RowsReport.ts'

async function run () {
    const report = new RowsReport();

    try {
        const result = await report.get_report('01.01.2020')
        console.log(result)
    } catch (error) {
        console.error(error)
    }
}