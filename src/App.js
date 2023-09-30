import { Component } from "react";

import './App.css';

import { loadPosts } from './utils/load-post';
import { Posts } from "./components/Posts";

class App extends Component {
  state = {
    posts: [
      
    ]
  };

  async componentDidMount() { //metodo DidMount para renderizar a função loadPosts -> carregar
    await this.loadPosts();  
  }

  loadPosts = async () => {
    const postsAndPhotos = await loadPosts(); //importando função e executando ela
    this.setState({ posts: postsAndPhotos }); //setState para atualizar o state -> estado, setando o estado posts para postsAndPhotos
  }
  
  render() {
    const { posts } = this.state

    return (
      <section className="container">
        <Posts posts={posts} />
      </section>
    );
  }

};
export default App;
