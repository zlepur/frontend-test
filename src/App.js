import React, { Component } from 'react';
import './App.css';

const BLACK = '#000000';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <RandomColor />
        </header>
      </div>
    );
  }
}

class RandomColor extends Component {
  constructor() {
    super();
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
        <div className="color-box" style={{backgroundColor: this.state.currentColor}}></div>
        <button onClick={this.onToggleColorClick}>Toggle color</button>
      </div>
    );
  }
}

export default App;
