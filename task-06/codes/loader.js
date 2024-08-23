import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';
import { IconLoader } from '@components/icons'; // Importing the loader icon component

// StyledLoader is a styled-component that defines the styles for the loader overlay.
const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter}; // Centers the loader both horizontally and vertically
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy); // Background color for the loader screen
  z-index: 99; // Ensures the loader appears on top of all other content

  .logo-wrapper {
    width: max-content;
    max-width: 100px;
    transition: var(--transition); // Applies a smooth transition
    opacity: ${props => (props.isMounted ? 1 : 0)}; // Fades in the logo if the component is mounted

    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none; // No fill for the SVG by default
      user-select: none; // Disables text selection for the SVG

      #B {
        opacity: 0; // Initially hides the element with the ID 'B'
      }
    }
  }
`;

// Loader component handles the loading animation before displaying the main content.
const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false); // Tracks whether the component is mounted

  // Function to define and trigger the animations using anime.js
  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(), // Calls finishLoading after the animation completes
    });

    loader
      .add({
        targets: '#logo path', // Targets the paths in the SVG logo for the initial animation
        delay: 300,
        duration: 1500,
        easing: 'easeInOutQuart', // Smooth animation easing
        strokeDashoffset: [anime.setDashoffset, 0], // Draws the SVG paths
      })
      .add({
        targets: '#logo #B', // Targets the element with ID 'B' in the SVG logo
        duration: 700,
        easing: 'easeInOutQuart', // Smooth animation easing
        opacity: 1, // Fades in the 'B' element
      })
      .add({
        targets: '#logo', // Targets the entire SVG logo
        delay: 500,
        duration: 300,
        easing: 'easeInOutQuart', // Smooth animation easing
        opacity: 0, // Fades out the logo
        scale: 0.1, // Shrinks the logo
      })
      .add({
        targets: '.loader', // Targets the loader container
        duration: 200,
        easing: 'easeInOutQuart', // Smooth animation easing
        opacity: 0, // Fades out the loader container
        zIndex: -1, // Moves the loader behind other content
      });
  };

  // useEffect hook to handle component mounting and trigger the animation
  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10); // Small delay before setting the component as mounted
    animate(); // Triggers the animation when the component mounts
    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, []);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} /> {/* Hides the body content while the loader is active */}

      <div className="logo-wrapper">
        <IconLoader /> {/* Displays the logo/icon as the loader */}
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired, // Ensures finishLoading function is passed as a prop
};

export default Loader;
