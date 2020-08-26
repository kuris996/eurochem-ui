import {
    ApiClient,
    MacroRegionApi,
    MacroRegionLevel,
    CreateMacroRegionModel,
    UpdateMacroRegionModel
} from '@/code-gen/src'

const apiClient = new ApiClient()
const macroRegionApi = new MacroRegionApi(apiClient)

export function addMacroRegion(params, callback) {
    const model = CreateMacroRegionModel.constructFromObject(params)    
    return macroRegionApi.createMacroRegionApiV1MacroRegionPost(
        model, callback
    )
}

export function removeMacroRegion(params, callback) {
    return macroRegionApi.deleteMacroRegionApiV1MacroRegionMacroRegionIdDelete(params, callback)
}

export function updateMacroRegion(params, callback) {
    const model = UpdateMacroRegionModel.constructFromObject(params)
    return macroRegionApi.updateMacroRegionApiV1MacroRegionMacroRegionIdPatch(params['id'], model, callback)
}

export function queryMacroRegion(params, callback) {
    return macroRegionApi.getMacroRegionsApiV1MacroRegionGet(params, callback)
}