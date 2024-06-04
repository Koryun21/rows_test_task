import { DataFetcher } from './DataFetcher';
import { CURRENCY, Rows } from "./types";

// GET: http://example.com/get-rows
// [
//     {
//         "title": "Foo",
//         "price": 123,
//         "currency": "RUB",
//     },
//     {
//         "title": "Foo",
//         "price": 5,
//         "currency": "USD",
//     },
// ]


const convertor: Record<CURRENCY, string> =  {
    [CURRENCY.AED]: 'AED',
    [CURRENCY.USD]: "$"
}

export class RowsReport {
    data_fetcher: DataFetcher;
    private readonly CONVERSION_RATE = 34.13;

    constructor() {
        this.data_fetcher = new DataFetcher();
    }

    private get_format_price (price: number, currency: string): string {
        switch (currency) {
            case CURRENCY.AED:
                return price + convertor[currency]
            case CURRENCY.USD:
                return convertor[currency] + price
            default:
                return String(price)
        }
    }

    private get_formated_report (rows:Rows[]) {
        const {report_sum, report_text} = rows.reduce((acc,row) => {
            return {
                report_sum: row.currency === CURRENCY.AED? acc.report_sum + row.price: acc.report_sum + row.price * this.CONVERSION_RATE,
                report_text: acc.report_text + '\n' + row.title + ': ' + this.get_format_price(row.price, row.currency)
            }
        },{
            report_sum: 0,
            report_text: ''
        })

        return report_text + '\nTotal Amount: ' + this.get_format_price(report_sum, "AED")
    }

    async get_report(dateFrom: string): Promise<string> {
        try{
            const rows = await this.data_fetcher.get<Rows[]>('/get-rows', {dateFrom})
            return this.get_formated_report(rows)
        }catch (error){
            throw error
        }

    }
}
