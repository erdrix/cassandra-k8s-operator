/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Layout from '@theme/Layout';

import classnames from 'classnames';

import styles from './styles.module.css';

const features = [
  {
    title: <>Kubernetes Operator</>,
    imageUrl: 'img/operator-sdk.png',
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: <>Open-Source</>,
    imageUrl: 'img/open_source.svg',
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: <>Cassandra Cluster in K8S</>,
    imageUrl: 'img/kubernetes.png',
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
  {
    title: <>Space Scoped</>,
    imageUrl: 'img/namespace.png',
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
  {
    title: <>Operate Cassandra Cluster</>,
    imageUrl: 'img/cassandra.png',
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
  {
    title: <>Multi-Datacenter Deployment</>,
    imageUrl: 'img/dc.png',
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  }
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig: {customFields = {}} = {}} = context;

  return (
    <Layout permalink="/" description={customFields.description}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroProjectTagline}>
            <img
              alt="Casskop"
              className={styles.heroLogo}
              src={useBaseUrl('img/casskop_alone.png')}
            />
            Open-Source, Apache <span className={styles.heroProjectKeywords}>Cassandra</span>{' '} 
            operator for <span className={styles.heroProjectKeywords}>Kubernetes</span>{' '}
          </h1>
          <div className={styles.indexCtas}>
            <Link
              className={styles.indexCtasGetStartedButton}
              to={useBaseUrl('docs/overview')}>
              Get Started
            </Link>
            <span className={styles.indexCtasGitHubButtonWrapper}>
              <iframe
                className={styles.indexCtasGitHubButton}
                src="https://ghbtns.com/github-btn.html?user=Orange-OpenSource&amp;repo=casskop&amp;type=star&amp;count=true&amp;size=large"
                width={160}
                height={30}
                title="GitHub Stars"
              />
            </span>
          </div>
        </div>
      </div>
      <div className={classnames(styles.announcement, styles.announcementDark)}>
        <div className={styles.announcementInner}>
        The <span className={styles.heroProjectKeywords}>CassKop</span> Cassandra Kubernetes operator makes it <span className={styles.heroProjectKeywords}>easy</span> to run Apache Cassandra on Kubernetes. 
        Apache Cassandra is a popular, free, open-source, distributed wide column store, <span className={styles.heroProjectKeywords}>NoSQL database</span> management system. 
        The operator allows to <span className={styles.heroProjectKeywords}>easily create and manage racks and data centers</span> aware Cassandra clusters.
        </div>
      </div>
      <div className={styles.section}>
        {features && features.length && (
            <section className={styles.features}>
              <div className="container">
                <div className="row">
                  {features.map((props, idx) => (
                    <Feature key={idx} {...props} />
                  ))}
                </div>
              </div>
            </section>
          )}
      </div>
    </Layout>
  );
}

export default Home;
