import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

// Head component is responsible for managing the metadata of the document head,
// like the title, description, and Open Graph/Twitter meta tags.
// This is crucial for SEO and social media previews.

const Head = ({ title, description, image }) => {
  // useLocation is a hook that provides access to the current URL path.
  const { pathname } = useLocation();

  // useStaticQuery is a Gatsby-specific hook for making GraphQL queries
  // inside components. This query fetches site metadata defined in gatsby-config.js.
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title            // Default title of the website
            defaultDescription: description // Default description of the website
            siteUrl                         // Base URL of the website
            defaultImage: image             // Default image used for social sharing
            twitterUsername                 // Twitter handle associated with the website
          }
        }
      }
    `,
  );

  // Destructure the fetched metadata to use in the component
  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata;

  // Create the SEO object that will hold the metadata for the page.
  // If specific props (title, description, image) are provided, use them;
  // otherwise, fall back to the defaults.
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`, // Full URL for the image
    url: `${siteUrl}${pathname}`,                // Full URL for the current page
  };

  // Helmet manages the document head and allows us to set the title and meta tags
  return (
    <Helmet title={title} defaultTitle={seo.title} titleTemplate={`%s | ${defaultTitle}`}>
      <html lang="en" /> {/* Sets the language attribute for the HTML document */}

      {/* Basic SEO meta tags */}
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {/* Open Graph tags for social media sharing (used by Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />

      {/* Twitter card tags for Twitter sharing */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Google site verification tag (used to verify site ownership with Google Search Console) */}
      <meta name="google-site-verification" content="DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk" />
    </Helmet>
  );
};

// Export the Head component to be used in other parts of the application.
export default Head;

// PropTypes are used to type-check the props passed to the Head component.
// It ensures that title, description, and image are strings.
Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

// Default props ensure that if no props are provided, they default to null.
Head.defaultProps = {
  title: null,
  description: null,
  image: null,
};
