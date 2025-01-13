export interface Post {
  username: string;
  imageUrl: string;
  text: string;
  likes: string[];
  comments: Array<{ username: string; comment: string }>;
}
