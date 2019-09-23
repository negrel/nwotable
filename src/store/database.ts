import { Note } from '../class/Note';
import { ActionContext, MutationTree, ActionTree, Module } from 'vuex';
import { RootState } from './store';

export interface DatabaseState {
  iDb: IDBDatabase | null;
}

export const state: DatabaseState = {
  iDb: null
};

export const mutations: MutationTree<DatabaseState> = {
  ADD_DATABASE(state, db: any): void {
    state.iDb = db;
  }
};

export const actions: ActionTree<DatabaseState, RootState> = {
  initDb({ commit }: ActionContext<DatabaseState, RootState>): Promise<Note[] | undefined> {
    return new Promise((resolve, reject): Note[] | void => {
      if (!window.indexedDB) {
        alert('Your browser doesn\'t support IndexedDb. The app may not save your notes');
        reject();
      } else {
        const request = window.indexedDB.open('Nwotable', 1);

        request.onerror = (): void => {
          alert('An error occur while using IndexedDb. The app may not save your notes locally.');
          reject();
        };

        request.onsuccess = (event: any): void => {
          const db = event.target.result;

          // Gestionnaire d'erreur générique pour toutes les erreurs de requêtes de cette db
          db.onerror = (event: any): void => {
            alert('Database error: ' + event.target.error);
            reject();
          };

          commit('ADD_DATABASE', db);

          // Set notes state with the IndexedDb objectStores
          const noteObjectStore = db.transaction('notes', 'readonly').objectStore('notes');

          const getNotes = noteObjectStore.getAll();

          getNotes.onsuccess = (event: any): void => {
            const noteList = event.target.result;
            resolve(noteList);
          };

          getNotes.onerror = (): void => {
            alert('Error while getting the notes from IndexedDb.');
            reject();
          };
        };

        request.onupgradeneeded = (event: any): void => {
          const db = event.target.result;

          // Crée un objet de stockage pour cette base de données
          // TODO ajouter keypath created metadata
          const noteObjectStore = db.createObjectStore('notes', { keyPath: 'note.meta.created' });

          // Créer un index pour rechercher les note par leur titre et leur body.
          noteObjectStore.createIndex('content', 'content', { unique: true });
          noteObjectStore.createIndex('tags', 'tags', { unique: false });
          noteObjectStore.createIndex('favorited', 'favorited', { unique: false });
          noteObjectStore.createIndex('pinned', 'pinned', { unique: false });

          // Utiliser la transaction "oncomplete" pour être sûr que la création de l'objet de stockage
          // est terminée avant d'ajouter des données dedans.
          noteObjectStore.transaction.oncomplete = (): void => {
            // Stocker les valeurs dans le nouvel objet de stockage.
            console.log('Indexed DB ready.');
          };
        };
      }
    });
  },
  saveNoteToDb({ state }: ActionContext<DatabaseState, RootState>, theNote: Note): void {
    if (state.iDb) {
      const store = state.iDb.transaction('notes', 'readwrite').objectStore('notes');

      // Save the note to indexed DB.
      if (theNote.data.meta.modified) {
        store.put(theNote);
      } else {
        theNote.modified();
        store.add(theNote).onerror = (event: any): void => {
          alert(event);
        };
      }
    }
  },
  deleteNoteFromDb({ state }: ActionContext<DatabaseState, RootState>, theNote: Note): void {
    if (state.iDb) {
      state.iDb.transaction('notes', 'readwrite')
        .objectStore('notes')
        .delete(theNote.data.meta.created);
    }
  }
};

export const Database: Module<DatabaseState, RootState> = {
  state,
  mutations,
  actions
};

export default Database;
