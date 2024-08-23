// Import necessary modules and components
import React, { useEffect, useRef } from 'react'; // React for creating components and hooks
import styled from 'styled-components'; // Styled-components for styling
import { srConfig, email } from '@config'; // Configuration settings and email from config
import sr from '@utils/sr'; // ScrollReveal utility for animations
import { usePrefersReducedMotion } from '@hooks'; // Custom hook to check user's motion preference

// Styled component for the Contact section
const StyledContactSection = styled.section`
  max-width: 600px; // Sets the maximum width of the section
  margin: 0 auto 100px; // Centers the section horizontally and sets bottom margin
  text-align: center; // Centers text within the section

  @media (max-width: 768px) {
    margin: 0 auto 50px; // Reduces bottom margin on smaller screens
  }

  // Style for the overline text
  .overline {
    display: block; // Makes the element a block-level element
    margin-bottom: 20px; // Adds space below the element
    color: var(--green); // Sets the text color to green
    font-family: var(--font-mono); // Uses a mono-space font
    font-size: var(--fz-md); // Sets the font size
    font-weight: 400; // Sets the font weight

    &:before {
      bottom: 0; // Positions the pseudo-element at the bottom
      font-size: var(--fz-sm); // Sets font size for the pseudo-element
    }

    &:after {
      display: none; // Hides the pseudo-element after
    }
  }

  // Style for the main title
  .title {
    font-size: clamp(40px, 5vw, 60px); // Responsive font size between 40px and 60px
  }

  // Style for the email link button
  .email-link {
    ${({ theme }) => theme.mixins.bigButton}; // Applies styles from theme mixins
    margin-top: 50px; // Adds space above the button
  }
`;

// Contact component
const Contact = () => {
  // Reference to the container element for animations
  const revealContainer = useRef(null);
  // Hook to check if user prefers reduced motion
  const prefersReducedMotion = usePrefersReducedMotion();

  // useEffect hook for triggering animations when component mounts
  useEffect(() => {
    if (prefersReducedMotion) {
      return; // Skip animations if user prefers reduced motion
    }

    // Reveal the container element with ScrollReveal animations
    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]); // Dependency array ensures effect runs when prefersReducedMotion changes

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      {/* Section heading with a number prefix and "What’s Next?" text */}
      <h2 className="numbered-heading overline">What’s Next?</h2>

      {/* Main title of the section */}
      <h2 className="title">Get In Touch</h2>

      {/* Paragraph with a message */}
      <p>
        Although I’m not currently looking for any new opportunities, my inbox is always open.
        Whether you have a question or just want to say hi, I’ll try my best to get back to you!
      </p>

      {/* Email link styled as a button */}
      <a className="email-link" href={`mailto:${email}`}>
        Say Hello
      </a>
    </StyledContactSection>
  );
};

// Export the Contact component for use in other parts of the application
export default Contact;
