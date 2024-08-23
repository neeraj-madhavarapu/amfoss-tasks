# Documentation
## Overview

This portfolio web application made with react and Gatsby So that is designed  in a way that will help you to know about the person a lot,there works, experiences,skill, contact , also there Resume.
Also you can showcase your  work, skills, and experience with use of this website.
In this your social media profile is also included which will make easy for the one who seeing your website to reach out for you.
Due to the user friendly presentation of the web app the navigation through this is also nice,eye catching and simple.

Firstly I will explain above the and what the output/display will it give ,

### head.js
When this component is used in a page or layout component, it influences:<br>
    1. Page Title: appears in the browser tab and search engine results.<br>
    2. Meta Description: a brief summary of the page content used by search engines.<br>
    3. Open Graph & Twitter Tags: These tags define how the page appears when shared on social media platforms like Facebook, Linked In, and Twitter. They typically include the page title, description, and an image preview.<br>
[Click here](https://github.com/neeraj-madhavarapu/amfoss-tasks/blob/main/task-06/codes/hero.js) to see explanation of code.<br>

### layout.js
When this component is used in a page or layout component:<br>
          - On the homepage: Initially, you might see a loading animation (if implemented). After the loading finishes, the homepage content appears, surrounded by the navigation, social media links, email contact, and footer.<br>
          - On other pages: The main content would appear immediately, wrapped by the same navigation, social links, and footer, providing a consistent look and feel across the site.
[Click here](https://github.com/neeraj-madhavarapu/amfoss-tasks/blob/main/task-06/codes/layout.js) to see explanation of code.

### loader.js
When this component is used in a page or layout component:<br>
When the page initially loads, a full-screen overlay will appear with a dark background (var(--dark-navy)).<br>
In the center of the screen, a logo or icon (represented by the IconLoader component) will be animated where the logo will then fade out and shrink.<br>
Once the animation completes, the loader will fade out and disappear, revealing the actual content of the website.<br>
[Click here](https://github.com/neeraj-madhavarapu/amfoss-tasks/blob/main/task-06/codes/loader.js) to see explanation of code.<br>

### nav.js
When this component is used in a page or layout component:<br>
        ◦ The header is fixed at the top of the page with a semi-transparent dark background.<br>
        ◦ It contains a logo on the left and navigation links on the right.<br>
        ◦ The logo is a clickable link (or anchor tag) that navigates to the home page.<br>
        ◦ It consists of two components: IconHex and IconLogo, with IconHex behind IconLogo.<br>
        ◦ The navigation links are displayed in a horizontal row.<br>
        ◦ Each link has a number prefix (e.g., "01.", "02.") styled in green.<br>
        ◦ A "Resume" button is styled to stand out and links to a PDF resume.<br>
        ◦ When scrolling down, the header height reduces, and it shifts out of view.<br>
        ◦ When scrolling up, the header returns to its original height and position.<br>
[Click here](https://github.com/neeraj-madhavarapu/amfoss-tasks/blob/main/task-06/codes/nav.js) to see explanation of code.<br>

### menu.js
When this component is used in a page or layout component:<br>
On screen, the hamburger button and sidebar menu will not appear. Instead, you’ll see the standard navigation elements or any other content defined for the desktop view. <br>
For a typical desktop navigation setup, you might have:<br>
    • Navigation Bar: Displayed at the top of the page, often including logo, menu items, and possibly additional elements like search bars or user icons.<br>
[Click here](https://github.com/neeraj-madhavarapu/amfoss-tasks/blob/main/task-06/codes/menu.js) to see explanation of code.<br>

### side.js
When this component is used in a page or layout component:<br>
    • The Side component is positioned fixed at the bottom of the screen. Its exact position (left or right) depends on the orientation prop.<br>
    • Size: It has a fixed width of 40px.<br>
    • The text color is set to var(--light-slate), which is a CSS variable. <br>
    • Visibility: On screens wider than 768px, it is visible and positioned according to the orientation prop. On smaller screens (768px and below), it is hidden.<br>
    • If the user prefers reduced motion, the component will render its children directly without any animation.<br>
    • If reduced motion is not preferred, the CSSTransition component adds animations. The component will fade in or out based on the isHome prop. The transition effects are controlled by CSS classes that are applied conditionally.<br>
[Click here](https://github.com/neeraj-madhavarapu/amfoss-tasks/blob/main/task-06/codes/side.js) to see explanation of code.<br>

### social.js
When this component is used in a page or layout component:<br>
    • Icons are stacked vertically and centered horizontally within this fixed container.<br>
    • Each social media icon is represented as an SVG image.<br>
    • A vertical line is displayed between the icons and the bottom of the screen, acting as a separator.<br>
    • On hovering over an icon, it moves up slightly (3px), giving a visual feedback effect.<br>
[Click here](https://github.com/neeraj-madhavarapu/amfoss-tasks/blob/main/task-06/codes/social.js) to see explanation of code.<br>

### email.js
When this component is used in a page or layout component:<br>
    • The Email component is fixed to the right side of the screen. It is centered vertically with respect to the viewport height.<br>
    • The component includes a vertical line that extends from the bottom of the viewport to a height of 90px, centered horizontally next to the email link.<br>
    • The email address is displayed in a vertical layout (right-to-left) due to writing-mode: vertical-rl.<br>
    • When you hover over or focus on the email link, it will slightly move up by 3px, thanks to the transform: translateY(-3px) effect.<br>
[Click here](https://github.com/neeraj-madhavarapu/amfoss-tasks/blob/main/task-06/codes/email.js) to see explanation of code.<br>

### footer.js
When this component is used in a page or layout component:<br>
    • The footer is centered horizontally and styled to be flexible and vertically centered.<br>
    • It contains two main sections: social media links and credit information.<br>
        ◦ The social media links are not shown (hidden by default).<br>
[Click here](https://github.com/neeraj-madhavarapu/amfoss-tasks/blob/main/task-06/codes/footer.js) to see explanation of code.<br>

### hero.js
When this component is used in a page or layout component:<br>
    • The hero section takes up the entire height of the viewport (100vh) by default. If the viewport height is less than 700px or if the viewport width is 360px or less, the height adjusts to be auto with padding at the top to accommodate navigation.<br>
    • Text Elements<br>
    • Header Text (h1):<br>
        ◦ Positioned at the top of the hero section.<br>
        ◦ Text: "Hi, my name is".<br>
        ◦ Color: Green (var(--green)).<br>
        ◦ Font: Monospaced (var(--font-mono)).<br>
        ◦ Responsive font size based on viewport width.<br>
        ◦ Margin: Top margin is 0, bottom margin is 30px, and left margin is 4px.<br>
        ◦ Adjusted margin on very small screens (480px wide or less).<br>
    • Subheader Text (h2):<br>
        ◦ Text: "Your name:)"<br>
        ◦ Positioned below the h1 text.<br>
        ◦ Font size and styling applied via the class big-heading.<br>
        ◦ Margin: Top margin is 0, bottom margin is 30px, and left margin is 4px.<br>
    • Subheader Text (h3):<br>
        ◦ Text: "your description"<br>
        ◦ Positioned below the h2 text.<br>
        ◦ Color: Slate (var(--slate)).<br>
        ◦ Line height: Adjusted to 0.9 for a compact look.<br>
    • Paragraph (p):<br>
        ◦ Contains a description about the author and a link to their workplace.<br>
        ◦ Text: Describes the author's work and provides a link to Upstatement.<br>
        ◦ Margin: Top margin is 20px.<br>
        ◦ Maximum width is 540px for better readability.<br>
    • Button Link (a):<br>
        ◦ Text: "Check out my course!"<br>
        ◦ Positioned below the paragraph with a margin of 50px at the top.<br>
        ◦ Styled as a big button (email-link class).<br>
    • If reduced motion is not preferred, elements are animated with a fade-up effect. Each item in the hero section appears with a slight delay based on its order.<br>
    • If reduced motion is preferred, items appear without animation.<br>
[Click here](https://github.com/neeraj-madhavarapu/amfoss-tasks/blob/main/task-06/codes/hero.js) to see explanation of code.<br>

### about.js
When this component is used in a page or layout component:<br>
    • The component is contained within a section element with a maximum width of 900px, aligning its content in a grid layout for wider screens (3 columns for text, 2 columns for image).<br>
    • For screens narrower than 768px, the grid layout changes to a block layout where the text and image are stacked vertically.<br>
    • Text Content: Contains several paragraphs describing the person, including their background in web development, work experience, and recent achievements. Links are provided to external websites and a course launch.<br>
    • Profile Picture:A profile picture is displayed in a circular style with a green background. The image is contained within a wrapper that has hover effects to shift the image and change filters.<br>
    • ScrollReveal: If the user does not prefer reduced motion, the section uses ScrollReveal to animate the content as it comes into view.<br>
[Click here](https://github.com/neeraj-madhavarapu/amfoss-tasks/blob/main/task-06/codes/About.js) to see explanation of code.<br>

### jobs.js
When this component is used in a page or layout component:<br>
On a Large Screen (e.g., Desktop)<br>
    • Arranged horizontally with a vertical highlight bar indicating the active tab. The tabs are displayed in a single row.<br>
    • The selected tab’s content is shown to the right of the tabs.<br>

Note: Replace this placeholder with a screenshot of your actual design.<br>
On a Medium Screen (e.g., Tablet)<br>
    • Still arranged horizontally but might take up more vertical space with some adjustments for padding.<br>
    • The selected tab’s content is displayed below the tabs.<br>

Note: Replace this placeholder with a screenshot of your actual design.<br>
On a Small Screen (e.g., Mobile)<br>
    • Displayed in a horizontal scrolling list. Each tab is centered, and users can swipe to scroll through them.<br>
    • The selected tab’s content appears below the tabs, and there’s a horizontal highlight indicator for active tabs.<br>
[Click here](https://github.com/neeraj-madhavarapu/amfoss-tasks/blob/main/task-06/codes/jobs.js) to see explanation of code.<br>

### featured.js
When this component is used in a page or layout component:<br>
    • Desktop Layout:<br>
        ◦ Projects alternate between left and right alignment.<br>
        ◦ The content (title, description, etc.) is on one side, and the image is on the opposite side.<br>
        ◦ The text aligns to the left for even projects and to the right for odd projects.<br>
    • Tablet and Mobile Layout:<br>
        ◦ The image spans the full width above the content.<br>
        ◦ The text and other elements stack vertically.<br>
        ◦ The image has reduced opacity to emphasize the content on smaller screens.<br>
    • When scrolling down, the section title and each project will animate into view if the user does not prefer reduced motion.<br>
[Click here](https://github.com/neeraj-madhavarapu/amfoss-tasks/blob/main/task-06/codes/featured.js) to see explanation of code.<br>

### projects.js
When this component is used in a page or layout component:<br>
    • A heading with the text "Other Noteworthy Projects" centered at the top of the section.<br>
    • A link below the title that says "view the archive", styled as a mono-space font link. This link navigates to the /archive page.<br>
        ◦ The projects are displayed in a responsive grid layout. Each project is represented by a grid item with a card-like design.<br>
    • On the top right, with icons for GitHub (if available) and an external link (if provided).<br>
    • The project title, which is a clickable link opening the external project page.<br>
    • If animations are enabled, the title, archive link, and project cards animate into view as you scroll. The projects fade in and slide up with a staggered effect.<br>
[Click here](https://github.com/neeraj-madhavarapu/amfoss-tasks/blob/main/task-06/codes/projects.js) to see explanation of code.<br>

### contact.js
When this component is used in a page or layout component:<br>
    • The entire contact section is centered horizontally with a maximum width of 600px. On smaller screens, it adjusts to a margin of 50px at the bottom.<br>
        ◦ The overline text (What’s Next?) is displayed with a green color and a monospace font.<br>
        ◦ The font size adjusts based on the viewport, ensuring it fits well with the design.<br>
        ◦ The main title (Get In Touch) is prominently displayed with a responsive font size, scaling between 40px and 60px depending on the viewport width.<br>
    • A centered paragraph provides a friendly message inviting users to get in touch, even though you are not actively seeking new opportunities.<br>
    • Email Link:<br>
        ◦ Appearance: A button-styled link with a margin on top allows users to send an email directly. The button is styled using theme mixins, giving it a consistent look with other buttons on the site.<br>
        ◦ Functionality: Clicking the button opens the default email client with your email address pre-filled.<br>
[Click here](https://github.com/neeraj-madhavarapu/amfoss-tasks/blob/main/task-06/codes/contact.js) to see explanation of code.<br>
