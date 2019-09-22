import { Note } from '../class/Note';
import { MutationTree, ActionTree, ActionContext, Module } from 'vuex';
import { RootState } from './store';

export interface NoteListState {
  sortedList: Note[];
  mode: string[];
}

export const state: NoteListState = {
  sortedList: [],
  mode: ['all']
};

export const mutations: MutationTree<NoteListState> = {
  SET_NOTE_LIST(state, noteList: Note[]): void {
    state.sortedList = noteList;
  }
};

export const actions: ActionTree<NoteListState, RootState> = {
  setNoteList({ commit }: ActionContext<NoteListState, RootState>, noteList: Note[]): void {
    commit('SET_NOTE_LIST', noteList);
  }
};

export const NoteList: Module<NoteListState, RootState> = {
  state,
  mutations,
  actions
};

export default NoteList;
