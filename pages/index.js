import { useState } from 'react';
import styles from '../styles/Home.module.scss';
import { getSortedPostsData } from '../lib/posts';
import { MoreIcon } from '../components/more-icon.js';
import classnames from 'classnames';


export default function Home({allPostsData}) {
  const [showNav, setShowNav] = useState(true);
  const [src, setSrc] = useState('/' + allPostsData[0].id.join('/'));

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
          <ul className='list' style={{padding: 0}}>
              {allPostsData.map(({ id, title }) => {
                return (<li className='item' onClick={() => setSrc(`/${id.join('/')}`)}>{title}</li>);
              })}
          </ul>
        </div>
      </div>

      <div className={classnames({
        [styles.container]: true,
        [styles['show-nav']]: showNav,
      })}>
        <iframe src={src} class='post-page' />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData(true);
  return {
    props: {
      allPostsData,
    },
    revalidate: 3600
  };
}
