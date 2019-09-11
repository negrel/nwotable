import { Note } from '../types';
import { ActionContext, MutationTree, ActionTree, Module } from 'vuex';
import { RootState } from './store'

export interface DatabaseState {
  noteList: Note[],
  iDb: any
}

export const state: DatabaseState = {
  noteList: [
    {
      body: '### WSH',
      lastEdit: "a10",
      label: false,
      favorite: false,
      pin: false
    },
    {
      body: '## Ici la seconde.',
      lastEdit: 'b20',
      label: false,
      favorite: false,
      pin: false
    },
    {
      body: '# Et moi je suis la petite dernière',
      lastEdit: 'c30',
      label: false,
      favorite: false,
      pin: false
    } 
  ],
  iDb: {}
};

export const mutations: MutationTree<DatabaseState> = {
  ADD_DATABASE(state, db: any) {
    state.iDb = db;
  },
  UPDATE_NOTE(state, { index, note }:{ index: number, note: Note }) {
    state.noteList[index] = note;
  }
};

export const actions: ActionTree<DatabaseState, RootState> = {
  initDb({ commit, dispatch }: ActionContext<DatabaseState, RootState>) {
    if (!window.indexedDB) {
      alert('Your browser doesn\'t support IndexedDb. The app may not save your notes');
    } else {
      let request = window.indexedDB.open('Notes App', 1);

      request.onerror = (event: any) => {
        alert('An error occur while using IndexedDb. The app may not save your notes locally.');
      };

      request.onsuccess = (event: any) => {
        let db = event.target.result;

        // Gestionnaire d'erreur générique pour toutes les erreurs de requêtes de cette db
        db.onerror = (event: any) => {
          alert('Database error: ' + event.target.errorCode);
        };

        commit('ADD_DATABASE', db);

        // Set notes state with the IndexedDb objectStores
        let noteObjectStore = db.transaction('notes', 'readonly').objectStore('notes');

        let getNotes = noteObjectStore.getAll();

        getNotes.onsuccess = () => {
          dispatch('setNoteList', event.target.result);
        };

        getNotes.onerror = () => {
          alert('Error while getting the notes from IndexedDb.');
        };
      };

      request.onupgradeneeded = (event: any) => {
        let db = event.target.result;

        // Crée un objet de stockage pour cette base de données
        let noteObjectStore = db.createObjectStore('notes', { keyPath: 'lastEdit' });

        // Créer un index pour rechercher les note par leur titre et leur body.
        noteObjectStore.createIndex('lastEdit', 'lastEdit', { unique: false });
        noteObjectStore.createIndex('body', 'body', { unique: false });
        noteObjectStore.createIndex('label', 'label', { unique: false });
        noteObjectStore.createIndex('favorite', 'favorite', { unique: false });
        noteObjectStore.createIndex('pin', 'pin', { unique: false });

        // Utiliser la transaction "oncomplete" pour être sûr que la création de l'objet de stockage
        // est terminée avant d'ajouter des données dedans.
        noteObjectStore.transaction.oncomplete = () => {
          // Stocker les valeurs dans le nouvel objet de stockage.
          console.log('Indexed DB ready.');
        };
      };
    }
  },
  setNoteList({ commit, state }: ActionContext<DatabaseState, RootState>) {
    // Set the selected note to the first in the list.
    commit('SET_SELECTED_NOTE', state.noteList[0], { root: true });
  },
  getIndex({ state }: ActionContext<DatabaseState, RootState>, note: Note) {
    return state.noteList.map((data: Note) => data.lastEdit.toString()).indexOf(note.lastEdit.toString());
  },
  editNote({ dispatch, commit }: ActionContext<DatabaseState, RootState>, note: Note) {
    let index = dispatch('getIndex', note);
    commit('UPDATE_NOTE', { index, note });
  }
};

export const Database: Module<DatabaseState, RootState> = {
  state,
  mutations,
  actions
};

export default Database;
