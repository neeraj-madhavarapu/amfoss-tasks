import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config'; // Configuration for ScrollReveal
import sr from '@utils/sr'; // ScrollReveal utility for animations
import { usePrefersReducedMotion } from '@hooks'; // Custom hook to check user's preference for reduced motion

// Styled component for the About section
const StyledAboutSection = styled.section`
  max-width: 900px; // Set a maximum width for the section

  .inner {
    display: grid; // Use grid layout for the inner content
    grid-template-columns: 3fr 2fr; // Define the column layout: 3 parts for text, 2 parts for image
    grid-gap: 50px; // Space between grid items

    @media (max-width: 768px) {
      display: block; // Change layout to block for smaller screens
    }
  }
`;

// Styled component for the text content within the About section
const StyledText = styled.div`
  ul.skills-list {
    display: grid; // Use grid layout for skills list
    grid-template-columns: repeat(2, minmax(140px, 200px)); // Define columns for skills list
    grid-gap: 0 10px; // Space between items in the grid
    padding: 0;
    margin: 20px 0 0 0; // Margin for spacing
    overflow: hidden; // Hide overflow
    list-style: none; // Remove list styling

    li {
      position: relative; // Position relative for pseudo-element positioning
      margin-bottom: 10px; // Margin between list items
      padding-left: 20px; // Padding for the list items
      font-family: var(--font-mono); // Monospaced font for list items
      font-size: var(--fz-xs); // Small font size

      &:before {
        content: '▹'; // Arrow character before each list item
        position: absolute; // Absolute positioning for the arrow
        left: 0; // Align to the left
        color: var(--green); // Color for the arrow
        font-size: var(--fz-sm); // Font size for the arrow
        line-height: 12px; // Line height for alignment
      }
    }
  }
`;

// Styled component for the profile picture
const StyledPic = styled.div`
  position: relative; // Position relative for the wrapper positioning
  max-width: 300px; // Maximum width for the image

  @media (max-width: 768px) {
    margin: 50px auto 0; // Center image and add margin for smaller screens
    width: 70%; // Adjust width for smaller screens
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow}; // Add box shadow mixin
    display: block; // Display block for wrapper
    position: relative; // Position relative for inner content
    width: 100%; // Full width
    border-radius: var(--border-radius); // Rounded corners
    background-color: var(--green); // Background color for hover effect

    &:hover,
    &:focus {
      outline: 0; // Remove outline on focus
      transform: translate(-4px, -4px); // Slightly shift position on hover

      &:after {
        transform: translate(8px, 8px); // Shift the after pseudo-element
      }

      .img {
        filter: none; // Remove grayscale filter on hover
        mix-blend-mode: normal; // Reset blend mode on hover
      }
    }

    .img {
      position: relative; // Position relative for image styling
      border-radius: var(--border-radius); // Rounded corners for image
      mix-blend-mode: multiply; // Blend mode for the image
      filter: grayscale(100%) contrast(1); // Grayscale filter
      transition: var(--transition); // Transition effect for hover
    }

    &:before,
    &:after {
      content: ''; // Empty content for pseudo-elements
      display: block; // Display block
      position: absolute; // Absolute positioning
      width: 100%; // Full width
      height: 100%; // Full height
      border-radius: var(--border-radius); // Rounded corners
      transition: var(--transition); // Transition effect for hover
    }

    &:before {
      top: 0; // Position at the top
      left: 0; // Position at the left
      background-color: var(--navy); // Background color for overlay
      mix-blend-mode: screen; // Blend mode for overlay
    }

    &:after {
      border: 2px solid var(--green); // Green border
      top: 14px; // Position from the top
      left: 14px; // Position from the left
      z-index: -1; // Place behind the image
    }
  }
`;

// Main About component
const About = () => {
  const revealContainer = useRef(null); // Ref for the section to be animated
  const prefersReducedMotion = usePrefersReducedMotion(); // Check if user prefers reduced motion

  useEffect(() => {
    if (prefersReducedMotion) {
      return; // Skip animation if user prefers reduced motion
    }

    sr.reveal(revealContainer.current, srConfig()); // Apply ScrollReveal animation
  }, [prefersReducedMotion]);

  const skills = ['JavaScript (ES6+)', 'TypeScript', 'React', 'Eleventy', 'Node.js', 'WordPress']; // List of skills

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! My name is Brittany and I enjoy creating things that live on the internet. My
              interest in web development started back in 2012 when I decided to try editing custom
              Tumblr themes — turns out hacking together a custom reblog button taught me a lot
              about HTML &amp; CSS!
            </p>

            <p>
              Fast-forward to today, and I’ve had the privilege of working at{' '}
              <a href="https://us.mullenlowe.com/">an advertising agency</a>,{' '}
              <a href="https://starry.com/">a start-up</a>,{' '}
              <a href="https://www.apple.com/">a huge corporation</a>, and{' '}
              <a href="https://scout.camd.northeastern.edu/">a student-led design studio</a>. My
              main focus these days is building accessible, inclusive products and digital
              experiences at <a href="https://upstatement.com/">Upstatement</a> for a variety of
              clients.
            </p>

            <p>
              I also recently{' '}
              <a href="https://www.newline.co/courses/build-a-spotify-connected-app">
                launched a course
              </a>{' '}
              that covers everything you need to build a web app with the Spotify API using Node
              &amp; React.
            </p>

            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg" // Path to the image
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot" // Alt text for the image
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
