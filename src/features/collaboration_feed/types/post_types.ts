export interface PostReq {
  content: string;
  media: { url: string; type: string }[];
}

export interface Post {
  _id: string; // MongoDB ObjectId
  userId: {
    _id: string; // Changed from any to string
    name: string;
    avatar?: string;
  };
  content: string;
  media: { url: string; type: "image" | "video" }[];
  likes: string[];
  createdAt: string;
  updatedAt?: string;
}