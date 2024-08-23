import React, { useState, useEffect } from 'react'; 
import PropTypes from 'prop-types'; 
import styled, { ThemeProvider } from 'styled-components'; 
import { Head, Loader, Nav, Social, Email, Footer } from '@components'; 
import { GlobalStyle, theme } from '@styles';

// StyledContent is a styled-component that applies basic styling to the content wrapper.
// It ensures the content takes up the full height of the viewport.
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// Layout component is a wrapper around all pages, providing common structure, styles, and functionality.
const Layout = ({ children, location }) => {
  // Checks if the current page is the home page
  const isHome = location.pathname === '/';

  // State to manage the loading animation; initially true if on the home page
  const [isLoading, setIsLoading] = useState(isHome);

  // Function to set 'target="_blank"' and 'rel="noopener noreferrer"' on all external links for security.
  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        // If the link's host is different from the current site, treat it as an external link
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  // useEffect hook runs after the component mounts or updates
  useEffect(() => {
    if (isLoading) {
      // Skip the effect if the loading state is true
      return;
    }

    if (location.hash) {
      // Handles scrolling to elements if there's a hash in the URL (e.g., #section1)
      const id = location.hash.substring(1); // Get the hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView(); // Scrolls to the element with the corresponding ID
          el.focus(); // Focuses the element for accessibility
        }
      }, 0);
    }

    // Ensures external links are handled properly
    handleExternalLinks();
  }, [isLoading]); // Dependencies array: runs whenever `isLoading` changes

  return (
    <>
      {/* Head component manages the SEO metadata for the page */}
      <Head />

      <div id="root">
        {/* ThemeProvider supplies the theme to styled-components within the Layout */}
        <ThemeProvider theme={theme}>
          {/* GlobalStyle applies global CSS styles across the entire application */}
          <GlobalStyle />

          {/* Skip to Content link improves accessibility by allowing users to bypass navigation */}
          <a className="skip-to-content" href="#content">
            Skip to Content
          </a>

          {/* Conditionally render the Loader if still loading, otherwise render the content */}
          {isLoading && isHome ? (
            <Loader finishLoading={() => setIsLoading(false)} />
          ) : (
            <StyledContent>
              {/* Navigation bar */}
              <Nav isHome={isHome} />
              {/* Social media icons/links */}
              <Social isHome={isHome} />
              {/* Email contact link */}
              <Email isHome={isHome} />

              {/* Main content area */}
              <div id="content">
                {children} {/* Renders the content passed as children to the Layout */}
                <Footer /> {/* Footer of the page */}
              </div>
            </StyledContent>
          )}
        </ThemeProvider>
      </div>
    </>
  );
};

// PropTypes to enforce correct types for the props passed to Layout
Layout.propTypes = {
  children: PropTypes.node.isRequired, // Ensures 'children' is provided and is a valid React node
  location: PropTypes.object.isRequired, // Ensures 'location' is provided and is an object
};

export default Layout;
