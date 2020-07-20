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
        ecommerce consultant + agency owner at <a href="https://ecomloop.com">ecomloop</a>.<br/>cynical optimist regarding incremental technology advances. <br/>📚 🎿 🚲 🎾 ⚾ ⛰ 📝
      </p>
    </div>
  );
};

export default Author;
