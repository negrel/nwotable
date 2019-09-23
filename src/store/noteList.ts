import { Note } from '../class/Note';
import { MutationTree, ActionTree, ActionContext, Module } from 'vuex';
import { RootState } from './store';

export interface NoteListState {
  noteList: Note[];
  filter: Function;
}

export const state: NoteListState = {
  noteList: [],
  filter: (): void => {}
};

export const mutations: MutationTree<NoteListState> = {
  ADD_NOTE(state, payload: Note): void {
    if (payload.pinned) {
      state.noteList.unshift(payload);
    } else {
      state.noteList.push(payload);
    }
  },
  DELETE_NOTE(state, index: number): void {
    state.noteList.splice(index, 1);
  },
  SET_FILTER(state, func: Function): void {
    state.filter = func;
  }
};

export const actions: ActionTree<NoteListState, RootState> = {
  async init({ dispatch, commit, state }: ActionContext<NoteListState, RootState>): Promise<void> {
    commit('SET_FILTER', (noteList: Note[]): Note[] => {
      return noteList;
    });

    const noteList = await dispatch('initDb', { root: true });

    noteList.forEach((element: any): void => {
      commit('ADD_NOTE', new Note(element.note));
    });
    dispatch('selectNote', state.noteList[0]);
  },
  selectNote({ dispatch }: ActionContext<NoteListState, RootState>, theNote?: Note): void {
    // Set the selected note to the first in the list.
    dispatch('setSelectedNote', theNote, { root: true });
  },
  getIndex({ state }: ActionContext<NoteListState, RootState>, note: Note): number {
    return state.noteList.map((element: Note): string => element.data.meta.created).indexOf(note.data.meta.created);
  },
  addNewNote({ commit, dispatch }: ActionContext<NoteListState, RootState>): void {
    const newNote = new Note();
    dispatch('setEditMode', false, { root: true });
    commit('ADD_NOTE', newNote);
    dispatch('selectNote', newNote);
    dispatch('setEditMode', true, { root: true });
  },
  saveNote({ dispatch, rootState }: ActionContext<NoteListState, RootState>): void {
    const theNote = rootState.Editor.selectedNote;
    theNote.modified();

    dispatch('saveNoteToDb', theNote, { root: true });
  },
  async updateNote({ commit, dispatch, rootState }: ActionContext<NoteListState, RootState>): Promise<void> {
    const theNote = rootState.Editor.selectedNote;
    const index = await dispatch('getIndex', theNote);

    commit('DELETE_NOTE', index);
    commit('ADD_NOTE', theNote);
  },
  async deleteNote({ commit, dispatch }: ActionContext<NoteListState, RootState>, theNote: Note): Promise<void> {
    dispatch('setEditMode', false, { root: true });

    const index = await dispatch('getIndex', theNote);
    commit('DELETE_NOTE', index);
    dispatch('deleteNoteFromDb', theNote);
  },
  filterAll({ commit }: ActionContext<NoteListState, RootState>): void {
    commit('SET_FILTER', (noteList: Note[]): Note[] => {
      return noteList;
    });
  },
  filterFavorited({ commit }: ActionContext<NoteListState, RootState>): void {
    commit('SET_FILTER', (noteList: Note[]): Note[] => {
      return noteList.filter((element: Note): boolean => element.favorited);
    });
  }
};

export const NoteList: Module<NoteListState, RootState> = {
  state,
  mutations,
  actions
};

export default NoteList;
