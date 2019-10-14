import { Note, NoteType } from '../class/Note';
import { MutationTree, ActionTree, ActionContext, Module } from 'vuex';
import { RootState } from './store';

export interface FilterState {
  filtred: number[];
  filter: string;
  favorited: number;
}

export const state: FilterState = {
  filtred: [],
  filter: 'all',
  favorited: 0
};

export const mutations: MutationTree<FilterState> = {
  SET_LIST(state, payload): void{
    state.filtred = payload;
  },
  SET_FAV(state, payload): void {
    state.favorited = payload;
  }
};

export const actions: ActionTree<FilterState, RootState> = {
  filterByAll({ commit, rootState }: ActionContext<FilterState, RootState>): void {
    const length = rootState.Notes.noteList.length;
    const payload = [];

    for (let i = 0; i < length; i++) {
      payload[i] = i;
    }
    commit('SET_LIST', payload);
  },
  filterByFav(): void {

  },
  updateFavorited({ rootState, commit }: ActionContext<FilterState, RootState>): void {
    const favorited = rootState.Notes.noteList.filter((el): boolean => el.favorited).length;

    commit('SET_FAV', favorited);
  },
  updateFiltred({ dispatch, state }: ActionContext<FilterState, RootState>): void {
    switch (state.filter) {
      case 'all':
        dispatch('filterByAll');
        break;
      default:
        dispatch('filterByAll');
        break;
    }
  },
  getFiltredIndex({ state }: ActionContext<FilterState, RootState>, index: number): number {
    return state.filtred.indexOf(index);
  }
};

export const Filters: Module<FilterState, RootState> = {
  state,
  mutations,
  actions
};

export default Filters;
