export const state: {
  selectedNote: object,
  editMode: boolean
} = {
  selectedNote: {},
  editMode: false
};

export const mutations = {
  SET_SELECTED_NOTE(state, selectedNote) {
    state.selectedNote = selectedNote;
  },
  CHANGE_EDIT_MODE(state) {
    state.editMode = !state.editMode;
  }
};

export const actions = {
  setSelectedNote({ commit }, selectedNote) {
    commit('SET_SELECTED_NOTE', selectedNote);
  },
  changeEditMode({ commit }) {
    commit('CHANGE_EDIT_MODE');
  }
};

export default {
  state,
  mutations,
  actions
};
