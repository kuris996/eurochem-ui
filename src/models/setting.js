import defaultSettings from '../defaultSettings';

export default {
    namespace: 'setting',
    state: defaultSettings,
    reducers: {
        getSetting(state) {
            const setting = {}           
            return {
                ...state,
                ...setting,
            }
        }
    }
};