import { GetStaticProps } from 'next';
import Link from 'next/link';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';
import SEO from '../../components/SEO';

import styles from './posts.module.scss';
interface IPost {
  slug: string;
  title: string;
  excerpt: string;
  updateAt: string;
}

interface IPostsProps {
  posts: IPost[];
}

export default function Posts({ posts }: IPostsProps) {
  return (
    <>
      <SEO title="Posts" />
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updateAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.getAllByType('post');

  const posts = response.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find(content => content.type === 'paragraph')?.text ??
        '',
      updateAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        },
      ),
    };
  });

  console.log(posts);

  return {
    props: { posts },
    revalidate: 60 * 60 * 12,
  };
};
