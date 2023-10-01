//posts entre as {} é a props
import './styles.css';

import { PostCard } from "../PostaCard"

export const Posts = ({ posts }) => (
    <div className="posts">
        {posts.map(post => (
            <PostCard
                key={post.id}  
                title={post.title}
                body={post.body}
                id={post.id}
                cover={post.cover} 
            /> 
        ))} 
    </div>
)