import {
    ApiClient,
    CurrencyApi,
    CreateCurrencyModel,
    UpdateCurrencyModel
} from '@/code-gen/src'

const apiClient = new ApiClient()
const currencyApi = new CurrencyApi(apiClient)

export function addCurrency(params, callback) {
    const model = CreateCurrencyModel.constructFromObject(params)
    return currencyApi.createCurrencyApiV1CurrencyPost(
        model, callback)
}

export function removeCurrency(params, callback) {
    return currencyApi.deleteCurrencyApiV1CurrencyCurrencyIdDelete(params, callback)
}

export function updateCurrency(params, callback) {
    const model = UpdateCurrencyModel.constructFromObject(params)
    return currencyApi.updateCurrencyApiV1CurrencyCurrencyIdPatch(params['id'], model, callback)
}

export function queryCurrency(params, callback) {
    return currencyApi.getCurrenciesApiV1CurrencyGet(params, callback)
}