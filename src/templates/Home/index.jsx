import { useEffect, useState, useCallback } from "react";

import './styles.css';

import { Posts } from "../../components/Posts/index"; // ../ sai da pasta atual para anterior(voltar pasta) ./ mantem dentro da pasta atual
import { loadPosts } from '../../utils/load-post';
import { Button } from "../../components/Button";
import { TextInput } from "../../components/textInput";

export const Home = () => { //função para trnasforma em react hoots  
  const [posts, setPosts] = useState([]); //primeiro parametro do useState é a coisa que quero configurar, ele retorna um array e uma função para setar os valores do array(posts) -> useState com array vazio que é o valor inicial de post(array), mesma coisa para os useState de baixo
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0); //esse muda que é o indice da pagina que é 0
  const [postsPerPage] = useState(3); //o que muda nesse que ao inves de array vazio de inicio ele começa com numero 3 que é a quantidade de posts que irá aparecer na pagina
  const [searchValue, setSearchValue] = useState('');
  //isso são os estado -> state porem é hooks
  
  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredposts = !!searchValue ? //variavel para filtra os allposts, junto com operação ternaria para colocar uma logica
    allPosts.filter(post => {
      return post.title.toLowerCase().includes( //pagando cada titulo(title) do posts e convertendo para minuscula
        searchValue.toLowerCase() //incluindo o sarchValue com letras minusculas para filtra, deixar todas letras minuscula
      );
    }) 
    : posts;
        
  const handleLoadPosts = useCallback(async (page, postsPerPage) => { //função de callback, utilizando page e postsPerpage como parametro
    const postsAndPhotos = await loadPosts(); //importando função e executando ela
    
    setPosts(postsAndPhotos.slice(page, postsPerPage)); //setando o valor do array(posts) com as fotos fatiada em cada posts na pagina
    setAllPosts(postsAndPhotos); //setando o array(allPosts) com postAndPhotos
  }, []) //isso virou uma função de callback para passar as dependecias no useEffect

  useEffect(() => { //funcionar como componetsDidMont etc, dependendo como eu configurar o useEffect
    handleLoadPosts(0, postsPerPage); //criando dependencias para useEffect
  }, [handleLoadPosts, postsPerPage]); //tem que passar um função inicial e uma array vazio(array de dependecia o nome) as dependencias são handleLoadPosts que não pode ser sozinho que dar erro tem que coloca seus parametros juntos page e postPerPage

  const loadMorePosts = () => { //função para carregar mais post na pagina
    const nextPage = page + postsPerPage; //começando page mais quantidade de postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage) //estapalhar de todos os posts(allposts), os posts iniciais(nextPage) mais os proximos post
    posts.push(...nextPosts); //espalhando os posts dentro do array nextPosts para ir adiconando post assim que chamar o metodo loadMorePosts
 
    setPosts(posts); //setando valor de posts para posts para ficar salvo na memoria
    setPage(nextPage); //setando o valor de page para nextPage que é quantidade de posts que irá aparecer na pagina
  }

  const handleChange = (e) => { //função criado para recuperar valores dentro do input 
    const { value } = e.target;
    setSearchValue(value); //setando o valor de searchValue para value o valor que será digitado no DOM
  }
  
  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && ( //operação de curto circuito para saber se tem algo diritado no searchValue, se tiver vira verdadeiro e imprimir codigo abaixo
          <h1>Seach value: {searchValue}</h1>          
          )}

        <TextInput 
          searchValue={searchValue} //setando valor para a props
          handleChange={handleChange} //setando valor para o props
        />
      </div>

      {filteredposts.length > 0 && ( //ocultando os filtro
        <Posts posts={filteredposts} />
      )}
      {filteredposts.length === 0 && (
        <p>Não existem posts =(</p>
      )}

      <div className="button-container">
        {!searchValue && ( //operação de curto circuito para saber se tem algo digitado dentro do searchValue se tiver vira verdadeiro e não irá aparecer o button o codigo abaixo
          <Button 
            text="Load more post"
            onClick={loadMorePosts} //utilizando a props onClick para recuperar o metodo LoadMorePosts
            disabled={noMorePosts}
          /> 
        )}
      </div>
    </section>
  );
} 

export default Home;