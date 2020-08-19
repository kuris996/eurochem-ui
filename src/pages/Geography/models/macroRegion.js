import { addMacroRegion, removeMacroRegion, updateMacroRegion, queryMacroRegion } from '@/services/macroRegionApi'

export default {
    namespace: 'macroRegion',

    state: {},   

    effects: {
        *add({ payload, callback }, { call, put }) {
            yield call(function* () {                
                addMacroRegion(payload, callback)
                yield put({
                    type: 'done'
                });
            })             
        },
        *remove({ payload, callback }, { call, put }) {
            yield call(function* () {
                removeMacroRegion(payload, callback)
                yield put({
                    type: 'done'
                })
            })
        },
        *update({ payload, id, callback }, { call, put }) {
            yield call(function* () {
                updateMacroRegion(payload, id, callback)
                yield put({
                    type: 'done'
                })
            })
        },
        *fetch({ payload, callback }, { call, put }) {
            yield call(function* () {
                queryMacroRegion(payload, callback)
                yield put({
                    type: 'done',
                })
            })
        }
    },

    reducers: {
        done(state, action) {
            return {
                ...state,
            }
        },
    },
}