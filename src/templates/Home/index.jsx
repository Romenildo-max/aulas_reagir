import { useEffect, useState, useCallback } from "react";

import './styles.css';

import { Posts } from "../../components/Posts/index";
import { loadPosts } from '../../utils/load-post';
import { Button } from "../../components/Button";
import { TextInput } from "../../components/textInput";

export const Home = () => {  
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(3); 
  const [searchValue, setSearchValue] = useState('');
  
  
  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredposts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes( 
        searchValue.toLowerCase() 
      );
    }) 
    : posts;
        
  const handleLoadPosts = useCallback(async (page, postsPerPage) => { 
    const postsAndPhotos = await loadPosts(); 
    
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos); 
  }, [])

  useEffect(() => { 
    handleLoadPosts(0, postsPerPage); 
  }, [handleLoadPosts, postsPerPage]); 

  const loadMorePosts = () => { 
    const nextPage = page + postsPerPage; 
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage) 
    posts.push(...nextPosts); 
 
    setPosts(posts); 
    setPage(nextPage); 
  }

  const handleChange = (e) => { 
    const { value } = e.target;
    setSearchValue(value); 
  }
  
  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && ( 
          <h1>Seach value: {searchValue}</h1>          
          )}

        <TextInput 
          searchValue={searchValue} 
          handleChange={handleChange} 
        />
      </div>

      {filteredposts.length > 0 && ( 
        <Posts posts={filteredposts} />
      )}
      {filteredposts.length === 0 && (
        <p>Não existem posts =(</p>
      )}

      <div className="button-container">
        {!searchValue && (
          <Button 
            text="Load more post"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          /> 
        )}
      </div>
    </section>
  );
} 

export default Home;