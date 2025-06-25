import { atom } from "jotai";
import type { Post } from "../features/collaboration_feed/types/post_types";

export const feedAtom = atom<Post[]>([
  {
    _id: "1",
    userId: {
      _id: "2",
      name: "Prof. Smith",
      avatar: "/images/avatar-placeholder.svg",
    },
    content: "CS101 syllabus is out!",
    media: [],
    likes: [],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
]);
