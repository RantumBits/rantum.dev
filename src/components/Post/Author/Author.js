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
        Web developer and agency owner at <a href="https://ecomloop.com">ecomloop</a>.<br/> I enjoy using technology to make everyday life incrementally better.<br/>📚 🎿 🚲 🎾 ⚾ ⛰ 📝
      </p>
    </div>
  );
};

export default Author;
