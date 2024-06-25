import React from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

import { Post } from "../components/Post";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    console.log('Fetching post with id:', id);
    axios
      .get(`http://localhost:4444/posts/${id}`)
      .then(res => {
        console.log('Response data:', res.data);
        setData(res.data);
        setLoading(false); 
      })
      .catch(err => {
        console.warn('Error fetching post:', err);
        alert("Error when receiving an article");
      });
  }, [id]);

  if (isLoading) {
    console.log('Post is loading...');
    return <Post isLoading={isLoading} isFullPost />;
  }

  if (!data) {
    console.log('No data found for post');
    return <p>Article not found</p>;
  }

  console.log('Rendering post:', data);

  return (
    <div className="container mx-auto mt-10 text-white" style={{ width: '60%' }}>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost>
          
        <ReactMarkdown>{data.text}</ReactMarkdown> 
      </Post>
    </div>
  );
};

export default FullPost;
