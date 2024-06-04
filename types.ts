export enum CURRENCY  {
    AED = "AED",
    USD = "USD",
}

export interface Rows {
    title: string;
    price: number;
    currency: CURRENCY;
}
