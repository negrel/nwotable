import { Note, NoteType } from 'src/class/Note';
import { Tag } from 'src/class/Tag';
import { Attachment } from '../class/Attachment';
import { ActionTree, ActionContext, Module } from 'vuex';
import { RootState } from './store';

import * as hotkey from 'src/assets/hotkey.js';

// eslint-disable-next-line
export interface MainState {}

export const actions: ActionTree<MainState, RootState> = {
  async init({ dispatch, rootState }: ActionContext<MainState, RootState>): Promise<void> {
    hotkey.setup();
    const [noteList, attachmentList] = await dispatch('initDb', { root: true });

    for (const element of noteList) {
      const note = new Note();
      note.setupFromNote(element.note);
      await dispatch('addNoteToList', note, { root: true });
    }

    dispatch('updateTagList', { root: true });
    dispatch('updateFavorited', { root: true });
    dispatch('updateFiltred', { root: true });

    attachmentList.forEach((element: File): void => {
      dispatch('addAttachment', new Attachment(element), { root: true });
    });
    dispatch('setSelectedNote', rootState.Notes.noteList[0], { root: true });
  },
  // -------------------------------------------------------------------------------
  async addNote({ dispatch, rootState }: ActionContext<MainState, RootState>, note?: NoteType | File): Promise<void> {
    const newNote = new Note();

    if (note instanceof File) {
      await newNote.setupFromFile(note);
    } else if (note) {
      newNote.setupFromNote(note);
    }

    // Adding the note.
    dispatch('addNoteToList', newNote, { root: true });
    dispatch('addNoteToDb', newNote, { root: true });
    // Updating the filtred list
    if (rootState.Filters.filter === 'favorited') {
      newNote.favorited = true;
    }

    dispatch('updateTagList', { root: true });
    dispatch('updateFavorited', { root: true });
    dispatch('updateFiltred', { root: true });

    // Then select the note.
    dispatch('setSelectedNote', newNote, { root: true });
    dispatch('setEditMode', true, { root: true });
  },
  // -------------------------------------------------------------------------------
  async deleteNote({ dispatch, rootState }: ActionContext<MainState, RootState>, theNote: Note): Promise<void> {
    dispatch('setEditMode', false, { root: true });
    const index = await dispatch('getNoteIndex', theNote, { root: true });

    // Select the previous note in the list or the next if don't exist
    const filtredIndex = await dispatch('getFiltredIndex', index, { root: true }),
      filtredList = rootState.Filters.filtredList,
      noteList = rootState.Notes.noteList;

    if (filtredList.length > 0) {
      if (filtredIndex - 1 >= 0) {
        dispatch('setSelectedNote', noteList[filtredList[filtredIndex - 1]], { root: true });
      } else {
        dispatch('setSelectedNote', noteList[filtredList[filtredIndex + 1]], { root: true });
      }
    }

    // Then delete the note and update the drawer

    dispatch('deleteNoteFromList', index);
    dispatch('deleteNoteFromDb', theNote, { root: true });

    dispatch('updateFavorited', { root: true });
    dispatch('updateFiltred', { root: true });
    dispatch('updateTagList', { root: true });
  },
  // -------------------------------------------------------------------------------
  async updateNote({ dispatch, rootState }: ActionContext<MainState, RootState>): Promise<void> {
    const theNote = rootState.Editor.selectedNote;
    const index = await dispatch('getNoteIndex', theNote, { root: true });

    dispatch('updateFavorited', { root: true });

    dispatch('updateNoteToList', { index, theNote }, { root: true });
    dispatch('updateNoteToDb', theNote, { root: true });
  },
  async setFilter({ dispatch, rootState }, filter: string): Promise<void> {
    dispatch('setFilterAndUpdate', filter, { root: true });

    // Check if the selected note is in the filtred list
    const noteList = rootState.Notes.noteList,
      theNote = rootState.Editor.selectedNote,
      index = await dispatch('getNoteIndex', theNote, { root: true }),
      filtredIndex = await dispatch('getFiltredIndex', index, { root: true }),
      filtredList = rootState.Filters.filtredList;

    if (filtredIndex === -1 && noteList.length > 0 && filtredList.length > 0) {
      // if not select the first note of the filtred list
      dispatch('setSelectedNote', noteList[filtredList[0]], { root: true });
    }
  },
  async addTag({ dispatch, rootState }: ActionContext<MainState, RootState>, tagName: string): Promise<void> {
    const note = rootState.Editor.selectedNote;

    if (!note.hasTag(tagName) && tagName.length > 0) {
      const tag = new Tag(tagName);

      await dispatch('addTagToList', tag, { root: true });
      note.addTag(tag);
      dispatch('updateNote');
    }
  },
  tagMatchCounter({ rootState }: ActionContext<MainState, RootState>, tagName: string): number {
    const noteList = rootState.Notes.noteList;
    let counter = 0;
    noteList.forEach((note: Note): void => {
      if (note.hasTag(tagName)) {
        counter++;
      }
    });
    console.log(counter);
    return counter;
  }
};

export const Main: Module<MainState, RootState> = {
  actions
};

export default Main;
