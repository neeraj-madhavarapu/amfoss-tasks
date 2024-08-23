import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { css } from 'styled-components';
import { navLinks } from '@config'; // Import navigation links from config
import { loaderDelay } from '@utils'; // Import a utility for loading delays
import { useScrollDirection, usePrefersReducedMotion } from '@hooks'; // Custom hooks for scroll direction and reduced motion preference
import { Menu } from '@components'; // Import Menu component
import { IconLogo, IconHex } from '@components/icons'; // Import icons for the logo

// Styled component for the header
const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween}; // Flexbox centering mixin
  position: fixed; // Fixed position at the top of the page
  top: 0;
  z-index: 11; // Ensures it sits above other content
  padding: 0px 50px; // Horizontal padding
  width: 100%; // Full width
  height: var(--nav-height); // Navigation height from CSS variables
  background-color: rgba(10, 25, 47, 0.85); // Semi-transparent background
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  backdrop-filter: blur(10px); // Blurs background content behind the header
  transition: var(--transition); // Smooth transition for changes

  // Responsive padding adjustments
  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }

  // Scroll-based animations
  @media (prefers-reduced-motion: no-preference) {
    ${props =>
    props.scrollDirection === 'up' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        background-color: rgba(10, 25, 47, 0.85);
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};

    ${props =>
    props.scrollDirection === 'down' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) * -1));
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};
  }
`;

// Styled component for the navigation
const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween}; // Flexbox centering mixin
  position: relative;
  width: 100%;
  color: var(--lightest-slate); // Navigation text color
  font-family: var(--font-mono); // Font style for the navigation
  counter-reset: item 0; // Reset CSS counter for list items
  z-index: 12; // Ensures it sits above other content

  .logo {
    ${({ theme }) => theme.mixins.flexCenter}; // Center the logo using flexbox

    a {
      color: var(--green); // Logo link color
      width: 42px;
      height: 42px;
      position: relative;
      z-index: 1;

      .hex-container {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        @media (prefers-reduced-motion: no-preference) {
          transition: var(--transition); // Smooth transition for changes
        }
      }

      .logo-container {
        position: relative;
        z-index: 1;
        svg {
          fill: none; // No fill color for the SVG
          user-select: none; // Prevent text selection
          @media (prefers-reduced-motion: no-preference) {
            transition: var(--transition); // Smooth transition for changes
          }
          polygon {
            fill: var(--navy); // Fill color for the SVG polygon
          }
        }
      }

      &:hover,
      &:focus {
        outline: 0;
        transform: translate(-4px, -4px); // Move logo on hover/focus
        .hex-container {
          transform: translate(4px, 3px); // Move hexagon on hover/focus
        }
      }
    }
  }
`;

// Styled component for the navigation links
const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none; // Hide links on smaller screens
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween}; // Flexbox centering mixin
    padding: 0;
    margin: 0;
    list-style: none; // Remove default list styles

    li {
      margin: 0 5px;
      position: relative;
      counter-increment: item 1; // Increment CSS counter
      font-size: var(--fz-xs); // Font size for list items

      a {
        padding: 10px;

        &:before {
          content: '0' counter(item) '.'; // List item number
          margin-right: 5px;
          color: var(--green); // Color for list item number
          font-size: var(--fz-xxs); // Font size for list item number
          text-align: right;
        }
      }
    }
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton}; // Button mixin
    margin-left: 15px;
    font-size: var(--fz-xs); // Font size for the resume button
  }
`;

const Nav = ({ isHome }) => {
  const [isMounted, setIsMounted] = useState(!isHome); // Initial state based on if on home page
  const scrollDirection = useScrollDirection('down'); // Hook to determine scroll direction
  const [scrolledToTop, setScrolledToTop] = useState(true); // Track if scrolled to the top
  const prefersReducedMotion = usePrefersReducedMotion(); // Hook for reduced motion preference

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50); // Check if scrolled near the top
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsMounted(true); // Set mounted state after a short delay
    }, 100);

    window.addEventListener('scroll', handleScroll); // Add scroll event listener

    return () => {
      clearTimeout(timeout); // Clean up timeout on unmount
      window.removeEventListener('scroll', handleScroll); // Remove scroll event listener
    };
  }, [prefersReducedMotion]);

  const timeout = isHome ? loaderDelay : 0; // Delay for animations
  const fadeClass = isHome ? 'fade' : ''; // CSS class for fading effect
  const fadeDownClass = isHome ? 'fadedown' : ''; // CSS class for fading down effect

  const Logo = (
    <div className="logo" tabIndex="-1">
      {isHome ? (
        <a href="/" aria-label="home">
          <div className="hex-container">
            <IconHex />
          </div>
          <div className="logo-container">
            <IconLogo />
          </div>
        </a>
      ) : (
        <Link to="/" aria-label="home">
          <div className="hex-container">
            <IconHex />
          </div>
          <div className="logo-container">
            <IconLogo />
          </div>
        </Link>
      )}
    </div>
  );

  const ResumeLink = (
    <a className="resume-button" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
      Resume
    </a>
  );

  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      <StyledNav>
        {prefersReducedMotion ? (
          <>
            {Logo}

            <StyledLinks>
              <ol>
                {navLinks &&
                  navLinks.map(({ url, name }, i) => (
                    <li key={i}>
                      <Link to={url}>{name}</Link>
                    </li>
                  ))}
              </ol>
              <div>{ResumeLink}</div>
            </StyledLinks>

            <Menu />
          </>
        ) : (
          <>
            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition classNames={fadeClass} timeout={timeout}>
                  <>{Logo}</>
                </CSSTransition>
              )}
            </TransitionGroup>

            <StyledLinks>
              <ol>
                <TransitionGroup component={null}>
                  {isMounted &&
                    navLinks &&
                    navLinks.map(({ url, name }, i) => (
                      <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>
                        <li key={i} style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                          <Link to={url}>{name}</Link>
                        </li>
                      </CSSTransition>
                    ))}
                </TransitionGroup>
              </ol>

              <TransitionGroup component={null}>
                {isMounted && (
                  <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                    <div style={{ transitionDelay: `${isHome ? navLinks.length * 100 : 0}ms` }}>
                      {ResumeLink}
                    </div>
                  </CSSTransition>
                )}
              </TransitionGroup>
            </StyledLinks>

            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition classNames={fadeClass} timeout={timeout}>
                  <Menu />
                </CSSTransition>
              )}
            </TransitionGroup>
          </>
        )}
      </StyledNav>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool, // Prop type for isHome
};

export default Nav;
