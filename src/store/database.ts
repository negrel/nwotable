import { Note } from '../class/Note';
import { ActionContext, MutationTree, ActionTree, Module } from 'vuex';
import { RootState } from './store';

export interface DatabaseState {
  noteList: Note[];
  iDb: any;
}

export const state: DatabaseState = {
  noteList: [
    new Note({
      title: 'Start taking note now !',
      content: '# No note saved.',
      meta: {
        created: '15/10/2000',
        modified: new Date('11/09/2019'),
        tags: [],
        favorited: false,
        pinned: false
      }
    })
  ],
  iDb: {}
};

export const mutations: MutationTree<DatabaseState> = {
  ADD_DATABASE(state, db: any): void {
    state.iDb = db;
  },
  UPDATE_NOTE(state, { index, note }: { index: number; note: Note }): void {
    state.noteList[index] = note;
  },
  ADD_NOTE(state, payload): void {
    state.noteList.unshift(payload);
  },
  DELETE_NOTE(state, index): void {
    state.noteList.splice(index, 1);
  }
};

export const actions: ActionTree<DatabaseState, RootState> = {
  initDb({ commit, dispatch }: ActionContext<DatabaseState, RootState>): void {
    if (!window.indexedDB) {
      alert('Your browser doesn\'t support IndexedDb. The app may not save your notes');
    } else {
      const request = window.indexedDB.open('Notes App', 1);

      request.onerror = (): void => {
        alert('An error occur while using IndexedDb. The app may not save your notes locally.');
      };

      request.onsuccess = (event: any): void => {
        const db = event.target.result;

        // Gestionnaire d'erreur générique pour toutes les erreurs de requêtes de cette db
        db.onerror = (event: any): void => {
          alert('Database error: ' + event.target.errorCode);
        };

        commit('ADD_DATABASE', db);

        // Set notes state with the IndexedDb objectStores
        const noteObjectStore = db.transaction('notes', 'readonly').objectStore('notes');

        const getNotes = noteObjectStore.getAll();

        getNotes.onsuccess = (): void => {
          dispatch('setNoteList', event.target.result);
        };

        getNotes.onerror = (): void => {
          alert('Error while getting the notes from IndexedDb.');
        };
      };

      request.onupgradeneeded = (event: any): void => {
        const db = event.target.result;

        // Crée un objet de stockage pour cette base de données
        const noteObjectStore = db.createObjectStore('notes', { keyPath: 'lastEdit' });

        // Créer un index pour rechercher les note par leur titre et leur body.
        noteObjectStore.createIndex('lastEdit', 'lastEdit', { unique: false });
        noteObjectStore.createIndex('body', 'body', { unique: false });
        noteObjectStore.createIndex('label', 'label', { unique: false });
        noteObjectStore.createIndex('favorite', 'favorite', { unique: false });
        noteObjectStore.createIndex('pin', 'pin', { unique: false });

        // Utiliser la transaction "oncomplete" pour être sûr que la création de l'objet de stockage
        // est terminée avant d'ajouter des données dedans.
        noteObjectStore.transaction.oncomplete = (): void => {
          // Stocker les valeurs dans le nouvel objet de stockage.
          console.log('Indexed DB ready.');
        };
      };
    }
  },
  setNoteList({ dispatch, state }: ActionContext<DatabaseState, RootState>): void {
    // Set the selected note to the first in the list.
    dispatch('setSelectedNote', state.noteList[0], { root: true });
  },
  getIndex({ state }: ActionContext<DatabaseState, RootState>, note: Note): number {
    return state.noteList.map((element: Note): string => element.data.meta.created.toString()).indexOf(note.data.meta.created.toString());
  },
  editNote({ dispatch, commit }: ActionContext<DatabaseState, RootState>, note: Note): void {
    const index = dispatch('getIndex', note);
    commit('UPDATE_NOTE', { index, note });
  },
  addNewNote({ commit }: ActionContext<DatabaseState, RootState>, theNote: Note = new Note()): void {
    commit('ADD_NOTE', theNote);
  },
  deleteNote({ commit, dispatch }: ActionContext<DatabaseState, RootState>, theNote: Note): void {
    const index = dispatch('getIndex', theNote);
    commit('DELETE_NOTE', index);
    dispatch('setNoteList');
  }
};

export const Database: Module<DatabaseState, RootState> = {
  state,
  mutations,
  actions
};

export default Database;
