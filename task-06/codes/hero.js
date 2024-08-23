import React, { useState, useEffect } from 'react'; // Import React and hooks from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Import animation components for transition effects
import styled from 'styled-components'; // Import styled-components for CSS-in-JS styling
import { navDelay, loaderDelay } from '@utils'; // Import delays for transitions from utility functions
import { usePrefersReducedMotion } from '@hooks'; // Import custom hook to check user preference for reduced motion

// Styled component for the hero section
const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter}; // Apply mixin for centering content from the theme
  flex-direction: column; // Stack items vertically
  align-items: flex-start; // Align items to the start of the container
  min-height: 100vh; // Minimum height of the section is 100% of the viewport height
  height: 100vh; // Set the height of the section to 100% of the viewport height
  padding: 0; // Remove default padding

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto; // Adjust height for small screens with a max height of 700px or width of 360px
    padding-top: var(--nav-height); // Add padding at the top equal to the navigation height
  }

  h1 {
    margin: 0 0 30px 4px; // Margin at the bottom of 30px and left margin of 4px
    color: var(--green); // Set text color to green
    font-family: var(--font-mono); // Use a monospaced font
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md)); // Font size responsive to viewport width, within a range
    font-weight: 400; // Set font weight to 400 (normal)

    @media (max-width: 480px) {
      margin: 0 0 20px 2px; // Adjust margin for very small screens
    }
  }

  h3 {
    margin-top: 5px; // Margin at the top of 5px
    color: var(--slate); // Set text color to slate
    line-height: 0.9; // Adjust line height
  }

  p {
    margin: 20px 0 0; // Margin at the top of 20px
    max-width: 540px; // Limit the width of the paragraph text
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton}; // Apply big button styling from the theme
    margin-top: 50px; // Margin at the top of 50px
  }
`;

// Functional component for the Hero section
const Hero = () => {
  // State to manage if the component is mounted
  const [isMounted, setIsMounted] = useState(false);
  // Hook to check if the user prefers reduced motion
  const prefersReducedMotion = usePrefersReducedMotion();

  // Effect to set the mounted state after a delay if reduced motion is not preferred
  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    // Set the mounted state to true after the delay
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout); // Clean up the timeout on component unmount
  }, [prefersReducedMotion]);

  // JSX elements for the Hero section
  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Brittany Chiang.</h2>;
  const three = <h3 className="big-heading">I build things for the web.</h3>;
  const four = (
    <>
      <p>
        I’m a software engineer specializing in building (and occasionally designing) exceptional
        digital experiences. Currently, I’m focused on building accessible, human-centered products
        at{' '}
        <a href="https://upstatement.com/" target="_blank" rel="noreferrer">
          Upstatement
        </a>
        .
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="https://www.newline.co/courses/build-a-spotify-connected-app"
      target="_blank"
      rel="noreferrer">
      Check out my course!
    </a>
  );

  // Array of items to be rendered
  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        // Render items directly if reduced motion is preferred
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        // Apply animations if reduced motion is not preferred
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
