import {NEXT_QUESTION, PREV_QUESTION, TOGGLE_QUESTION, TOGGLE_ANSWER} from '../constants/ActionTypes';

export function nextQuestion() {
  return {
    type: NEXT_QUESTION
  }
}

export function prevQuestion() {
  return {
    type: PREV_QUESTION
  }
}

export function toggleQuestion() {
  return {
    type: TOGGLE_QUESTION
  }
}

export function toggleAnswer(key) {
  return {
    type: TOGGLE_ANSWER,
    key: key
  }
}