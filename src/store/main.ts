import { Note, NoteType } from '../class/Note';
import { Attachment } from '../class/Attachment';
import { ActionTree, ActionContext, Module } from 'vuex';
import { RootState } from './store';

// eslint-disable-next-line
export interface MainState {}

export const actions: ActionTree<MainState, RootState> = {
  async init({ dispatch, rootState }: ActionContext<MainState, RootState>): Promise<void> {
    const [noteList, attachmentList] = await dispatch('initDb', { root: true });

    noteList.forEach((element: any): void => {
      const note = new Note();
      note.setupFromNote(element.note);
      dispatch('addNoteToList', note, { root: true });
    });

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
      filtred = rootState.Filters.filtred,
      noteList = rootState.Notes.noteList;

    if (filtred.length > 0) {
      if (filtredIndex - 1 >= 0) {
        dispatch('setSelectedNote', noteList[filtred[filtredIndex - 1]], { root: true });
      } else {
        dispatch('setSelectedNote', noteList[filtred[filtredIndex + 1]], { root: true });
      }
    } else {
      alert('ERROR');
    }

    // Then delete the note and update the drawer

    dispatch('deleteNoteFromList', index);
    dispatch('deleteNoteFromDb', theNote, { root: true });

    dispatch('updateFavorited', { root: true });
    dispatch('updateFiltred', { root: true });
  },
  // -------------------------------------------------------------------------------
  async updateNote({ dispatch, rootState }: ActionContext<MainState, RootState>): Promise<void> {
    const theNote = rootState.Editor.selectedNote;
    const index = await dispatch('getNoteIndex', theNote, { root: true });

    dispatch('updateFavorited', { root: true });

    dispatch('updateNoteToList', { index, theNote }, { root: true });
    dispatch('updateNoteToDb', theNote, { root: true });
  }
};

export const Main: Module<MainState, RootState> = {
  actions
};

export default Main;
