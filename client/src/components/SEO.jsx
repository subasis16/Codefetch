import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, type = 'website' }) => {
  const siteTitle = title ? `${title} | CodeFetch` : 'CodeFetch - Precision for Developers';
  const siteDesc = description || 'The coding cheat-sheet and documentation platform. Stop context switching. Start shipping.';

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDesc} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDesc} />
      <meta name="twitter:creator" content="CodeFetch" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDesc} />
    </Helmet>
  );
};

export default SEO;
