import { addTransferType, removeTransferType, updateTransferType, queryTransferType } from '@/services/transferTypeApi'

export default {
    namespace: 'transferType',

    state: {},   

    effects: {
        *add({ payload, callback }, { call, put }) {
            yield call(function* () {                
                addTransferType(payload, callback)
                yield put({
                    type: 'done'
                });
            })             
        },
        *remove({ payload, callback }, { call, put }) {
            yield call(function* () {
                removeTransferType(payload, callback)
                yield put({
                    type: 'done'
                })
            })
        },
        *update({ payload, callback }, { call, put }) {
            yield call(function* () {
                updateTransferType(payload, callback)
                yield put({
                    type: 'done'
                })
            })
        },
        *fetch({ payload, callback }, { call, put }) {
            yield call(function* () {
                queryTransferType(payload, callback)
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