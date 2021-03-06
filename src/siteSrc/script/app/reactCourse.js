import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../../style/react-course.scss';

import {Person} from '../components/reactCourse';

class App extends Component {

  constructor(){
    super();
    this.state = {
      people: [{
        name: 'Paul',
        type: 'good',
        message: 'At least I try to be'
      }, {
        name: 'John',
        type: 'bad',
        message: null
      }],
      currentPerson: null,
      showPerson: true
    };
    this.state.currentPerson = this.state.people[0];
    // this.switchNameHandler = this.switchNameHandler.bind(this);
  }

  toggleShowPeopleHandler = () => {
    console.log('toggleShowPeopleHandler');
    this.setState({showPerson: !this.state.showPerson});
  }

  switchNameHandler = () => {
    const newState = this.state;

    var currentPersonIndex = 0;
    if (this.state.currentPerson.name === 'John') {
      currentPersonIndex = 1;
    }

    var newPersonIndex = 0;
    if (currentPersonIndex === 0) {
      newPersonIndex = 1;
    } else {
      newPersonIndex = 0;
    }

    newState.currentPerson = this.state.people[newPersonIndex];
    this.setState(newState);
  }

  handlePersonSayHello = (props) => {
    console.log(`person ${props.name} is saying hello`);
  }

  /*
  instanceProperty = "bork";
  boundFunction = () => {
    return this.instanceProperty;
  }

  somethingHandler = () => {
    console.log('something else was clicked');
  }
  */

  /*
  switchNameHandler() {
    console.log('switch name was called');
  }
  */

  render() {

    return (
      <div className='App'>
        <h1>Hi. I'm a react app</h1>
        <p>People are shown: {this.state.showPerson?'true':'false'}</p>
        {
          this.state.showPerson ?
            <Person name={this.state.currentPerson.name} type={this.state.currentPerson.type} clickHandler={this.handlePersonSayHello}>{this.state.currentPerson.message}</Person>
          : null
        }
        <button onClick={this.toggleShowPeopleHandler}>Toggle Showing People</button>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);