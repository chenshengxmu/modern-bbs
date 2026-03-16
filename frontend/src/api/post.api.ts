import api from './axios';
import type { Post, Comment } from '../types';

export interface PostsResponse {
  posts: Post[];
  totalPages: number;
  currentPage: number;
}

export const fetchPosts = async (params: { boardId?: string, page?: number, search?: string }): Promise<PostsResponse> => {
  const { data } = await api.get('/posts', { params });
  return data;
};

export const fetchPostById = async (id: string): Promise<Post> => {
  const { data } = await api.get(`/posts/${id}`);
  return data;
};

export const createPost = async (postData: { title: string; content: string; boardId: string }): Promise<Post> => {
  const { data } = await api.post('/posts', postData);
  return data;
};

export const toggleLikePost = async (postId: string): Promise<{ liked: boolean }> => {
  const { data } = await api.post(`/posts/${postId}/like`);
  return data;
};

export const addComment = async (postId: string, content: string): Promise<Comment> => {
  const { data } = await api.post(`/posts/${postId}/comments`, { content });
  return data;
};

export const uploadImage = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};
