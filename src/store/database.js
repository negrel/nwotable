export const state = {
  noteList: [
    {
      body: '### WSH',
      lastEdit: 'a10'
    },
    {
      body: '## Ici la seconde.',
      lastEdit: 'b20'
    },
    {
      body: '# Et moi je suis la petite dernière',
      lastEdit: 'c30'
    }
  ],
  iDb: {}
};

export const mutations = {
  ADD_DATABASE(state, db) {
    state.iDb = db;
  },
  UPDATE_NOTE(state, { index, note }) {
    state.noteList[index] = note;
  }
};

export const actions = {
  initDb({ commit, dispatch }) {
    if (!window.indexedDB) {
      alert('Your browser doesn\'t support IndexedDb. The app may not save your notes');
    } else {
      let request = window.indexedDB.open('Notes App', 1);

      request.onerror = event => {
        alert('An error occur while using IndexedDb. The app may not save your notes locally.');
      };

      request.onsuccess = event => {
        let db = event.target.result;

        // Gestionnaire d'erreur générique pour toutes les erreurs de requêtes de cette db
        db.onerror = function(event) {
          alert('Database error: ' + event.target.errorCode);
        };

        commit('ADD_DATABASE', db);

        // Set notes state with the IndexedDb objectStores
        let noteObjectStore = db.transaction('notes', 'readonly').objectStore('notes');

        let getNotes = noteObjectStore.getAll();

        getNotes.onsuccess = event => {
          dispatch('setNoteList', event.target.result);
        };

        getNotes.onerror = event => {
          alert('Error while getting the notes from IndexedDb.');
        };
      };

      request.onupgradeneeded = event => {
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
        noteObjectStore.transaction.oncomplete = event => {
          // Stocker les valeurs dans le nouvel objet de stockage.
          console.log('Indexed DB ready.');
        };
      };
    }
  },
  setNoteList({ commit, state }) {
    // Set the selected note to the first in the list.
    commit('SET_SELECTED_NOTE', state.noteList[0], { root: true });
  },
  getIndex({ state }, note) {
    return state.nwotes.map(data => data.lastEdit.toString()).indexOf(note.lastEdit.toString());
  },
  editNote({ dispatch, commit }, note) {
    let index = dispatch('getIndex', note);
    commit('UPDATE_NOTE', { index, note });
  }
};

export default {
  state,
  mutations,
  actions
};
