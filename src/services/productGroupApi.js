import {
    ApiClient,
    ProductGroupApi,
    CreateProductGroupModel
} from '@/code-gen/src'

const apiClient = new ApiClient()
const productGroupApi = new ProductGroupApi(apiClient) 

export function addProductGroup(params, callback) {     
    const model = CreateProductGroupModel.constructFromObject(params)
    return productGroupApi.createProductGroupApiV1ProductGroupPost(
        model, callback)
}

export function removeProductGroup(params, callback) {
    return productGroupApi.deleteProductGroupApiV1ProductGroupProductGroupCodeDelete(params, callback)
}

export function queryProductGroup(params, callback) {
    return productGroupApi.getProductGroupsApiV1ProductGroupGet(params, callback)
}