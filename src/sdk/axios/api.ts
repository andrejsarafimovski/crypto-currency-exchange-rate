// tslint:disable
/**
 * Crypto Currency Exchange Rate
 * API for Crypto Currency Exchange Rate
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as globalImportUrl from 'url';
import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface InlineResponse200
 */
export interface InlineResponse200 {
    /**
     * 3-letter crypto currency code
     * @type {string}
     * @memberof InlineResponse200
     */
    cryptoCurrencyCode: string;
    /**
     * 3-letter flat currency code
     * @type {string}
     * @memberof InlineResponse200
     */
    flatCurrencyCode: string;
    /**
     * The exchange rate from crypto to flat currency
     * @type {number}
     * @memberof InlineResponse200
     */
    exchangeRate: number;
    /**
     * Timestamp of the last resync of exchange rates
     * @type {number}
     * @memberof InlineResponse200
     */
    lastUpdate: number;
}
/**
 * 
 * @export
 * @interface InlineResponse400
 */
export interface InlineResponse400 {
    /**
     * Status code of the response
     * @type {number}
     * @memberof InlineResponse400
     */
    code: number;
    /**
     * Error message
     * @type {string}
     * @memberof InlineResponse400
     */
    message: string;
}

/**
 * CryptoCurrencyExchangeRateApi - axios parameter creator
 * @export
 */
export const CryptoCurrencyExchangeRateApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get Exchange Rate of a crypto currency to a flat currency
         * @param {string} cryptoCurrencyCode 
         * @param {string} flatCurrencyCode 
         * @param {boolean} [manualResync] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getExchangeRate: async (cryptoCurrencyCode: string, flatCurrencyCode: string, manualResync?: boolean, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'cryptoCurrencyCode' is not null or undefined
            if (cryptoCurrencyCode === null || cryptoCurrencyCode === undefined) {
                throw new RequiredError('cryptoCurrencyCode','Required parameter cryptoCurrencyCode was null or undefined when calling getExchangeRate.');
            }
            // verify required parameter 'flatCurrencyCode' is not null or undefined
            if (flatCurrencyCode === null || flatCurrencyCode === undefined) {
                throw new RequiredError('flatCurrencyCode','Required parameter flatCurrencyCode was null or undefined when calling getExchangeRate.');
            }
            const localVarPath = `/exchange-rate`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (cryptoCurrencyCode !== undefined) {
                localVarQueryParameter['cryptoCurrencyCode'] = cryptoCurrencyCode;
            }

            if (flatCurrencyCode !== undefined) {
                localVarQueryParameter['flatCurrencyCode'] = flatCurrencyCode;
            }

            if (manualResync !== undefined) {
                localVarQueryParameter['manualResync'] = manualResync;
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CryptoCurrencyExchangeRateApi - functional programming interface
 * @export
 */
export const CryptoCurrencyExchangeRateApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get Exchange Rate of a crypto currency to a flat currency
         * @param {string} cryptoCurrencyCode 
         * @param {string} flatCurrencyCode 
         * @param {boolean} [manualResync] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getExchangeRate(cryptoCurrencyCode: string, flatCurrencyCode: string, manualResync?: boolean, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse200>> {
            const localVarAxiosArgs = await CryptoCurrencyExchangeRateApiAxiosParamCreator(configuration).getExchangeRate(cryptoCurrencyCode, flatCurrencyCode, manualResync, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * CryptoCurrencyExchangeRateApi - factory interface
 * @export
 */
export const CryptoCurrencyExchangeRateApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary Get Exchange Rate of a crypto currency to a flat currency
         * @param {string} cryptoCurrencyCode 
         * @param {string} flatCurrencyCode 
         * @param {boolean} [manualResync] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getExchangeRate(cryptoCurrencyCode: string, flatCurrencyCode: string, manualResync?: boolean, options?: any): AxiosPromise<InlineResponse200> {
            return CryptoCurrencyExchangeRateApiFp(configuration).getExchangeRate(cryptoCurrencyCode, flatCurrencyCode, manualResync, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CryptoCurrencyExchangeRateApi - object-oriented interface
 * @export
 * @class CryptoCurrencyExchangeRateApi
 * @extends {BaseAPI}
 */
export class CryptoCurrencyExchangeRateApi extends BaseAPI {
    /**
     * 
     * @summary Get Exchange Rate of a crypto currency to a flat currency
     * @param {string} cryptoCurrencyCode 
     * @param {string} flatCurrencyCode 
     * @param {boolean} [manualResync] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CryptoCurrencyExchangeRateApi
     */
    public getExchangeRate(cryptoCurrencyCode: string, flatCurrencyCode: string, manualResync?: boolean, options?: any) {
        return CryptoCurrencyExchangeRateApiFp(this.configuration).getExchangeRate(cryptoCurrencyCode, flatCurrencyCode, manualResync, options).then((request) => request(this.axios, this.basePath));
    }

}


