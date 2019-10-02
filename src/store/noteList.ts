import { Note, NoteType } from '../class/Note';
import { Attachment } from '../class/Attachment';
import { MutationTree, ActionTree, ActionContext, Module } from 'vuex';
import { RootState } from './store';

export interface Filter {
  (element: Note): boolean;
}

export interface NoteListState {
  noteList: Note[];
  indexList: number[];
  filter: 'all' | 'favorited';
}

export const state: NoteListState = {
  noteList: [],
  indexList: [],
  filter: 'all'
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
  },
  SET_FILTER(state, filterName): void {
    state.filter = filterName;
  },
  APPLY_FILTER(state): void {
    let func: Filter;

    switch (state.filter) {
      case 'all':
        func = (el: Note): boolean => true;
        break;
      case 'favorited':
        func = (el: Note): boolean => el.favorited;
        break;
      default:
        func = (el: Note): boolean => true;
    }

    const filtredNote: number[] = [];

    state.noteList.forEach((el: Note): void => {
      if (func(el)) {
        const index = state.noteList.indexOf(el);
        filtredNote.push(index);
      }
    });
    state.indexList = [...filtredNote];
  }
};

export const actions: ActionTree<NoteListState, RootState> = {
  async init({ dispatch, commit, state }: ActionContext<NoteListState, RootState>): Promise<void> {
    const [noteList, attachmentList] = await dispatch('initDb', { root: true });

    noteList.forEach((element: any): void => {
      const note = new Note();
      note.setupFromNote(element.note);
      commit('ADD_NOTE', note);
    });

    attachmentList.forEach((element: File): void => {
      dispatch('addAttachment', new Attachment(element), { root: true });
    });

    dispatch('setFilter', 'all');
    dispatch('setSelectedNote', state.noteList[0], { root: true });
  },
  getIndex({ state }: ActionContext<NoteListState, RootState>, note: Note): number {
    return state.noteList.map((element: Note): string => element.data.meta.created).indexOf(note.data.meta.created);
  },
  async addNewNote({ commit, dispatch }: ActionContext<NoteListState, RootState>, note?: NoteType | File): Promise<void> {
    const newNote = new Note();

    if (note instanceof File) {
      await newNote.setupFromFile(note);
    } else if (note) {
      newNote.setupFromNote(note);
    }

    commit('ADD_NOTE', newNote);
    dispatch('setSelectedNote', newNote, { root: true });
    dispatch('setEditMode', true, { root: true });
    dispatch('saveNote');
  },
  saveNote({ dispatch, rootState }: ActionContext<NoteListState, RootState>): void {
    const theNote = rootState.Editor.selectedNote;

    dispatch('saveNoteToDb', theNote, { root: true });
  },
  async updateNote({ commit, dispatch, rootState }: ActionContext<NoteListState, RootState>): Promise<void> {
    const theNote = rootState.Editor.selectedNote;
    const index = await dispatch('getIndex', theNote);

    commit('SET_NOTE', { index, theNote });
    dispatch('updateNoteToDb', theNote, { root: true });
    commit('APPLY_FILTER');
  },
  async deleteNote({ commit, dispatch, state }: ActionContext<NoteListState, RootState>, theNote: Note): Promise<void> {
    dispatch('setEditMode', false, { root: true });
    const index = await dispatch('getIndex', theNote);
    commit('DELETE_NOTE', index);
    dispatch('deleteNoteFromDb', theNote);
    commit('APPLY_FILTER');
    dispatch('setSelectedNote', state.noteList[state.indexList[0]], { root: true });
  },
  setFilter({ commit }: ActionContext<NoteListState, RootState>, filter: string): void {
    commit('SET_FILTER', filter);
    commit('APPLY_FILTER');
  }
};

export const NoteList: Module<NoteListState, RootState> = {
  state,
  mutations,
  actions
};

export default NoteList;
