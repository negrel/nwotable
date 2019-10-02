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
  ADD_DATABASE(state, db: IDBDatabase): void {
    state.iDb = db;
  }
};

export const actions: ActionTree<DatabaseState, RootState> = {
  initDb({ commit }: ActionContext<DatabaseState, RootState>): Promise<[Note[], File[]] | undefined> {
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

            // Set attachment state with the IndexedDb objectStores
            const attachmentObjectStore = db.transaction('attachment', 'readonly').objectStore('attachment');

            const getAttachment = attachmentObjectStore.getAll();

            getAttachment.onsuccess = (event: any): void => {
              const attachmentList = event.target.result;

              resolve([noteList, attachmentList]);
            };

            getAttachment.onerror = (): void => {
              alert('Error while getting the attachment from IndexedDb.');
              reject();
            };
          };

          getNotes.onerror = (): void => {
            alert('Error while getting the notes from IndexedDb.');
            reject();
          };
        };

        request.onupgradeneeded = (event: any): void => {
          const db = event.target.result;

          const noteObjectStore = db.createObjectStore('notes', { keyPath: 'note.meta.created' });

          noteObjectStore.createIndex('content', 'content', { unique: true });
          noteObjectStore.createIndex('tags', 'tags', { unique: false });
          noteObjectStore.createIndex('favorited', 'favorited', { unique: false });
          noteObjectStore.createIndex('pinned', 'pinned', { unique: false });

          const attachmentObjectStore = db.createObjectStore('attachment', { keyPath: 'name' });

          attachmentObjectStore.createIndex('name', 'name', { unique: true });

          attachmentObjectStore.transaction.oncomplete = (): void => {
            console.log('Indexed DB ready.');
          };
        };
      }
    });
  },
  saveNoteToDb({ state }: ActionContext<DatabaseState, RootState>, theNote: Note): void {
    if (state.iDb) {
      const store = state.iDb.transaction('notes', 'readwrite').objectStore('notes');
      store.add(theNote);
    }
  },
  updateNoteToDb({ state }: ActionContext<DatabaseState, RootState>, theNote: Note): void {
    if (state.iDb) {
      const store = state.iDb.transaction('notes', 'readwrite').objectStore('notes');

      store.put(theNote);
    }
  },
  deleteNoteFromDb({ state }: ActionContext<DatabaseState, RootState>, theNote: Note): void {
    if (state.iDb) {
      state.iDb.transaction('notes', 'readwrite')
        .objectStore('notes')
        .delete(theNote.data.meta.created);
    }
  },
  saveAttachmentToDb({ state }: ActionContext<DatabaseState, RootState>, file: File): void {
    if (state.iDb) {
      const store = state.iDb.transaction('attachment', 'readwrite').objectStore('attachment');

      store.add(file);
    }
  },
  deleteAttachmentFromDb({ state }: ActionContext<DatabaseState, RootState>, file: File): void {
    if (state.iDb) {
      state.iDb.transaction('attachment', 'readwrite')
        .objectStore('attachment')
        .delete(file.name);
    }
  }
};

export const Database: Module<DatabaseState, RootState> = {
  state,
  mutations,
  actions
};

export default Database;
