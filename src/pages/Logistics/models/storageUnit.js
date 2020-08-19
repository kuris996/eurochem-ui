import { addStorageUnit, removeStorageUnit, updateStorageUnit, queryStorageUnit } from '@/services/storageUnitApi'

export default {
    namespace: 'storageUnit',

    state: {},   

    effects: {
        *add({ payload, callback }, { call, put }) {
            yield call(function* () {                
                addStorageUnit(payload, callback)
                yield put({
                    type: 'done'
                });
            })             
        },
        *remove({ payload, callback }, { call, put }) {
            yield call(function* () {
                removeStorageUnit(payload, callback)
                yield put({
                    type: 'done'
                })
            })
        },
        *update({ payload, callback }, { call, put }) {
            yield call(function* () {
                updateStorageUnit(payload, callback)
                yield put({
                    type: 'done'
                })
            })
        },
        *fetch({ payload, callback }, { call, put }) {
            yield call(function* () {
                queryStorageUnit(payload, callback)
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