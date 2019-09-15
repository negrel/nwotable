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
  CHANGE_EDIT_MODE(state): void {
    state.editMode = !state.editMode;
  }
};

export const actions: ActionTree<EditorState, RootState> = {
  setSelectedNote({ commit }: ActionContext<EditorState, RootState>, selectedNote: Note): void {
    commit('SET_SELECTED_NOTE', selectedNote);
  },
  changeEditMode({ commit, dispatch, state }: ActionContext<EditorState, RootState>, newNote?: Note): void {
    if (state.editMode && newNote) {
      dispatch('saveNote', newNote, { root: true });
    }
    commit('CHANGE_EDIT_MODE');
  }
};

export const Editor: Module<EditorState, RootState> = {
  state,
  mutations,
  actions
};

export default Editor;
