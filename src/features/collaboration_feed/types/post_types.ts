/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PostReq {
  content: string;
  media: { url: string; type: string }[];
}
export interface Post {
  _id: string ; // MongoDB ObjectId
  userId: {
    _id: any; id: string; name: string; avatar?: string 
}; // Populated user
  content: string;
  media: { url: string; type: "image" | "video" }[];
  likes: string[];
  createdAt: string;
}
