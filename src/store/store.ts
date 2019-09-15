import Vue from 'vue';
import Vuex from 'vuex';

import { Database, DatabaseState } from './database';
import { Editor, EditorState } from './editor';

export interface RootState {
  Editor: EditorState;
  Database: DatabaseState;
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
      Database
    }

    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEV
  });

  return Store;
}
