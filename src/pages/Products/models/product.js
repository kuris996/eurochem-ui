import { addProduct, removeProduct, updateProduct, queryProduct } from '@/services/productApi'

export default {
    namespace: 'product',

    state: {},   

    effects: {
        *add({ payload, callback }, { call, put }) {
            yield call(function* () {                
                addProduct(payload, callback)
                yield put({
                    type: 'done'
                });
            })             
        },
        *remove({ payload, callback }, { call, put }) {
            yield call(function* () {
                removeProduct(payload, callback)
                yield put({
                    type: 'done'
                })
            })
        },
        *update({ payload, callback }, { call, put }) {
            yield call(function* () {
                updateProduct(payload, callback)
                yield put({
                    type: 'done'
                })
            })
        },
        *fetch({ payload, callback }, { call, put }) {
            yield call(function* () {
                queryProduct(payload, callback)
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