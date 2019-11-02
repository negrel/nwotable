import { Note, NoteType } from '../class/Note';
import { Tag } from '../class/Tag';
import { MutationTree, ActionTree, ActionContext, Module } from 'vuex';
import { RootState } from './store';

export interface NoteListState {
  noteList: Note[];
  tagList: Tag[];
}

export const state: NoteListState = {
  noteList: [],
  tagList: []
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
    state.noteList[index].plainNote = theNote.plainNote;
  },
  ADD_TAG(state, payload: Tag): void {
    state.tagList.push(payload);
  },
  SET_TAG(state, tagList: Tag[]): void {
    state.tagList = tagList;
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
  },
  getTagIndex({ state }: ActionContext<NoteListState, RootState>, tagName: string): number {
    return state.tagList.slice(0).map((element: Tag): string => element.fullName).indexOf(tagName);
  },
  async addTagToList({ commit, dispatch }: ActionContext<NoteListState, RootState>, payload: Tag): Promise<void> {
    const index = await dispatch('getTagIndex', payload.fullName);
    if (index === -1) {
      commit('ADD_TAG', payload);

      if (payload.hasParentTag) {
        dispatch('addTagToList', payload.parent);
      }
    }
  },
  updateTagList({ rootState, commit }: ActionContext<NoteListState, RootState>): void {
    const noteList = rootState.Notes.noteList,
      payload: Tag[] = [];
    noteList.forEach(async(note: Note): Promise<void> => {
      const tags = note.allTags;
      for (const tag of tags) {
        payload.push(tag);
      }
    });
    commit('SET_TAG', payload);
  }
};

export const Notes: Module<NoteListState, RootState> = {
  state,
  mutations,
  actions
};

export default Notes;
