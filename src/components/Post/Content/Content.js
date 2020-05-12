// @flow strict
import React from 'react';
import styles from './Content.module.scss';

type Props = {
  body: string,
  title: string,
  featuredImage: string,
  socialImage: string
};

const Content = ({ body, title, featuredImage }: Props) => (
  <div className={styles['content']}>

    {featuredImage &&
        <div className={styles['content__body']}><p><img src={featuredImage} alt={title} /></p></div>
    }
    <h1 className={styles['content__title']}>{title}</h1>
    <div className={styles['content__body']} dangerouslySetInnerHTML={{ __html: body }} />

  </div>
);

export default Content;
