import { atom } from "jotai";
import type { Post } from "../features/collaboration_feed/types/post_types";

export const feedAtom = atom<Post[]>([]);