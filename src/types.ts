
export interface Dictionary<T> {
    [key: string]: T;
}

export interface ExchangeRates {
    [key: string]: {
        name: string;
        rate: number;
    };
}
