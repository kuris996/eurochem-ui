import {
    ApiClient,
    DistanceUnitApi,
    CreateDistanceUnitModel,
    UpdateDistanceUnitModel
} from '@/code-gen/src'

const apiClient = new ApiClient()
const distanceUnitApi = new DistanceUnitApi(apiClient)

export function addDistanceUnit(params, callback) {
    const model = CreateDistanceUnitModel.constructFromObject(params)
    return distanceUnitApi.createDistanceUnitApiV1DistanceUnitPost(
        model, callback)
}

export function removeDistanceUnit(params, callback) {
    return distanceUnitApi.deleteDistanceUnitApiV1DistanceUnitDistanceUnitIdDelete(params, callback)
}

export function updateDistanceUnit(params, callback) {
    const model = UpdateDistanceUnitModel.constructFromObject(params)
    return distanceUnitApi.updateDistanceUnitApiV1DistanceUnitDistanceUnitIdPatch(params['id'], model, callback)
}

export function queryDistanceUnit(params, callback) {
    return distanceUnitApi.getDistanceUnitsApiV1DistanceUnitGet(params, callback)
}