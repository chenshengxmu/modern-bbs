import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { fetchBoards, fetchPosts, createPost } from '../api';

export const usePosts = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedBoardId, setSelectedBoardId] = useState<string | undefined>(undefined);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postData, setPostData] = useState({ title: '', content: '', boardId: '' });

  const { data: boards } = useQuery({ queryKey: ['boards'], queryFn: fetchBoards });
  
  const { data: postsData, isLoading: postsLoading } = useQuery({ 
    queryKey: ['posts', { boardId: selectedBoardId, page, search }], 
    queryFn: () => fetchPosts({ boardId: selectedBoardId, page, search }) 
  });

  const postMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setShowCreatePost(false);
      setPostData({ title: '', content: '', boardId: '' });
      toast.success('Post created! +5 points');
    },
    onError: () => toast.error('Failed to create post')
  });

  return {
    page, setPage,
    search, setSearch,
    selectedBoardId, setSelectedBoardId,
    showCreatePost, setShowCreatePost,
    postData, setPostData,
    boards,
    posts: postsData?.posts,
    postsLoading,
    postMutation
  };
};
