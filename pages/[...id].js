import utilStyles from '../styles/utils.module.css';
import Head from 'next/head';
import Layout from '../components/layout';
import Date from '../components/date';
import { getSortedPostsData, getPostData } from '../lib/posts';

export default function Post({ postData, allPostsData }) {
    return (
        <Layout postsData={allPostsData}>
            <Head>
                <title>{postData.title}</title>
            </Head>
              <article>
              <h1 className={utilStyles.headingXl}>{postData.title}</h1>
              <div className={utilStyles.lightText}>
                  <Date dateString={postData.date} />
              </div>
              <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </article>
        </Layout>
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
    const postData = await getPostData(params.id);
    const allPostsData = getSortedPostsData();
    return {
        props: {
            postData,
            allPostsData,
        },
        revalidate: 3600
    }
}
