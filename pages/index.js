import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>this is something good</p>
        <p>
          In this website - you can see the hold world
        </p>
        <p>
          <Link href='/posts/first-post'>go to the other page</Link>
        </p>
      </section>
    </Layout>
  );
}
