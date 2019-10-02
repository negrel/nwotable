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
  },
  DELETE_ATTACHMENT(state, payload: Attachment): void {
    const index = state.attachmentList.map((el: Attachment): string => el.name).indexOf(payload.name);
    state.attachmentList.splice(index, 1);
  }
};

export const actions: ActionTree<AttachmentState, RootState> = {
  addAttachment({ commit, state }: ActionContext<AttachmentState, RootState>, attachment: Attachment): void {
    const exist = state.attachmentList.map((el: Attachment): string => el.name).indexOf(attachment.name);
    if (exist === -1) {
      commit('ADD_ATTACHMENT', attachment);
    } else {
      alert(`Your already have an attachment named ${attachment.name}`);
    }
  },
  deleteAttachment({ commit }: ActionContext<AttachmentState, RootState>, attachment: File): void {
    commit('DELETE_ATTACHMENT', attachment);
  }
};

export const Attachments: Module<AttachmentState, RootState> = {
  state,
  mutations,
  actions
};

export default Attachments;
