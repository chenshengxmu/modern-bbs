export const DUMMY = true;

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  points: number;
  level: number;
  createdAt: string;
}

export interface Board {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  order: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  author: Partial<User>;
  board: Partial<Board>;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  likeCount: number;
  createdAt: string;
  author: Partial<User>;
}
