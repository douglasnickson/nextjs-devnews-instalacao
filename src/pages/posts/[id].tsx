import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface IComment {
  id: string;
  body: string;
}

interface ICommentsProps {
  comments: IComment[];
}

export default function Post({ comments }: ICommentsProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Post {router.query.id}</h1>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const response = await fetch('http://localhost:3333/posts');
  // const posts = await response.json();

  // const paths = posts.map(post => {
  //   return {
  //     params: { id: String(post.id) },
  //   };
  // });

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ICommentsProps> = async context => {
  const { id } = context.params;
  const response = await fetch(`http://localhost:3333/comments?postId=${id}`);
  const comments = await response.json();

  return {
    props: {
      comments,
    },
    revalidate: 5,
  };
};
