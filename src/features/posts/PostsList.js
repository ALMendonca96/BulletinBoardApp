import { useSelector } from "react-redux";
import { selectPostIds, getPostsStatus, getPostsError } from "./postsSlice";

import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  //retrieving all posts that are in our state

  const orderedPostsIds = useSelector(selectPostIds);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let content = "";
  if (postStatus === "loading") content = <p>"Loading..."</p>;
  else if (postStatus === "failed") content = <p> {error}</p>;
  else if (postStatus === "succeeded") {
    content = orderedPostsIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  }

  return <section>{content}</section>;
};

export default PostsList;
