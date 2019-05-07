import {knowledgeStore} from "./KnowledgeStore";
import {action, extendObservable} from "mobx"
import luna from "../utils/Luna";

class KnowledgeService {
  @action
  hideAnswerInput() {
    knowledgeStore.answerInputVisible = false;
    knowledgeStore.questionId = '';
  }

  @action
  showAnswerInput(question_id) {
    knowledgeStore.answerInputVisible = true;
    knowledgeStore.questionId = question_id;
  }


  @action
  toggleLike(id) {
    return new Promise(function (resolve, reject) {
      luna.put('/question/like', {
        id: id
      })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  @action
  postAnswer(question_id, comment) {
    return new Promise(function (resolve, reject) {
      luna.post('/answer',
        {
          'question_id': question_id,
          'comment': comment
        })
        .then((response) => {
          if (!knowledgeStore.pool[question_id].comment) {
            extendObservable(knowledgeStore.pool[question_id], {'comment': [comment,]});
            knowledgeStore.pool[question_id].answer = 1;
          }
          else {
            knowledgeStore.pool[question_id].comment = [{'comment': comment}, ...knowledgeStore.pool[question_id].comment];
          }
          resolve(response);
        })
        .catch((error) => {
            console.warn(error);
            reject(error);
          }
        );
    })
  }
}

export const knowledgeService = new KnowledgeService();