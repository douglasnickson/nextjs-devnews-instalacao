import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';

import SEO from '../../components/SEO';

import styles from './post.module.scss';

interface IComment {
  id: string;
  body: string;
}

interface IPost {
  post: {
    slug: string;
    title: string;
    content: string;
    updateAt: string;
  };
}

interface ICommentsProps {
  comments: IComment[];
}

export default function Post({ post }: IPost) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SEO title="Posts" />
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updateAt}</time>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
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

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;
  const prismic = getPrismicClient();

  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updateAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      },
    ),
  };

  return {
    props: { post },
    revalidate: 60 * 60 * 12,
  };
};
