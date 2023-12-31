import { useSelector } from "react-redux";
import { selectPostIds, useGetPostsQuery } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();

  const orderedPostsIds = useSelector(selectPostIds);

  let content = "";
  if (isLoading) content = <p>Loading...</p>;
  else if (isError) content = <p> {error}</p>;
  else if (isSuccess) {
    content = orderedPostsIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  }

  return <section>{content}</section>;
};

export default PostsList;
