import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import { useState } from 'react';
import styles from '../styles/Home.module.scss';
import { getSortedPostsData } from '../lib/posts';
import { MoreIcon } from '../components/more-icon.js';
import classnames from 'classnames';


export default function Home({allPostsData}) {
  const [showNav, setShowNav] = useState(true);

  const MoreAction = () => {
    setShowNav(!showNav);
  }
  return (
    <>
      <div className={classnames({
        [styles.nav]: true,
        [styles.hidden]: !showNav,
      })}>
        <div className='more-icon' onClick={MoreAction}><MoreIcon /></div>
        <div className='nav-inner'>
          <ol className='list'>
              {allPostsData.map(({ id, title }) => {
                return (<li className='item'><Link href={`/${id.join('/')}`}>{title}</Link></li>);
              })}
          </ol>
        </div>
      </div>

      <div className={classnames({
        [styles.container]: true,
        [styles['show-nav']]: showNav,
      })}></div>
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
