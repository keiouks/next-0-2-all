import Head from 'next/head';
import Date from '../components/date';
import { getSortedPostsData, getPostData } from '../lib/posts';
import styles from '../styles/Post.module.scss';
import 'highlight.js/styles/github-dark.min.css';

export default function Post({ postData }) {
  return (
    <>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <div className={styles.article}>
          <h1>{postData.title}</h1>
          <div>
              <Date dateString={postData.date} />
          </div>
          <div class='body' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getSortedPostsData().map(({id}) => ({params: {id}}));
  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const id = params.id || [];
  if (id.length !== 2 && id[1] !== 'post') {
    return {
      props: {
        error: 'not found',
      }
    };
  }
  getSortedPostsData();
  const postData = await getPostData(params.id[0]);
  return {
    props: {
      postData,
    },
    revalidate: 3600
  }
}
