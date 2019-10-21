import { MutationTree, ActionTree, ActionContext, Module } from 'vuex';
import { RootState } from './store';

export interface PromptState {
  active: boolean;
}

export const state: PromptState = {
  active: false
};

export const mutations: MutationTree<PromptState> = {
  SET_ACTIVE(state, payload): void {
    state.active = payload;
  }
};

export const actions: ActionTree<PromptState, RootState> = {
  setPromptState({ commit }: ActionContext<PromptState, RootState>, payload): void {
    commit('SET_ACTIVE', payload);
  }
};

export const Prompt: Module<PromptState, RootState> = {
  state,
  mutations,
  actions
};

export default Prompt;
