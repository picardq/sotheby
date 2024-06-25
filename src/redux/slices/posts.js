import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({ sortBy, sortOrder, tag }) => {
  try {
    const tagQuery = tag ? `&tag=${tag}` : '';
    const { data } = await axios.get(`/posts?sortBy=${sortBy}&sortOrder=${sortOrder}${tagQuery}`);
    return data;
  } catch (error) {
    throw Error(error.message);
  }
});

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  'posts/fetchRemovePost',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:4444/posts/${id}`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  posts: {
    items: [],
    status: 'loading',
    sortBy: 'createdAt', 
    sortOrder: 'desc'
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.items = [];
        state.posts.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = 'loaded';
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = 'error';
      })
      .addCase(fetchTags.pending, (state) => {
        state.tags.items = [];
        state.tags.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = 'loaded';
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.items = [];
        state.tags.status = 'error';
      })
      .addCase(fetchRemovePost.pending, (state, action) => {
        
      })
      .addCase(fetchRemovePost.fulfilled, (state, action) => {
        state.posts.items = state.posts.items.filter((post) => post._id !== action.meta.arg);
      })
      .addCase(fetchRemovePost.rejected, (state, action) => {
        console.error('Failed to delete post:', action.error);
      });
  },
});

export const postsReducer = postsSlice.reducer;
