import { Component } from "react";

import './styles.css';

import { Posts } from "../../components/Posts/index"; // ../ sai da pasta atual para anterior(voltar pasta) ./ mantem dentro da pasta atual
import { loadPosts } from '../../utils/load-post';
import { Button } from "../../components/Button";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0, //0 porque é apenas uma pagina
    postsPerPage: 53 //quantidade de post que ira aparecer na pagina
  };

  async componentDidMount() { //metodo DidMount para renderizar a função loadPosts -> carregar
    await this.loadPosts();  
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state; //atualizando o state -> estado da page e postsPerPage
    const postsAndPhotos = await loadPosts(); //importando função e executando ela
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage), //fatiando array, para não aparecer todos os post na pagina, pagina(page) 0 aparece-la 2 posts(postsPerPage) 
      allPosts: postsAndPhotos 
    }); //setState para atualizar o state -> estado, setando o estado posts para postsAndPhotos e allPosts(todos posts no caso)
  }

  loadMorePosts = () => { //metodo para carregar mais post na pagina
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state; 
    const nextPage = page + postsPerPage; //começando page mais quantidade de postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage) //estapalhar de todos os posts(allposts), os posts iniciais(nextPage) mais os proximos post
    posts.push(...nextPosts); //espalhando os posts dentro do array nextPosts para ir adiconando post assim que chamar o metodo loadMorePosts

    this.setState({ posts, page: nextPage }) //configurando o state -> estado de posts e page que é igual á nextPage 
  }
  
  render() {
    const { posts, page, postsPerPage, allPosts } = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length; //se a pagina atual que estou(page) mais postsPerPage for maior ou igual que todos post(allposts) desativar button

    return (
      <section className="container">
        <Posts posts={posts} />

        <div className="button-container">
          <Button 
            text="Load more post"
            onClick={this.loadMorePosts} //utilizando a props onClick para recuperar o metodo LoadMorePosts
            disabled={noMorePosts}
          /> 
        </div>
      </section>
    );
  }

};
export default Home;
