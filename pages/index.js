import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.scss';
import { getSortedPostsData } from '../lib/posts';
import { MoreIcon } from '../components/more-icon.js';
import classnames from 'classnames';

export default function Home({allPostsData}) {
  const [showNav, setShowNav] = useState(true);
  const [id, setId] = useState(allPostsData[0]?.id[0]);

  const MoreAction = () => {
    setShowNav(!showNav);
  }

  const handleLinkChange = (postId) => {
    setId(postId);
  }
  useEffect(() => {
    const url = new URL(location);
    let post = url.searchParams.get('post');
    if (post && post !== id) {
      setId(post);
    }
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }
    const url = new URL(location);
    url.searchParams.set('post', id);
    history.replaceState({}, '', url);
  }, [id]);
  return (
    <>
      <div className={classnames({
        [styles.nav]: true,
        [styles.hidden]: !showNav,
      })}>
        <div className='more-icon' onClick={MoreAction}><MoreIcon /></div>
        <div className='nav-inner'>
          <ul className='list' style={{padding: 0}}>
              {allPostsData.map(({ id: tempId, title }) => {
                const postId = tempId[0];
                return (<li className={classnames({
                  item: true,
                  active: id === postId,
                })} onClick={() => handleLinkChange(postId)}>{title}</li>);
              })}
          </ul>
        </div>
      </div>

      <div className={classnames({
        [styles.container]: true,
        [styles['show-nav']]: showNav,
      })}>
        <iframe src={`/${id}/post`} class='post-page' />
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
