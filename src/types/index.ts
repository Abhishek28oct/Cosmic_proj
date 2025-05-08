export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  summary: string;
  author: {
    _id: string;
    username: string;
    avatar: string;
  };
  tags: string[];
  coverImage: string;
  likes: string[];
  comments: Comment[];
  readTime: number;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  user: {
    _id: string;
    username: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
} 