import React, { Component } from 'react';
import './App.css';

const BLACK = '#000000';

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: 'default',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({text: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <RandomColor text={this.state.text}/>
          <TextInput textChangedCallback={this.handleInputChange}/>
        </header>
      </div>
    );
  }
}

class RandomColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [],
      currentColor: BLACK,
    };
    this.onToggleColorClick = this.onToggleColorClick.bind(this);
  }

  async fetchColors() {
    const init = {method: 'GET'};
    let response = await fetch('http://www.colr.org/json/colors/random/2', init);
    if(!response.ok) {
      return [];
    }
    let data = await response.json();
    return data.colors.map(color => '#' + color.hex);
  }

  componentDidMount() {
    let colors = this.fetchColors();
    colors.then(colors => this.setState({colors: colors}));
  }

  onToggleColorClick() {
    let color;
    if(this.state.currentColor === BLACK) {
      color = this.state.colors[Math.floor(Math.random() * this.state.colors.length)];
    } else {
      color = BLACK;
    }
    this.setState({currentColor: color});
  }

  render() {
    return (
      <div>
        <label style={{color: this.state.currentColor}}>{this.props.text}</label>
        <button onClick={this.onToggleColorClick}>Toggle color</button>
      </div>
    );
  }
}

function TextInput(props) {
  return (
    <input type="text" onChange={props.textChangedCallback}></input>
  );
}

export default App;
