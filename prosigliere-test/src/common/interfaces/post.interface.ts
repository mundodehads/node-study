import { Comment } from './comment.interface';

export interface Post {
  id?: string;
  title: string;
  content?: string;
  commentCount?: string;
  comments?: Comment[];
}
