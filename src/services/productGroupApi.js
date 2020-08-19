import {
    ApiClient,
    ProductGroupApi,
    CreateProductGroupModel,
    UpdateProductGroupModel
} from '@/code-gen/src'

const apiClient = new ApiClient()
const productGroupApi = new ProductGroupApi(apiClient) 

export function addProductGroup(params, callback) {     
    const model = CreateProductGroupModel.constructFromObject(params)
    return productGroupApi.createProductGroupApiV1ProductGroupPost(
        model, callback)
}

export function removeProductGroup(params, callback) {
    return productGroupApi.deleteProductGroupApiV1ProductGroupProductGroupIdDelete(params, callback)
}

export function updateProductGroup(params, callback) {
    const model = UpdateProductGroupModel.constructFromObject(params)
    return productGroupApi.updateProductGroupApiV1ProductGroupProductGroupIdPatch(params['id'], model, callback)
}

export function queryProductGroup(params, callback) {
    return productGroupApi.getProductGroupsApiV1ProductGroupGet(params, callback)
}