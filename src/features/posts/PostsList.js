import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import { useEffect } from "react";

import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();

  //retrieving all posts that are in our state
  const posts = useSelector(selectAllPosts);

  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  //if the status is idle, we're dispatching the async fetchPosts thunk
  useEffect(() => {
    if (postStatus === "idle") dispatch(fetchPosts());
  }, [postStatus, dispatch]);

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

    console.log(posts);
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
