// @flow strict
import React from 'react';
import { getContactHref } from '../../../utils';
import styles from './Author.module.scss';
import { useSiteMetadata } from '../../../hooks';

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles['author']}>
      <p className={styles['author__bio']}>
        <strong>andrew maury</strong><br/>
        ecommerce consultant <a href="https://ecomloop.com">@ecomloop</a>.<br/>cynical optimist in technology advances.<br/>nantucketer on a rantum scoot.<br/>📚 🎿 🚲 🎾 ⚾ ⛰ 📝
      </p>
    </div>
  );
};

export default Author;
