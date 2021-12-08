import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import styles from '../styles/home.module.scss';
interface IPost {
  id: string;
  title: string;
}

interface IHomeProps {
  posts: IPost[];
}

export default function Home({ posts }: IHomeProps) {
  // const [posts, setPosts] = useState<IPost[]>([]);

  // useEffect(() => {
  //   fetch('http://localhost:3333/posts')
  //     .then(response => response.json())
  //     .then(data => setPosts(data));
  // }, []);

  return (
    <div>
      <SEO title="Home" />
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const response = await fetch('http://localhost:3333/posts');
  const posts = await response.json();

  return {
    props: {
      posts,
    },
  };
};
