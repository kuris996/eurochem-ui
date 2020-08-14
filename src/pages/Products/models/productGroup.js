import { addProductGroup, removeProductGroup, queryProductGroup } from '@/services/productGroupApi'

import {
    ApiClient,
    ProductGroupApi,
    CreateProductGroupModel
} from '@/code-gen/src'

export default {
    namespace: 'productGroup',

    state: {},   

    effects: {
        *add({ payload, callback }, { call, put }) {
            yield call(function* () {                
                addProductGroup(payload, callback)
                yield put({
                    type: 'done'
                });
            })             
        },
        *remove({ payload, callback }, { call, put }) {
            yield call(function* () {
                removeProductGroup(payload, callback)
                yield put({
                    type: 'done'
                })
            })
        },
        *fetch({ payload, callback }, { call, put }) {
            yield call(function* () {
                queryProductGroup(payload, callback)
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