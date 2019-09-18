import { Note } from '../class/Note';
import { Module, ActionContext, MutationTree, ActionTree } from 'vuex';
import { RootState } from './store';

export interface EditorState {
  selectedNote: Note;
  editMode: boolean;
}

export const state: EditorState = {
  selectedNote: new Note(),
  editMode: false
};

export const mutations: MutationTree<EditorState> = {
  SET_SELECTED_NOTE(state, selectedNote: Note): void {
    state.selectedNote = selectedNote;
  },
  SET_EDIT_MODE(state, bool: boolean): void {
    state.editMode = bool;
  }
};

export const actions: ActionTree<EditorState, RootState> = {
  setSelectedNote({ commit }: ActionContext<EditorState, RootState>, selectedNote: Note): void {
    commit('SET_SELECTED_NOTE', selectedNote);
  },
  setEditMode({ commit }: ActionContext<EditorState, RootState>, bool: boolean): void {
    commit('SET_EDIT_MODE', bool);
  }
};

export const Editor: Module<EditorState, RootState> = {
  state,
  mutations,
  actions
};

export default Editor;
