import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet'; // For managing the HTML head
import { Link } from 'gatsby'; // For navigation within a Gatsby site
import styled from 'styled-components'; // For styled components
import { navLinks } from '@config'; // Configuration for navigation links
import { KEY_CODES } from '@utils'; // Utility constants for key codes
import { useOnClickOutside } from '@hooks'; // Custom hook to detect clicks outside an element

// Styled component for the menu container, only visible on mobile devices
const StyledMenu = styled.div`
  display: none; // Hidden by default

  @media (max-width: 768px) {
    display: block; // Displayed on mobile devices
  }
`;

// Styled component for the hamburger button
const StyledHamburgerButton = styled.button`
  display: none; // Hidden by default

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.flexCenter}; // Center the button with flexbox
    position: relative;
    z-index: 10; // Ensure it’s above other elements
    margin-right: -15px;
    padding: 15px;
    border: 0;
    background-color: transparent;
    color: inherit;
    text-transform: none;
    transition-timing-function: linear;
    transition-duration: 0.15s;
    transition-property: opacity, filter;
  }

  .ham-box {
    display: inline-block;
    position: relative;
    width: var(--hamburger-width);
    height: 24px;
  }

  .ham-box-inner {
    position: absolute;
    top: 50%;
    right: 0;
    width: var(--hamburger-width);
    height: 2px;
    border-radius: var(--border-radius);
    background-color: var(--green);
    transition-duration: 0.22s;
    transition-property: transform;
    transition-delay: ${props => (props.menuOpen ? `0.12s` : `0s`)};
    transform: rotate(${props => (props.menuOpen ? `225deg` : `0deg`)});
    transition-timing-function: cubic-bezier(
      ${props => (props.menuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`)}
    );
    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      left: auto;
      right: 0;
      width: var(--hamburger-width);
      height: 2px;
      border-radius: 4px;
      background-color: var(--green);
      transition-timing-function: ease;
      transition-duration: 0.15s;
      transition-property: transform;
    }
    &:before {
      width: ${props => (props.menuOpen ? `100%` : `120%`)};
      top: ${props => (props.menuOpen ? `0` : `-10px`)};
      opacity: ${props => (props.menuOpen ? 0 : 1)};
      transition: ${({ menuOpen }) =>
    menuOpen ? 'var(--ham-before-active)' : 'var(--ham-before)'};
    }
    &:after {
      width: ${props => (props.menuOpen ? `100%` : `80%`)};
      bottom: ${props => (props.menuOpen ? `0` : `-10px`)};
      transform: rotate(${props => (props.menuOpen ? `-90deg` : `0`)});
      transition: ${({ menuOpen }) => (menuOpen ? 'var(--ham-after-active)' : 'var(--ham-after)')};
    }
  }
`;

// Styled component for the sidebar menu, only visible on mobile devices
const StyledSidebar = styled.aside`
  display: none; // Hidden by default

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.flexCenter}; // Center the sidebar content with flexbox
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 50px 10px;
    width: min(75vw, 400px); // Responsive width
    height: 100vh;
    outline: 0;
    background-color: var(--light-navy);
    box-shadow: -10px 0px 30px -15px var(--navy-shadow);
    z-index: 9;
    transform: translateX(${props => (props.menuOpen ? 0 : 100)}vw);
    visibility: ${props => (props.menuOpen ? 'visible' : 'hidden')};
    transition: var(--transition);
  }

  nav {
    ${({ theme }) => theme.mixins.flexBetween}; // Space out nav items
    width: 100%;
    flex-direction: column;
    color: var(--lightest-slate);
    font-family: var(--font-mono);
    text-align: center;
  }

  ol {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;

    li {
      position: relative;
      margin: 0 auto 20px;
      counter-increment: item 1;
      font-size: clamp(var(--fz-sm), 4vw, var(--fz-lg)); // Responsive font size

      @media (max-width: 600px) {
        margin: 0 auto 10px;
      }

      &:before {
        content: '0' counter(item) '.';
        display: block;
        margin-bottom: 5px;
        color: var(--green);
        font-size: var(--fz-sm);
      }
    }

    a {
      ${({ theme }) => theme.mixins.link}; // Styled link mixin
      width: 100%;
      padding: 3px 20px 20px;
    }
  }

  .resume-link {
    ${({ theme }) => theme.mixins.bigButton}; // Styled button mixin
    padding: 18px 50px;
    margin: 10% auto 0;
    width: max-content;
  }
`;

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to track menu open/closed status

  const toggleMenu = () => setMenuOpen(!menuOpen); // Toggle the menu open/closed status

  const buttonRef = useRef(null); // Ref for the hamburger button
  const navRef = useRef(null); // Ref for the navigation links

  let menuFocusables;
  let firstFocusableEl;
  let lastFocusableEl;

  const setFocusables = () => {
    menuFocusables = [buttonRef.current, ...Array.from(navRef.current.querySelectorAll('a'))];
    firstFocusableEl = menuFocusables[0];
    lastFocusableEl = menuFocusables[menuFocusables.length - 1];
  };

  const handleBackwardTab = e => {
    if (document.activeElement === firstFocusableEl) {
      e.preventDefault();
      lastFocusableEl.focus(); // Move focus to the last focusable element
    }
  };

  const handleForwardTab = e => {
    if (document.activeElement === lastFocusableEl) {
      e.preventDefault();
      firstFocusableEl.focus(); // Move focus to the first focusable element
    }
  };

  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ESCAPE:
      case KEY_CODES.ESCAPE_IE11: {
        setMenuOpen(false); // Close the menu when Escape is pressed
        break;
      }

      case KEY_CODES.TAB: {
        if (menuFocusables && menuFocusables.length === 1) {
          e.preventDefault();
          break;
        }
        if (e.shiftKey) {
          handleBackwardTab(e);
        } else {
          handleForwardTab(e);
        }
        break;
      }

      default: {
        break;
      }
    }
  };

  const onResize = e => {
    if (e.currentTarget.innerWidth > 768) {
      setMenuOpen(false); // Close menu on window resize if screen width is greater than 768px
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown); // Add keydown event listener
    window.addEventListener('resize', onResize); // Add resize event listener

    setFocusables(); // Set focusable elements

    return () => {
      document.removeEventListener('keydown', onKeyDown); // Clean up keydown event listener
      window.removeEventListener('resize', onResize); // Clean up resize event listener
    };
  }, []);

  const wrapperRef = useRef(); // Ref for detecting clicks outside the menu
  useOnClickOutside(wrapperRef, () => setMenuOpen(false)); // Custom hook to close menu on outside click

  return (
    <StyledMenu>
      <Helmet>
        <body className={menuOpen ? 'blur' : ''} /> {/* Add blur class to body when menu is open */}
      </Helmet>

      <div ref={wrapperRef}>
        <StyledHamburgerButton
          onClick={toggleMenu} // Toggle menu on click
          menuOpen={menuOpen}
          ref={buttonRef}
          aria-label="Menu">
          <div className="ham-box">
            <div className="ham-box-inner" />
          </div>
        </StyledHamburgerButton>

        <StyledSidebar menuOpen={menuOpen} aria-hidden={!menuOpen} tabIndex={menuOpen ? 1 : -1}>
          <nav ref={navRef}>
            {navLinks && (
              <ol>
                {navLinks.map(({ url, name }, i) => (
                  <li key={i}>
                    <Link to={url} onClick={() => setMenuOpen(false)}>
                      {name}
                    </Link>
                  </li>
                ))}
              </ol>
            )}

            <a href="/resume.pdf" className="resume-link">
              Resume
            </a>
          </nav>
        </StyledSidebar>
      </div>
    </StyledMenu>
  );
};

export default Menu;
