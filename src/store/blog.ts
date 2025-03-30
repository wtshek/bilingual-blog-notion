import { create } from 'zustand'
import { BlogPost } from '@/types/blog'

interface BlogStore {
  posts: BlogPost[]
  post: BlogPost
  setPosts: (posts: BlogPost[]) => void
  getPostById: (id: string) => BlogPost | undefined
  setSelectedPost: (post: BlogPost) => void
}

export const useBlogStore = create<BlogStore>((set, get) => ({
  posts: [],
  post: {} as BlogPost,
  setPosts: (posts) => set({ posts }),
  getPostById: (id) => get().posts.find(post => post.id === id),
  setSelectedPost: (post: BlogPost) => set({post})
})) 