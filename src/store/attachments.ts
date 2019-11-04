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
  DELETE_ATTACHMENT(state, index: number): void {
    state.attachmentList.splice(index, 1);
  }
};

export const actions: ActionTree<AttachmentState, RootState> = {
  addAttachmentToList({ commit, state }: ActionContext<AttachmentState, RootState>, attachment: Attachment): void {
    const exist = state.attachmentList.map((el: Attachment): string => el.name).indexOf(attachment.name);
    if (exist === -1) {
      commit('ADD_ATTACHMENT', attachment);
    } else {
      alert(`Your already have an attachment named ${attachment.name}`);
    }
  },
  async deleteAttachmentFromList({ commit, dispatch }: ActionContext<AttachmentState, RootState>, attachment: File): Promise<void> {
    const index = await dispatch('getAttachmentIndex', attachment);
    commit('DELETE_ATTACHMENT', index);
  },
  getAttachmentIndex({ state }: ActionContext<AttachmentState, RootState>, attachName: string): number {
    return state.attachmentList.map((element: Attachment): string => element.name).indexOf(attachName);
  }
};

export const Attachments: Module<AttachmentState, RootState> = {
  state,
  mutations,
  actions
};

export default Attachments;
