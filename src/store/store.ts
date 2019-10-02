import Vue from 'vue';
import Vuex from 'vuex';

import { Database, DatabaseState } from './database';
import { Editor, EditorState } from './editor';
import { NoteList, NoteListState } from './noteList';
import { Attachments, AttachmentState } from './attachment';

export interface RootState {
  Editor: EditorState;
  Database: DatabaseState;
  NoteList: NoteListState;
  NoteAttachment: AttachmentState;
};

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */): any {
  const Store = new Vuex.Store<RootState>({
    modules: {
      Editor,
      Database,
      NoteList,
      Attachments
    }

    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEV
  });

  return Store;
}
