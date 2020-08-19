import {
    ApiClient,
    ProductApi,
    CreateProductModel,
    UpdateProductModel
} from '@/code-gen/src'

const apiClient = new ApiClient()
const productApi = new ProductApi(apiClient) 

export function addProduct(params, callback) {     
    const model = CreateProductModel.constructFromObject(params)
    return productApi.createProductApiV1ProductPost(
        model, callback)
}

export function removeProduct(params, callback) {
    return productApi.deleteProductApiV1ProductProductIdDelete(params, callback)
}

export function updateProduct(params, callback) {
    const model = UpdateProductModel.constructFromObject(params)
    return productApi.updateProductApiV1ProductProductIdPatch(params['id'], model, callback)
}

export function queryProduct(params, callback) {
    return productApi.getProductsApiV1ProductGet(params, callback)
}