import {computed, observable} from "mobx";

class KnowledgeStore {
  @observable pool = {};
  @observable references = {all: [], answer: [], my: []};
  @observable answerInputVisible = false;
  @observable questionId = '';



  @computed
  get currentAnswerInputVisible() {
    return this.answerInputVisible;
  }

  @computed
  get currentQuestionId() {
    return this.questionId;
  }


}

export const knowledgeStore = new KnowledgeStore();