import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from '../../css/app.css';
import {bindActionCreators} from 'redux';
import * as HomeActions from '../actions/HomeActions';
import _ from 'underscore'

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {flipped: true};
    this.flipState = this.flipState.bind(this);
  }

  flipState() {
    const {dispatch} = this.props;
    const actions = bindActionCreators(HomeActions, dispatch);
    actions.toggleAnswer(this.props.index);
  }

  render() {
    const {visible_questions, dispatch} = this.props;
    var isVisible = ( !_.contains(visible_questions, this.props.index)) ? true : false;
    var v = isVisible ? " " + styles.flipped : "";

    return (
      <div className={styles.answerContainer + v} onClick={this.flipState}>
        <div className={styles.answer}>
          <div className={styles.backside}><p>{ this.props.index + 1}</p></div>
          <div className={styles.frontside}>
            <p>{ this.props.answer[0] } <b>{ this.props.answer[1] }</b></p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state.Sample)(Answer)