import * as ActionTypes from '../constants/ActionTypes';
import _ from 'underscore';

var rawData = require('json!../data/firefoxfeud.json');
var strings = require('json!../data/questions.json');

var responses = {}

var d = _.each(rawData, function(obj){
  _.each(obj, function(k,v){
    if(v !== 'responseId') {
      responses[v] = responses[v] || {}
      if(!responses[v][k]) responses[v][k] = 0;
      responses[v][k] += 1;
    }
  })
})

_.each(responses, function(r, k){
  var sorted = [];
  for(var answer in r) {
    sorted.push([answer, r[answer]])
  }

  sorted = _.sortBy(sorted, function(p){
    return -p[1]
  })

  responses[k] = sorted
})

let defaultState = {
  data: responses,
  questions: _.keys(responses),
  current_question: 0,
  strings: strings,
  question_visible: false,
  visible_questions: []
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.NEXT_QUESTION:
      var q = state.current_question;
      var q1 = q + 1;

      if(q1 > state.questions.length - 1) q1 = state.questions.length;

      return {...state, current_question: q1, question_visible: false};

    case ActionTypes.PREV_QUESTION:
      var q = state.current_question;
      var q1 = q - 1;

      if(q1 < 0) q1 = 0;

      return {...state, current_question: q1, question_visible: false};

    case ActionTypes.TOGGLE_QUESTION:
      var q = state.question_visible;
      q = !q;

      return {...state, question_visible: q};

    case ActionTypes.TOGGLE_ANSWER:
      var q = state.visible_questions;
      var i = q.indexOf(action.key);

      if (i === -1)
        q.push(action.key);
      else
        q.splice(i,1);

      return { ...state, visible_questions: q};

    default:
      return state;
  }
}
