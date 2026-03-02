interface SelectMenu {
    describe: string;
    icon: string;
    id: string;
    name: string;
    path: string;
}

interface State {
    isCollapse: boolean;
    selectMenu: SelectMenu[];
}

const state: State = {
    isCollapse: false,
    selectMenu: []
};

const mutations = {
    toggleCollapse(state: State) {
        state.isCollapse = !state.isCollapse;
    },

    addMenu(state: State, payload: SelectMenu) {
        const isExist = state.selectMenu.find(item => item.path === payload.path);
        if (!isExist) {
            state.selectMenu.push(payload);
        }
        console.log(state.selectMenu, 'selectMenu');
    },

    selectMenu(state: any, payload: any) {
        const index = state.selectMenu.findIndex((val: SelectMenu) => val.path === payload);
        state.selectMenu.splice(index, 1);
    }
};

export default {
    state,
    mutations
};