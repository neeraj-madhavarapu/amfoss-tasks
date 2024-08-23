import React from 'react'; // Importing React library to use JSX and React components.
import PropTypes from 'prop-types'; // Importing PropTypes for type-checking component props.
import styled from 'styled-components'; // Importing styled-components for writing CSS-in-JS.
import { email } from '@config'; // Importing the email address from a configuration file.
import { Side } from '@components'; // Importing the Side component to handle positioning and transitions.

const StyledLinkWrapper = styled.div`
  display: flex; // Using Flexbox to align child elements.
  flex-direction: column; // Aligning child elements in a column.
  align-items: center; // Centering child elements horizontally.

  position: relative; // Positioning relative to its normal position.

  &:after {
    content: ''; // Adding an empty content for a pseudo-element.
    display: block; // Displaying the pseudo-element as a block.
    width: 1px; // Setting the width of the pseudo-element.
    height: 90px; // Setting the height of the pseudo-element.
    margin: 0 auto; // Centering the pseudo-element horizontally.
    background-color: var(--light-slate); // Setting the background color of the pseudo-element.
  }

  a {
    margin: 20px auto; // Adding vertical margin and centering the link horizontally.
    padding: 10px; // Adding padding inside the link.
    font-family: var(--font-mono); // Using a monospace font for the link.
    font-size: var(--fz-xxs); // Setting the font size of the link.
    line-height: var(--fz-lg); // Setting the line height of the link.
    letter-spacing: 0.1em; // Adding spacing between letters in the link.
    writing-mode: vertical-rl; // Setting the text to be written vertically from right to left.

    &:hover,
    &:focus {
      transform: translateY(-3px); // Applying a slight upward translation effect on hover or focus.
    }
  }
`;

const Email = ({ isHome }) => (
  // The Email component renders an email link inside the Side component.
  <Side isHome={isHome} orientation="right">
    <StyledLinkWrapper>
      {/* Wrapping the email link with StyledLinkWrapper */}
      <a href={`mailto:${email}`}>{email}</a>
    </StyledLinkWrapper>
  </Side>
);

Email.propTypes = {
  isHome: PropTypes.bool, // Defining the expected type of the isHome prop.
};

export default Email; // Exporting the Email component for use in other parts of the application.
