import {
    ApiClient,
    StorageUnitApi,
    CreateStorageUnitModel,
    UpdateStorageUnitModel
} from '@/code-gen/src'

const apiClient = new ApiClient()
const storageUnitApi = new StorageUnitApi(apiClient)

export function addStorageUnit(params, callback) {
    const model = CreateStorageUnitModel.constructFromObject(params)
    return storageUnitApi.createStorageUnitApiV1StorageUnitPost(
        model, callback
    )
}

export function removeStorageUnit(params, callback) {
    return storageUnitApi.deleteStorageUnitApiV1StorageUnitStorageUnitIdDelete(params, callback)
}

export function updateStorageUnit(params, callback) {
    const model = UpdateStorageUnitModel.constructFromObject(params)
    return storageUnitApi.updateStorageUnitApiV1StorageUnitStorageUnitIdPatch(params['id'], model, callback)
}

export function queryStorageUnit(params, callback) {
    return storageUnitApi.getStorageUnitsApiV1StorageUnitGet(params, callback)
}