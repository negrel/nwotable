import { Note } from '../types'
import { Module, ActionContext, MutationTree, ActionTree } from 'vuex';
import { RootState } from './store'

export interface EditorState {
  selectedNote: Note,
  editMode: boolean
}

export const state: EditorState = {
  selectedNote: {} as Note,
  editMode: false
};

export const mutations: MutationTree<EditorState> = {
  SET_SELECTED_NOTE(state, selectedNote: Note) {
    state.selectedNote = selectedNote;
  },
  CHANGE_EDIT_MODE(state) {
    state.editMode = !state.editMode;
  }
};

export const actions: ActionTree<EditorState, RootState> = {
  setSelectedNote({ commit }: ActionContext<EditorState, RootState>, selectedNote: Note) {
    commit('SET_SELECTED_NOTE', selectedNote);
  },
  changeEditMode({ commit }: ActionContext<EditorState, RootState>) {
    commit('CHANGE_EDIT_MODE');
  }
};

export const Editor: Module<EditorState, RootState> = {
  state,
  mutations,
  actions
};

export default Editor;
