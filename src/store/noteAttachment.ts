import { Attachment } from '../class/Attachment';
import { ActionContext, MutationTree, ActionTree, Module } from 'vuex';
import { RootState } from './store';

export interface AttachmentState {
  attachmentList: Attachment[];
}

export const state: AttachmentState = {
  attachmentList: []
};

export const mutations: MutationTree<AttachmentState> = {
  ADD_ATTACHMENT(state, payload: Attachment): void {
    state.attachmentList.push(payload);
  }
};

export const actions: ActionTree<AttachmentState, RootState> = {
  addAttachment({ commit }: ActionContext<AttachmentState, RootState>, attachment: Attachment): void {
    commit('ADD_ATTACHMENT', attachment);
  },
  deleteAttachment({ commit }: ActionContext<AttachmentState, RootState>, attachment: File): void {

  }
};

export const NoteAttachment: Module<AttachmentState, RootState> = {
  state,
  mutations,
  actions
};

export default NoteAttachment;
