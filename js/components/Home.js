import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as HomeActions from '../actions/HomeActions';
import styles from '../../css/app.css';
import Answer from './Answer'
import _ from 'underscore'

class Home extends Component {

  render() {
    const {data, questions, strings, current_question, question_visible, visible_questions, dispatch} = this.props;
    const actions = bindActionCreators(HomeActions, dispatch);

    var v = question_visible ? " " + styles.visible : "";

    return (
      <main>
        <h1 className={styles.question + v} onClick={actions.toggleQuestion} >{strings[questions[current_question]]}</h1>

        <div className={styles.answers}>

          <div className={styles.left}>
            {data[questions[current_question]].slice(0,5).map(function(answer, i){
              return (
                <Answer key={answer[0]} answer={answer} index={i} />
              );
            })}
          </div>

          <div className={styles.right}>
            {data[questions[current_question]].slice(5,10).map(function(answer, i){
              return (
                <Answer key={answer[0]} answer={answer} index={i + 5} />
              );
            })}
          </div>

        </div>

        <div className={styles.buttons}>
          <button onClick={actions.prevQuestion}>
            Previous Question
          </button>

          <button onClick={actions.nextQuestion}>
            Next Question
          </button>

          <p>{ current_question + 1 } / { Object.keys(questions).length }</p>
        </div>


      </main>
    );
  }
}

export default connect(state => state.Sample)(Home)
