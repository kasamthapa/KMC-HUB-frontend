import { useAtom } from "jotai";
import { authAtom } from "../../../jotai/auth";
import PostForm from "../components/PostForm";

function CollaborationFeed() {
  const authenticated = useAtom(authAtom);
  return <div>{authenticated ? <PostForm /> : <p>Please Login First</p>}</div>;
}

export default CollaborationFeed;
