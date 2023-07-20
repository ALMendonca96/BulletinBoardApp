import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectAllPosts } from "./postsSlice";

const PostsList = () => {
  //retrieving all posts that are in our state
  const posts = useSelector(selectAllPosts);

  //mapping the posts, creating a article for each post
  const renderedPosts = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
