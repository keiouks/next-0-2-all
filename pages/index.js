import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { useState } from 'react';
import styles from '../styles/Home.module.scss';
import { getSortedPostsData } from '../lib/posts';


export default function Home({allPostsData}) {
  const [showNav, setShowNav] = useState(true);
  // return (
  //   <Layout home postsData={allPostsData} >
  //     <Head>
  //       <title>{siteTitle}</title>
  //     </Head>
  //     <section className={utilStyles.headingMd}>
  //       <p>this is something good</p>
  //       <p>
  //         In this website - you can see the hold world
  //       </p>
  //     </section>
  //   </Layout>
  // );
  return (
    <>
      <div className={{
        [styles.nav]: true,
        [styles.hidden]: !showNav,
      }}>
        <div className='nav-inner'>
          <ol className='list'>
            <li className='item'></li>
          </ol>
        </div>
      </div>

      <div className={{
        [styles.container]: true,
        [styles['show-nav']]: showNav,
      }}></div>
    </>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
