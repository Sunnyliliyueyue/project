const state = {
    isCollapse: false,
    selectMenu: [ ]
}

const mutations = {
    toggleCollapse(state: any) {
        state.isCollapse = !state.isCollapse
    },
    addMenu(state: any, payload: any) {
        if(state.selectMenu.findIndex((item: any) => item.path === payload.path) === -1) {
            state.selectMenu.push(payload)
        }
        console.log(state.selectMenu, 'selectMenu');
    }
}

export default {
    state,
    mutations
}