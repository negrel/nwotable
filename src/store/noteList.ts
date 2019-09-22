import { Note } from '../class/Note';
import { MutationTree, ActionTree, ActionContext, Module } from 'vuex';
import { RootState } from './store';

export interface NoteListState {
  noteList: Note[];
  sortedList: Note[];
  mode: string[];
}

export const state: NoteListState = {
  noteList: [],
  sortedList: [],
  mode: ['all']
};

export const mutations: MutationTree<NoteListState> = {
  SET_NOTE_LIST(state, noteList: Note[]): void {
    state.sortedList = noteList;
  },
  UPDATE_NOTE(state, { index, note }: { index: number; note: Note }): void {
    state.noteList[index] = note;
  },
  ADD_NOTE(state, payload: Note): void {
    state.noteList.unshift(payload);
  },
  DELETE_NOTE(state, index: number): void {
    state.noteList.splice(index, 1);
  },
  SAVE_NOTE(state, { index, theNote }: { index: number; theNote: Note }): void {
    state.noteList[index] = theNote;
  }
};

function pinnedNotes(noteList: Note[]): Note[] {
  const pinnedNote: Note[] = [];

  for (let i = noteList.length - 1; i > 0; i--) {
    if (noteList[i].pinned) {
      pinnedNote.push(noteList[i]);
      noteList.splice(i, 1);
    }
  }
  return [...pinnedNote, ...noteList];
}

export const actions: ActionTree<NoteListState, RootState> = {
  async init({ dispatch, commit }: ActionContext<NoteListState, RootState>): Promise<void> {
    const noteList = await dispatch('initDb', { root: true });

    for (let i = 0, length = noteList.length; i < length; i++) {
      const theNote = new Note(noteList[i].note);
      commit('ADD_NOTE', theNote);
    }
    dispatch('setNoteList', state.noteList, { root: true });
    dispatch('selectFirstNote');
  },
  setNoteList({ commit }: ActionContext<NoteListState, RootState>, noteList: Note[]): void {
    commit('SET_NOTE_LIST', noteList);
  },
  selectFirstNote({ dispatch, state }: ActionContext<NoteListState, RootState>): void {
    // Set the selected note to the first in the list.
    dispatch('setSelectedNote', state.noteList[0], { root: true });
  },
  getIndex({ state }: ActionContext<NoteListState, RootState>, note: Note): number {
    return state.noteList.map((element: Note): string => element.data.meta.created.toString()).indexOf(note.data.meta.created.toString());
  },
  editNote({ dispatch, commit }: ActionContext<NoteListState, RootState>, note: Note): void {
    const index = dispatch('getIndex', note);
    commit('UPDATE_NOTE', { index, note });
  },
  addNewNote({ commit, dispatch }: ActionContext<NoteListState, RootState>, theNote: Note = new Note()): void {
    dispatch('setEditMode', false, { root: true });
    commit('ADD_NOTE', theNote);
    dispatch('addNote', { root: true });
    dispatch('selectFirstNote');
    dispatch('setEditMode', true, { root: true });
  },
  saveNote({ commit, dispatch, rootState }: ActionContext<NoteListState, RootState>): void {
    const theNote = rootState.Editor.selectedNote;
    const payload = {
      index: dispatch('getIndex', theNote),
      theNote
    };
    commit('SAVE_NOTE', payload);
    dispatch('saveNoteToDb', theNote);
  },
  async deleteNote({ commit, dispatch, state }: ActionContext<NoteListState, RootState>, theNote: Note): Promise<void> {
    dispatch('setEditMode', false, { root: true });

    const index = await dispatch('getIndex', theNote);
    commit('DELETE_NOTE', index);
    dispatch('deleteNoteFromDb', { root: true });

    if (state.noteList.length === 0) {
      dispatch('defaultNote', { root: true });
    } else {
      dispatch('selectFirstNote');
    }
  }
};

export const NoteList: Module<NoteListState, RootState> = {
  state,
  mutations,
  actions
};

export default NoteList;
