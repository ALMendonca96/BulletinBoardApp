import { useSelector } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError } from "./postsSlice";

import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  //retrieving all posts that are in our state
  const posts = useSelector(selectAllPosts);

  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let content = "";
  if (postStatus === "loading") content = <p>"Loading..."</p>;
  else if (postStatus === "failed") content = <p> {error}</p>;
  else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  }

  return <section>{content}</section>;
};

export default PostsList;
