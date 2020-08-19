import { addCurrency, removeCurrency, updateCurrency, queryCurrency } from '@/services/currencyApi'

export default {
    namespace: 'currency',

    state: {},   

    effects: {
        *add({ payload, callback }, { call, put }) {
            yield call(function* () {                
                addCurrency(payload, callback)
                yield put({
                    type: 'done'
                });
            })             
        },
        *remove({ payload, callback }, { call, put }) {
            yield call(function* () {
                removeCurrency(payload, callback)
                yield put({
                    type: 'done'
                })
            })
        },
        *update({ payload, callback }, { call, put }) {
            yield call(function* () {
                updateCurrency(payload, callback)
                yield put({
                    type: 'done'
                })
            })
        },
        *fetch({ payload, callback }, { call, put }) {
            yield call(function* () {
                queryCurrency(payload, callback)
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