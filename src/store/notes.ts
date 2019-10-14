import { Note, NoteType } from '../class/Note';
import { Attachment } from '../class/Attachment';
import { MutationTree, ActionTree, ActionContext, Module } from 'vuex';
import { RootState } from './store';
import { MainState } from './main';

export interface NoteListState {
  noteList: Note[];
}

export const state: NoteListState = {
  noteList: []
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
  SET_NOTE(state, { index, theNote }: { index: number; theNote: Note}): void {
    state.noteList[index] = theNote;
  }
};

export const actions: ActionTree<NoteListState, RootState> = {
  getNoteIndex({ state }: ActionContext<NoteListState, RootState>, note: Note): number {
    return state.noteList.map((element: Note): string => element.data.meta.created).indexOf(note.data.meta.created);
  },
  addNoteToList({ commit }: ActionContext<NoteListState, RootState>, newNote: NoteType): void {
    commit('ADD_NOTE', newNote);
  },
  deleteNoteFromList({ commit }: ActionContext<NoteListState, RootState>, index: number): void {
    commit('DELETE_NOTE', index);
  },
  updateNoteToList({ commit }: ActionContext<NoteListState, RootState>, payload: { index: number; theNote: Note }): void {
    commit('SET_NOTE', payload);
  }
};

export const Notes: Module<NoteListState, RootState> = {
  state,
  mutations,
  actions
};

export default Notes;
