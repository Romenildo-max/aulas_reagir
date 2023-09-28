import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component { //podemos ter components de class ou de função
  constructor(props) {
    super();
    this.state= {
      name: 'Otavio Miranda'
    };  
  }

  handlePClick() { //metodo da class App
    console.log('<p> clicado')
  }

  render() {
    //const name = this.state.name;
    const { name } = this.state; //isso que é destructury, mesma coisa de exemplo acima para atribuição

    return ( //a utilização de () no return é porque estamos retornando mais de um linha(mais de uma coisa)
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={this.handlePClick}>
          {name}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  }
}

/*
function App() { //isto é um compoment do react
  
}
*/

export default App;