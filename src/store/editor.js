export const state = {
  selectedNote: {}
};

export const mutations = {
  SET_SELECTED_NOTE(state, selectedNote) {
    state.selectedNote = selectedNote;
  }
};

export const actions = {
  setSelectedNote({ commit }, selectedNote) {
    commit('SET_SELECTED_NOTE', selectedNote);
  }
};

export default {
  state,
  mutations,
  actions
};
