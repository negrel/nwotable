import Vue from 'vue';
import Vuex from 'vuex';

import { Main, MainState } from './main';
import { Database, DatabaseState } from './database';
import { Editor, EditorState } from './editor';
import { Notes, NoteListState } from './notes';
import { Attachments, AttachmentState } from './attachments';
import { Filters, FilterState } from './filters';

export interface RootState {
  Main: MainState;
  Editor: EditorState;
  Database: DatabaseState;
  Notes: NoteListState;
  NoteAttachment: AttachmentState;
  Filters: FilterState;
};

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */): any {
  const Store = new Vuex.Store<RootState>({
    modules: {
      Main,
      Editor,
      Database,
      Notes,
      Attachments,
      Filters
    }

    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEV
  });

  return Store;
}
