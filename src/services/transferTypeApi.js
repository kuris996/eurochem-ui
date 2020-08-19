import {
    ApiClient,
    TransferTypeApi,
    CreateTransferTypeModel,
    UpdateTransferTypeModel
} from '@/code-gen/src'

const apiClient = new ApiClient()
const transferTypeApi = new TransferTypeApi(apiClient)

export function addTransferType(params, callback) {
    const model = CreateTransferTypeModel.constructFromObject(params)
    return transferTypeApi.createTransferTypeApiV1TransferTypePost(
        model, callback
    )
}

export function removeTransferType(params, callback) {
    return transferTypeApi.deleteTransferTypeApiV1TransferTypeTransferTypeIdDelete(params, callback)
}

export function updateTransferType(params, callback) {
    const model = UpdateTransferTypeModel.constructFromObject(params)
    return transferTypeApi.updateTransferTypeApiV1TransferTypeTransferTypeIdPatch(params['id'], model, callback)
}

export function queryTransferType(params, callback) {
    return transferTypeApi.getTransferTypesApiV1TransferTypeGet(params, callback)
}