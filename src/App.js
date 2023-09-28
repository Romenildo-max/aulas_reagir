import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component { //podemos ter components de class ou de função
  //this.handlePClick = this.handlePClick.bind(this); //isso que é o bind para utilziar o this
  state= { //este é o state -> estado
    name: 'Otavio Miranda',
    counter: 0
  };  
  

  handlePClick = () => { //metodo da class App
    this.setState({ name: 'Júnior' });
  }

  handleAClick = (e) => { //quando utilizar arroy function não precisar utilizar o (this) ex: this.handleAClick = this.handleAClick.bind(this) para fazer o bind na class
    e.preventDefault();
    const { counter } = this.state;
    this.setState({ counter: counter + 1 });
  }

  render() {
    //const name = this.state.name;
    const { name, counter } = this.state; //isso que é destructury, mesma coisa de exemplo acima para atribuição

    return ( //a utilização de () no return é porque estamos retornando mais de um linha(mais de uma coisa)
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={this.handlePClick}>
          {name} {counter}
        </p>
        <a
        onClick={this.handleAClick} //passando referencia e não chamando a função
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Este é o link
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