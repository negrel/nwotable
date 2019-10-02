import { Note, NoteType } from '../class/Note';
import { Module, ActionContext, MutationTree, ActionTree } from 'vuex';
import { RootState } from './store';

export interface EditorState {
  selectedNote: Note;
  editMode: boolean;
}

export const defaultNote: NoteType = {
  title: '',
  content: '# No note...',
  meta: {
    created: new Date().toString(),
    modified: new Date(),
    tags: [],
    favorited: false,
    pinned: false
  }
};

export const state: EditorState = {
  selectedNote: new Note(defaultNote),
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
  setEditMode({ commit, dispatch }: ActionContext<EditorState, RootState>, bool: boolean): void {
    commit('SET_EDIT_MODE', bool);
    if (!bool) {
      dispatch('updateNote', { root: true });
      console.log('UPDATING NOTE');
    }
  },
  defaultNote({ commit }: ActionContext<EditorState, RootState>): void {
    const note = new Note(defaultNote);
    commit('SET_SELECTED_NOTE', note);
  }
};

export const Editor: Module<EditorState, RootState> = {
  state,
  mutations,
  actions
};

export default Editor;
