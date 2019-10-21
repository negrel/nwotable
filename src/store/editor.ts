import { Note, NoteType } from '../class/Note';
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
  setEditMode({ commit, dispatch, rootState }: ActionContext<EditorState, RootState>, bool: boolean): void {
    if (rootState.Notes.noteList.length > 0) {
      commit('SET_EDIT_MODE', bool);
      if (!bool) {
        dispatch('updateNote', { root: true });
      }
    }
  },
  async selectNextNote({ dispatch, rootState, state }: ActionContext<EditorState, RootState>): Promise<void> {
    const noteIndex = await dispatch('getNoteIndex', state.selectedNote),
      index = await dispatch('getFiltredIndex', noteIndex, { root: true }) + 1,
      noteList = rootState.Notes.noteList,
      filtredList = rootState.Filters.filtredList;

    if (index === filtredList.length) {
      dispatch('setSelectedNote', noteList[filtredList[0]]);
    } else {
      dispatch('setSelectedNote', noteList[filtredList[index]]);
    }
  },
  async selectPreviousNote({ dispatch, rootState, state }: ActionContext<EditorState, RootState>): Promise<void> {
    const noteIndex = await dispatch('getNoteIndex', state.selectedNote),
      index = await dispatch('getFiltredIndex', noteIndex, { root: true }) - 1,
      noteList = rootState.Notes.noteList,
      filtredList = rootState.Filters.filtredList;

    if (index === -1) {
      const lastIndex = filtredList.length - 1;
      dispatch('setSelectedNote', noteList[filtredList[lastIndex]]);
    } else {
      dispatch('setSelectedNote', noteList[filtredList[index]]);
    }
  }
};

export const Editor: Module<EditorState, RootState> = {
  state,
  mutations,
  actions
};

export default Editor;
