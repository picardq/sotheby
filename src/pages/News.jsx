import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

const News = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedTag, setSelectedTag] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchPosts({ 
          sortBy: tabValue === 0 ? 'createdAt' : 'viewsCount',
          sortOrder: 'desc',
          tag: selectedTag,
        }));
        await dispatch(fetchTags());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch, tabValue, selectedTag]);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSelectedTag(null);  // Скидання вибраного тегу при зміні вкладки
  };

  return (
    <div className="container mx-auto mt-10 text-white" style={{ width: '70%' }}>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="Основні вкладки" className="mb-6">
        <Tab label="New" style={{ color: '#fff' }} />
        <Tab label="Popular" style={{ color: '#fff' }} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8} md={9} className="mb-4">
          {(isPostsLoading ? [...Array(3)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={obj._id}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.commentsCount}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            ))}
        </Grid>
        <Grid item xs={12} sm={4} md={3} className="mb-4">
          <TagsBlock items={tags.items} isLoading={isTagsLoading} onTagClick={handleTagClick} style={{ width: '100%' }} />
        </Grid>
      </Grid>
    </div>
  );
};

export default News;
