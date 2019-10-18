import Store from 'src/store/store';
import hotkeys from 'hotkeys-js';

export function setup() {
  const store = Store();

  // Switch edit mode
  hotkeys('ctrl+e', (event, handler) => {
    event.preventDefault();
    const editMode = store.state.Editor.editMode;
    store.dispatch('setEditMode', !editMode);
  });

  // Save the note
  hotkeys('ctrl+s', (event, handler) => {
    event.preventDefault();
    const editMode = store.state.Editor.editMode;
    if (editMode) {
      store.dispatch('updateNote');
    }
  });

  // Download the note
  hotkeys('ctrl+d', (event, handler) => {
    event.preventDefault();
    store.state.Editor.selectedNote.download();
  });

  // Add a new note.
  hotkeys('shift+n', (event, handler) => {
    event.preventDefault();
    store.dispatch('addNote');
  });

  // Next note.
  hotkeys('shift+tab', (event, handler) => {
    event.preventDefault();
    store.dispatch('selectNextNote');
  });

  // Previous note.
  hotkeys('shift+w+tab', (event, handler) => {
    event.preventDefault();
    store.dispatch('selectPreviousNote');
  });
}
