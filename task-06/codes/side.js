import React, { useState, useEffect } from 'react'; // Import React and hooks
import PropTypes from 'prop-types'; // Import PropTypes for type checking
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Import components for animations
import styled from 'styled-components'; // Import styled-components for styling
import { loaderDelay } from '@utils'; // Import a delay value (assumed to be defined elsewhere)
import { usePrefersReducedMotion } from '@hooks'; // Import a custom hook for reduced motion preference

// Styled component for the side element
const StyledSideElement = styled.div`
  width: 40px; // Fixed width for the side element
  position: fixed; // Fixed positioning relative to the viewport
  bottom: 0; // Position it at the bottom of the viewport
  left: ${props => (props.orientation === 'left' ? '40px' : 'auto')}; // Conditional positioning based on orientation prop
  right: ${props => (props.orientation === 'left' ? 'auto' : '40px')}; // Conditional positioning based on orientation prop
  z-index: 10; // Ensure it is above other elements
  color: var(--light-slate); // Set text color (assuming a CSS variable is defined)

  // Media query for screens less than or equal to 1080px
  @media (max-width: 1080px) {
    left: ${props => (props.orientation === 'left' ? '20px' : 'auto')}; // Adjust left position for smaller screens
    right: ${props => (props.orientation === 'left' ? 'auto' : '20px')}; // Adjust right position for smaller screens
  }

  // Media query for screens less than or equal to 768px
  @media (max-width: 768px) {
    display: none; // Hide the element on small screens
  }
`;

// Side component definition
const Side = ({ children, isHome, orientation }) => {
  const [isMounted, setIsMounted] = useState(!isHome); // State to manage whether the component is mounted
  const prefersReducedMotion = usePrefersReducedMotion(); // Hook to check if the user prefers reduced motion

  useEffect(() => {
    // If on home page and prefers reduced motion is false
    if (!isHome || prefersReducedMotion) {
      return; // Do nothing if either condition is true
    }
    // Set a timeout to manage mounting animation
    const timeout = setTimeout(() => setIsMounted(true), loaderDelay);
    return () => clearTimeout(timeout); // Clean up the timeout on unmount
  }, [isHome, prefersReducedMotion]); // Dependencies array for the useEffect hook

  return (
    <StyledSideElement orientation={orientation}>
      {prefersReducedMotion ? (
        <>{children}</> // Render children immediately if reduced motion is preferred
      ) : (
        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames={isHome ? 'fade' : ''} timeout={isHome ? loaderDelay : 0}>
              {children} // Apply transition classes to children if not reduced motion
            </CSSTransition>
          )}
        </TransitionGroup>
      )}
    </StyledSideElement>
  );
};

// Define prop types for the Side component
Side.propTypes = {
  children: PropTypes.node.isRequired, // Children must be a React node
  isHome: PropTypes.bool, // Optional boolean to indicate if it's the home page
  orientation: PropTypes.string, // Optional string to determine side orientation ('left' or 'right')
};

export default Side; // Export the Side component
