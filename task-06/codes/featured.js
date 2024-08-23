import React, { useEffect, useRef } from 'react'; // Import necessary React hooks for component lifecycle and references.
import { useStaticQuery, graphql } from 'gatsby'; // Import Gatsby's GraphQL and static query utilities.
import { GatsbyImage, getImage } from 'gatsby-plugin-image'; // Import Gatsby's optimized image components.
import styled from 'styled-components'; // Import styled-components for CSS-in-JS styling.
import sr from '@utils/sr'; // Import ScrollReveal utility for scroll animations.
import { srConfig } from '@config'; // Import ScrollReveal configuration settings.
import { Icon } from '@components/icons'; // Import Icon component for rendering SVG icons.
import { usePrefersReducedMotion } from '@hooks'; // Import custom hook for checking user preference for reduced motion.


// Styled component for the projects grid, applying custom styles to the unordered list.
const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList}; // Reset list styles using a theme mixin.

  a {
    position: relative;
    z-index: 1; // Ensure the anchor links are above other elements.
  }
`;

// Styled component for each individual project, applying grid layout and responsive design.
const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr); // Create a 12-column grid.
  align-items: center; // Align items in the center of the grid.

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow}; // Apply a box shadow on smaller screens.
  }

  &:not(:last-of-type) {
    margin-bottom: 100px; // Add space between projects.

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) { // Apply different styles to odd-numbered projects.
    .project-content {
      grid-column: 7 / -1; // Position the content on the right side.
      text-align: right; // Align text to the right.

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1; // Span the entire grid on small screens.
        padding: 40px 40px 30px;
        text-align: left; // Align text to the left on small screens.
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .project-tech-list {
      justify-content: flex-end; // Align tech list to the right.

      @media (max-width: 768px) {
        justify-content: flex-start; // Align tech list to the left on small screens.
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-end; // Align links to the right.
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start; // Align links to the left on small screens.
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8; // Position the image on the left side.

      @media (max-width: 768px) {
        grid-column: 1 / -1; // Span the entire grid on small screens.
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7; // Position the content on the left side.
    grid-row: 1 / -1; // Span the entire row.

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column; // Stack content vertically on small screens.
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1; // Span the entire grid on small screens.
      padding: 40px 40px 30px;
      z-index: 5; // Ensure content is above other elements.
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--green); // Use green color for the overline text.
    font-family: var(--font-mono); // Use a monospaced font.
    font-size: var(--fz-xs); // Use extra small font size.
    font-weight: 400; // Use normal font weight.
  }

  .project-title {
    color: var(--lightest-slate); // Use light slate color for the title.
    font-size: clamp(24px, 5vw, 28px); // Use responsive font size.

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white); // Use white color for the title on small screens.

      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow}; // Apply a box shadow.
    position: relative;
    z-index: 2; // Ensure description is above other elements.
    padding: 25px;
    border-radius: var(--border-radius); // Use border radius for rounded corners.
    background-color: var(--light-navy); // Use light navy background color.
    color: var(--light-slate); // Use light slate text color.
    font-size: var(--fz-lg); // Use large font size.

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none; // Remove box shadow on small screens.

      &:hover {
        box-shadow: none; // Disable box shadow on hover for small screens.
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink}; // Apply inline link styles.
    }

    strong {
      color: var(--white); // Use white color for strong text.
      font-weight: normal; // Use normal font weight.
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap; // Allow tech list items to wrap.
    position: relative;
    z-index: 2; // Ensure tech list is above other elements.
    margin: 25px 0 10px;
    padding: 0;
    list-style: none; // Remove list styling.

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate); // Use light slate color for tech items.
      font-family: var(--font-mono); // Use a monospaced font.
      font-size: var(--fz-xs); // Use extra small font size.
      white-space: nowrap; // Prevent tech items from wrapping.

      @media (max-width: 768px) {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate); // Use lightest slate color on small screens.
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate); // Use lightest slate color for links.

    a {
      ${({ theme }) => theme.mixins.flexCenter}; // Center align the links.
      padding: 10px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .cta {
      ${({ theme }) => theme.mixins.smallButton}; // Apply small button styles.
      margin: 10px;
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow}; // Apply a box shadow.
    grid-column: 6 / -1; // Position the image on the right side.
    grid-row: 1 / -1; // Span the entire row.
    position: relative;
    z-index: 1; // Ensure the image is above other elements.

    @media (max-width: 768px) {
      grid-column: 1 / -1; // Span the entire grid on small screens.
      height: 100%;
      opacity: 0.25; // Reduce opacity on small screens.
    }

    a {
      width: 100%;
      height: 100%;
      background-color: var(--green); // Use green background color.
      border-radius: var(--border-radius); // Use border radius for rounded corners.
      vertical-align: middle;

      &:hover,
      &:focus {
        background: transparent;
        outline: 0;

        &:before,
        .img {
          filter: none; // Remove image filter on hover or focus.
        }
      }

      .img {
        border-radius: var(--border-radius); // Apply border radius to image.
        mix-blend-mode: multiply; // Use multiply blend mode.
        filter: grayscale(100%) contrast(1) brightness(90%); // Apply grayscale and contrast filter.
        transition: var(--transition); // Apply transition effect.
      }
    }
  }
`;

// Main Projects component that fetches data and renders the project list.
const Projects = () => {
  // Static query to fetch project data using GraphQL.
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/projects/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, quality: 90, layout: CONSTRAINED)
                }
              }
              external
              github
              tech
              description
              cta
            }
            html
          }
        }
      }
    }
  `);

  const projects = data.projects.edges.filter(({ node }) => node); // Filter out projects without data.
  const revealTitle = useRef(null); // Create a ref for the title element.
  const revealProjects = useRef([]); // Create a ref array for each project.

  const prefersReducedMotion = usePrefersReducedMotion(); // Check if the user prefers reduced motion.

  // Use ScrollReveal to animate elements if the user does not prefer reduced motion.
  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig()); // Reveal the title with animation.
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100))); // Reveal each project with a staggered animation.
  }, [prefersReducedMotion]);

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Things I’ve Built
      </h2>

      <StyledProjectsGrid>
        {projects &&
          projects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { title, cover, external, github, tech, cta } = frontmatter;
            const image = getImage(cover);

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-content">
                  <div>
                    <p className="project-overline">Featured Project</p>

                    <h3 className="project-title">
                      <a href={external ? external : github ? github : '#'} target="_blank" rel="noopener noreferrer">
                        {title}
                      </a>
                    </h3>

                    <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />

                    {tech && (
                      <ul className="project-tech-list">
                        {tech.map((techItem, i) => (
                          <li key={i}>{techItem}</li>
                        ))}
                      </ul>
                    )}

                    <div className="project-links">
                      {cta && (
                        <a href={cta} target="_blank" rel="noopener noreferrer" className="cta">
                          {cta}
                        </a>
                      )}
                      {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Link">
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {external && (
                        <a href={external} target="_blank" rel="noopener noreferrer" aria-label="External Link" className="external">
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="project-image">
                  <a href={external ? external : github ? github : '#'} target="_blank" rel="noopener noreferrer">
                    <GatsbyImage image={image} alt={title} className="img" />
                  </a>
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Projects;
