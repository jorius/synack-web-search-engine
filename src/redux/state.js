// @constants
const INITIAL_STATE = {
    loading: {
        isVisible: false
    },
    search: {
        bingEngineResult: {
            items: [],
            total: ''
        },
        googleEngineResult: {
            items: [],
            total: ''
        },
        query: '',
        selectedEngine: ''
    }
};

export default INITIAL_STATE;
