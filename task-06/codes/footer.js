import React, { useState, useEffect } from 'react';  // Import React and hooks
import PropTypes from 'prop-types';  // Import PropTypes for prop validation
import styled from 'styled-components';  // Import styled-components for styling
import { Icon } from '@components/icons';  // Import Icon component for rendering icons
import { socialMedia } from '@config';  // Import social media links from config

// StyledFooter component for styling the footer section
const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};  // Center content using theme mixins
  flex-direction: column;  // Arrange children in a column
  height: auto;  // Allow height to adjust based on content
  min-height: 70px;  // Set a minimum height for the footer
  padding: 15px;  // Add padding around the footer content
  text-align: center;  // Center-align text within the footer
`;

// StyledSocialLinks component for styling social media links
const StyledSocialLinks = styled.div`
  display: none;  // Hide by default

  @media (max-width: 768px) {
    display: block;  // Show on mobile devices
    width: 100%;  // Make social links container full width
    max-width: 270px;  // Set a maximum width
    margin: 0 auto 10px;  // Center horizontally and add bottom margin
    color: var(--light-slate);  // Set text color
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};  // Distribute items evenly using theme mixins
    padding: 0;  // Remove padding
    margin: 0;  // Remove margin
    list-style: none;  // Remove list styling
  }

  a {
    padding: 10px;  // Add padding around the links
    svg {
      width: 20px;  // Set width of icons
      height: 20px;  // Set height of icons
    }
  }
`;

// StyledCredit component for styling footer credits
const StyledCredit = styled.div`
  color: var(--light-slate);  // Set text color
  font-family: var(--font-mono);  // Use monospace font
  font-size: var(--fz-xxs);  // Set font size
  line-height: 1;  // Set line height to 1

  a {
    padding: 10px;  // Add padding around the link
  }

  .github-stats {
    margin-top: 10px;  // Add top margin

    & > span {
      display: inline-flex;  // Align items inline with flexbox
      align-items: center;  // Center items vertically
      margin: 0 7px;  // Add horizontal margin between stats
    }
    svg {
      display: inline-block;  // Display icons inline
      margin-right: 5px;  // Add margin to the right of icons
      width: 14px;  // Set width of icons
      height: 14px;  // Set height of icons
    }
  }
`;

const Footer = () => {
  // State to hold GitHub repository information
  const [githubInfo, setGitHubInfo] = useState({
    stars: null,
    forks: null,
  });

  // Effect to fetch GitHub repository info on mount
  useEffect(() => {
    // Only fetch data if in production environment
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    fetch('https://api.github.com/repos/bchiang7/v4')  // Fetch repository info from GitHub API
      .then(response => response.json())  // Parse response as JSON
      .then(json => {
        const { stargazers_count, forks_count } = json;  // Extract star and fork counts
        setGitHubInfo({
          stars: stargazers_count,  // Update state with star count
          forks: forks_count,  // Update state with fork count
        });
      })
      .catch(e => console.error(e));  // Handle errors
  }, []);  // Empty dependency array means effect runs once on mount

  return (
    <StyledFooter>
      {/* Social media links section */}
      <StyledSocialLinks>
        <ul>
          {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name}>
                  <Icon name={name} />  {/* Render icon for each social media link */}
                </a>
              </li>
            ))}
        </ul>
      </StyledSocialLinks>

      {/* Credit section */}
      <StyledCredit tabIndex="-1">  {/* Set tabIndex to -1 to make it non-focusable */}
        <a href="https://github.com/bchiang7/v4">
          <div>Designed &amp; Built by Brittany Chiang</div>

          {githubInfo.stars && githubInfo.forks && (
            <div className="github-stats">
              <span>
                <Icon name="Star" />
                <span>{githubInfo.stars.toLocaleString()}</span>  {/* Display star count */}
              </span>
              <span>
                <Icon name="Fork" />
                <span>{githubInfo.forks.toLocaleString()}</span>  {/* Display fork count */}
              </span>
            </div>
          )}
        </a>
      </StyledCredit>
    </StyledFooter>
  );
};

// Define prop types for the Footer component
Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;  // Export the Footer component
