import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { socialMedia } from '@config'; // Import social media data from the config
import { Side } from '@components'; // Import the Side component for positioning
import { Icon } from '@components/icons'; // Import the Icon component for rendering social media icons

// Styled component for the social media list
const StyledSocialList = styled.ul`
  display: flex; // Use flexbox layout
  flex-direction: column; // Stack items vertically
  align-items: center; // Center items horizontally
  margin: 0; // Remove default margin
  padding: 0; // Remove default padding
  list-style: none; // Remove default list styling (bullets/numbers)

  &:after {
    content: ''; // Create a pseudo-element for a vertical line
    display: block; // Make the pseudo-element a block element
    width: 1px; // Set width of the line
    height: 90px; // Set height of the line
    margin: 0 auto; // Center the line horizontally
    background-color: var(--light-slate); // Set color of the line
  }

  li {
    &:last-of-type {
      margin-bottom: 20px; // Add margin to the bottom of the last list item
    }

    a {
      padding: 10px; // Add padding around the link

      &:hover,
      &:focus {
        transform: translateY(-3px); // Move the link up by 3px on hover or focus
      }

      svg {
        width: 20px; // Set width of the icon
        height: 20px; // Set height of the icon
      }
    }
  }
`;

// Social component
const Social = ({ isHome }) => (
  // Use the Side component to position the social media icons
  <Side isHome={isHome} orientation="left">
    <StyledSocialList>
      {socialMedia && // Check if socialMedia data exists
        socialMedia.map(({ url, name }, i) => (
          // Map through social media data and render each item
          <li key={i}>
            <a href={url} aria-label={name} target="_blank" rel="noreferrer">
              {/* Use the Icon component to render the icon */}
              <Icon name={name} />
            </a>
          </li>
        ))}
    </StyledSocialList>
  </Side>
);

Social.propTypes = {
  isHome: PropTypes.bool, // Define the type of the isHome prop
};

export default Social; // Export the Social component
