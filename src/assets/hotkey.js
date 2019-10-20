import Store from 'src/store/store';
import hotkeys from 'hotkeys-js';

export function setup() {
  const store = Store();

  // Switch edit mode
  hotkeys('ctrl+e', (event) => {
    event.preventDefault();
    const editMode = store.state.Editor.editMode;
    store.dispatch('setEditMode', !editMode);
  });

  // Save the note
  hotkeys('ctrl+s', (event) => {
    event.preventDefault();
    const editMode = store.state.Editor.editMode;
    if (editMode) {
      store.dispatch('updateNote');
    }
  });

  // Download the note
  hotkeys('ctrl+d', (event) => {
    event.preventDefault();
    store.state.Editor.selectedNote.download();
  });

  // Add a new note.
  hotkeys('shift+n', (event) => {
    event.preventDefault();
    store.dispatch('addNote');
  });

  // Next note.
  hotkeys('shift+tab', (event) => {
    event.preventDefault();
    store.dispatch('selectNextNote');
  });

  // Previous note.
  hotkeys('shift+w+tab', (event) => {
    event.preventDefault();
    store.dispatch('selectPreviousNote');
  });

  // Search something
  hotkeys('shift+f', (event) => {
    event.preventDefault();
    document.querySelector('.search-field > input[type=text]').focus();
  });
}
