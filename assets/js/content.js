/**
 * ============================================================================
 *  SITE CONTENT  —  Edit everything about your portfolio here.
 * ============================================================================
 *
 *  This is the ONLY file you normally need to touch. No HTML/CSS required.
 *
 *  Image swaps: drop your real file into assets/images/ (keep the same name
 *  to skip editing), or update the path below. See assets/images/README.md.
 * ============================================================================
 */

window.SITE_CONTENT = {
  // ---- Browser tab + SEO --------------------------------------------------
  meta: {
    title: "Asawari Sakharkar — Information Designer & UX Researcher",
    description:
      "Portfolio of Asawari Sakharkar — Information Designer, UX Designer and Product Designer.",
    favicon: "assets/favicononinini.jpeg",
  },

  // ---- Header -------------------------------------------------------------
  header: {
    resumeLabel: "Resume",
    resumeFile: "assets/resume/Asawari's Resume for protfolio.pdf",
    findMeText: "You can find me on",
    // `icon` must match a key in assets/js/icons.js. Leave url "" to hide.
    socials: [
      { icon: "medium", label: "Medium", url: "https://medium.com/@asawarisakharkar2000" },
      { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/asawari-sakharkar-0861b3300/" },
      { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/lily_in_august?igsh=ODhkdXgzdnd6YWtw" },
    ],
  },

  // ---- Hero ---------------------------------------------------------------
  hero: {
    name: "Asawari Sakharkar",
    tagline:
      "Information designer with a background in UX research, data visualization, and front-end development, working across research, design, and product development.",
    subtitle: "I turn ambiguous problems into evidence, and evidence into design decisions.",
    image: "assets/images/Group 32.png",
    imageAlt: "Two portraits of Asawari inside an open locket",
  },

  // ---- Skills ----------------------------------------------------------
  expertise: {
    heading: "Skills",
    groups: [
      {
        number: "01",
        title: "Research & Discovery",
        description: "Understanding people, behaviour and the context behind problems.",
      },
      {
        number: "02",
        title: "Experience Design",
        description: "Translating insights into intuitive and meaningful experiences.",
      },
      {
        number: "03",
        title: "Data & Storytelling",
        description: "Finding patterns in data and making information easier to understand.",
      },
      {
        number: "04",
        title: "Technology & Prototyping",
        description: "Experimenting with emerging tools to bring ideas to life.",
      },
    ],
    // accent:true renders the outlined pill style ("And an outfit planner").
    tags: [
      { label: "User Research", group: "Research & Discovery" },
      { label: "Behavioural Psychology", group: "Research & Discovery" },
      { label: "Accessibility", group: "Research & Discovery" },
      { label: "UX Design", group: "Experience Design" },
      { label: "UI Design", group: "Experience Design" },
      { label: "Design Strategy", group: "Experience Design" },
      { label: "UX Writing", group: "Experience Design" },
      { label: "Data Analysis", group: "Data & Storytelling" },
      { label: "Data Visualization", group: "Data & Storytelling" },
      { label: "Data Narratives", group: "Data & Storytelling" },
      { label: "AI Agents", group: "Technology & Prototyping" },
      { label: "AI-assisted Prototyping", group: "Technology & Prototyping" },
      { label: "AI Workflow Design", group: "Technology & Prototyping" },
      { label: "AI Evaluation & Responsible Design", group: "Technology & Prototyping" },
      { label: "Prototyping", group: "Technology & Prototyping" },
     // { label: "And an Outfit Planner", accent: true },
    ],
  },

  // ---- My Projects --------------------------------------------------------
  projects: {
    heading: "Projects you need to see",
    // Add an ISO date (YYYY-MM-DD) to a project when its actual project date
    // is known. Undated projects remain in the final, explicitly labelled
    // milestone instead of being assigned a date.
    timeline: {
      filters: ["All", "UX", "Research", "Data Visualization", "Ecosystem Mapping", "Development"],
    },
    // Each category has a subtitle and a live case-study count.
    categories: [
      {
        title: "UX Case Studies",
        items: [
          { image: "assets/images/projects/Arohi_tileImage.png", 
            title: "Arohi: Disaster Management Interface", 
            date: "2025-08-05",
            description: "A case study exploring a clearer interface for disaster management.", 
            tags: ["Disaster Response", "Information Architecture", "Scenario Mapping", "Ecosystem Design"], 
            role: "UX Designer, Information Architect",
            problem: "Communication and coordination issues in disaster management",
            research: "Data points prioritized and mapped to user needs",
            solution: "Information architecture and interface design",
            impact: "Emotional support and improved coordination",
            pdf: "assets/project-pdfs/Arohi.pdf", url: "https://www.behance.net/gallery/245227537/AROHI-Disaster-Management-Interface" 
          },

          { image: "assets/images/projects/suchalck_tileImage.png", 
            title: "Suchalak: Better Navigation", 
            date: "2025-09-04",
            description: "A navigation-focused case study exploring intuitive wayfinding.", 
            tags: ["Navigation", "Data Driven Design","UI Design", "Psychology"],
            role: "UX Researcher, Information Designer",
            problem: "Making navigation situationally aware",
            research: "Finding the right data points to improve navigation",
            solution: "Intuitive UI cues and information",
            impact: "Situationally aware navigation and improved user experience",
            pdf: "assets/project-pdfs/Suchalak.pdf", url: "https://www.behance.net/gallery/245164655/Suchalak" 
          },

          { image: "assets/images/projects/mae_tileImage.png", 
            title: "Mae: Virtual Mom", 
            date: "2026-08-19",
            description: "A virtual companion concept centered on everyday wellbeing support.", 
            tags: ["Digital Wellbeing", "UX Design","App UI", "User Research", "Data Analysis"], 
            role: "UX Designer, Researcher",
            problem: "Mood based food habits and wellbeing support for users",
            research: "Understanding user needs and preferences through interviews and surveys",
            solution: "A virtual companion app that provides personalized wellbeing support and guidance",
            impact: "Adjust cravings and improve overall wellbeing through personalized support and guidance",
            pdf: "assets/project-pdfs/Mae.pdf", url: "https://www.behance.net/gallery/254510655/Mae-Virtual-mom-who-takes-care-of-your-welbeing" 
          },

          { image: "assets/images/projects/dandelion_tileImage.png", 
            title: "Dandelion: To Break Your Overthinking", 
            date: "2026-09-13",
            status: "Completed",
            description: "A digital concept for helping people recognize and work through overthinking.", 
            tags: ["Quality of life", "Prototyping","Usability","Vibe coding"], 
            role: "UX Designer, Researcher, Prototyper",
            problem: "Helping users recognize and work through overthinking patterns",
            research: "Effective methods for identifying and addressing overthinking behaviors",
            solution: "Accessible and engaging digital tools for self-reflection and overthinking",
            impact: "Improved mental clarity and reduced overthinking through self-reflection and mindfulness practices",
            pdf: "assets/project-pdfs/Dandelion.pdf", url: "https://www.behance.net/gallery/255660865/Dandelion-to-break-your-overthinking" 
          },
        ],
      },
      {
        title: "UI Case Studies",
        items: [
          { image: "assets/images/projects/sruti_tileImage.png", 
            title: "Śruti: Corporate Learning Platform", 
            date: "2025-11-27",
            description: "A learning platform concept focused on access to corporate training.", 
            tags: ["Corporate Learning", "UI/UX Design","Design Thinking"], 
            role: "UX Designer, UI Designer, Researcher",
            problem: "Multiple tabs and scattered information leading to confusion and inefficiency in corporate learning",
            research: "Best practices for corporate learning platforms and user needs analysis",
            solution: "Cumulative learning platform with a unified interface and streamlined navigation",
            impact: "Improved learning outcomes and user satisfaction through a more intuitive and efficient learning experience",
            pdf: "assets/project-pdfs/Sruti.pdf", 
            url: "https://www.behance.net/gallery/246535769/Corporate-Learning-Platform" 
          },

          { image: "assets/images/projects/UniversalCalculator_tileImage.png", 
            title: "Universal Calculator", 
            date: "2024-04-29",
            description: "A flexible calculator interface for everyday calculations.", 
            tags: ["Utility", "UI Design"], 
            role: "UI Designer",
            problem: "Plain and unengaging calculator interfaces that lack flexibility and customization",
            research: "User needs and preferences for calculator interfaces, including common use cases and desired features",
            solution: "Tactile and visually engaging calculator interface",
            impact: "Improved user experience and engagement through a more flexible and customizable calculator interface",
            pdf: "assets/project-pdfs/UniversalCalculator.pdf", 
            url: "https://www.behance.net/gallery/224749961/Daily-UI-004" },
        ],
      },
      {
        title: "Data Visualization",
        items: [
          { image: "assets/images/projects/perfume_tileImage.png", 
            title: "What fragrances do college students prefer?", 
            date: "2026-07-19",
            description: "A data-led look at fragrance preferences among college students.", 
            tags: ["Student Preferences", "Data Visualization"], 
            role: "Information Designer",
            problem: "Preferences and trends in fragrance",
            research: "Pattern finding and data analysis of fragrance preferences among college students",
            solution: "Data visualization and insights into fragrance preferences",
            impact: "Most preferred fragrances and trends among college students, informing marketing and product development decisions",
            pdf: "assets/project-pdfs/Perfume.pdf", 
            url: "https://www.behance.net/gallery/252967607/What-fragrances-do-college-students-prefer" 
          },
          { image: "assets/images/projects/sagaram_tileImage.png", 
            title: "Sagarm: Effect of Ocean Acidification", 
            date: "2025-10-12",
            description: "A data visualization exploring the effects of ocean acidification.", 
            tags: ["Data Visualization", "Ocean Acidification"], 
            role: "Information Designer",
            problem: "Understanding the impact of ocean acidification on marine ecosystems and human communities",
            research: "Finding relevant data and analyzing the effects of ocean acidification on marine life and human communities",
            solution: "Data visualization and insights into the effects of ocean acidification",
            impact: "Enhanced understanding of the impacts of ocean acidification on marine and human communities",
            pdf: "assets/project-pdfs/Sagarm.pdf", 
            url: "https://www.behance.net/gallery/246071569/Effect-of-Ocean-Acidification" },
          {
            title: "The House of Belonging: ADHD Ecosystem Map",
            image: "assets/images/projects/house-of-belonging-tile.png",
            date: "2026-11-04",
            status: "In Progress",
            cardLabel: "Ecosystem Mapping",
            description: "An interactive ecosystem map showing closeness as rooms in a house.",
            tags: ["ADHD", "Ecosystem Mapping", "Information Design"],
            categories: ["Ecosystem Mapping", "Data Visualization"],
            role: "Information Designer",
            problem: "Making emotional closeness and masking visible in an ADHD ecosystem",
            research: "Mapping relationships by closeness, context, and emotional safety",
            solution: "An interactive top-view house map with explorable relationship layers",
            impact: "A clearer way to understand belonging, distance, and masking",
            page: "case-studies/The House of Belonging — ADHD ecosystem map (top view).html",
          },
        ],
      },
    ],
    // The final outlined "See more" card in the design.
    seeMore: { label: "See more on Behance", url: "https://www.behance.net/asawarisakhark" },
  },

  // ---- Medium Articles ---------------------------------------------------
  articles: {
    heading: "Latest from Medium",
    subheading: "Keep up with reading from my Medium",
    items: [
      {
        title: "Our Different Senses",
        excerpt: "When we understand an object through a different lens.",
        date: "Aug 9, 2026",
        // TODO: replace the profile URL with this article's direct URL.
        url: "https://medium.com/@asawarisakharkar2000",
        image: "assets/images/medium_imges/e257b2a72d0a35f8c6dfb072447f3f22.jpg",
      },
      {
        title: "The diffrences in design POV and strategy POV",
        excerpt: "When your design gets rejected because it has no selling point.",
        date: "July 12, 2026",
        // TODO: replace the profile URL with this article's direct URL.
        url: "https://medium.com/@asawarisakharkar2000",
        image: "assets/images/medium_imges/0_aGJIN3s4E_CcSgUX.webp",
      },
      {
        title: "10 Practices that helped me in my UX Summer Internship this year",
        excerpt: "The practices I picked up while working as a UX Design Intern at Cosmino (a startup) that helped me design and deliver better.",
        date: "June 27, 2026",
        // TODO: replace the profile URL with this article's direct URL.
        url: "https://medium.com/@asawarisakharkar2000",
        image: "assets/images/medium_imges/c893f0c327a7ac9697d56e08f8285203.jpg",
      },
    ],
  },

  // ---- My Experience (timeline) ------------------------------------------
  experience: {
    heading: "Professional Experience",
    // `current: true` gives the filled timeline dot (recent roles).
    items: [
      {
        role: "UX Designer/Researcher Intern",
        org: "Cosmino",
        duration: "April 2026 - June 2026",
        location: "Pune",
        // current: true,
        description: [
          "Conducted 15+ semi-structured user interviews to investigate product strong points and expectation for the product background.",
          "Synthesized interview findings into 4 primary user segments and end-to-end journey maps, surfacing patterns across complex workflows for cross-functional stakeholders",
          "Translated research insight into 20+ redesigned website pages, improving information hierarchy and content discoverability based on evidence rather than assumption.",
          "Designed 30+ mobile app screens by translating research findings directly into interaction flows and feature recommendations that shaped product roadmap decisions.",
          "Built the Business Model Canvas and partnered with 3 cross-functional teams to connect research findings to business and marketing strategy",
        ],
      },
      {
        role: "UX Design Consultant",
        org: "Saarogya",
        duration: "Feb 2026 - July 2026",
        location: "Pune",
        // current: true,
        description: [
          "Support design and product decisions by aligning them with the organization's vision.",
          "Contribute to the UX and Human-Centered Design (HCD) of Nitya Karma and 16 Points.",
          "Lead the redesign of the company website to improve user experience and engagement.",
        ],
      },
      {
        role: "UI / UX Designer Intern",
        org: "Diginovators",
        duration: "Mar 2024 - June 2024",
        location: "Pune",
        description: [
          "Designed responsive web interfaces for 2 client projects, working directly with project managers and senior designers",
          "Presented design concepts and research rationale during review sessions, incorporating stakeholder feedback across 4+ iterations",
          "Created 15+ wireframes and high-fidelity prototypes throughout a structured design-thinking process",
        ],
      },
      {
        role: "UI Developer",
        org: "Red Nucleus",
        duration: "May 2022 - April 2024",
        location: "Pune",
        description: [
          "Built and maintained 25+ e-learning modules for global pharmaceutical clients, working within strict compliance, accessibility, and multi-market localization constraints",
          "Performed systematic QA across desktop, mobile, and tablet devices, identifying and resolving 100+ usability and responsiveness issues",
          "Collaborated daily with designers, developers, and QA specialists, translating design intent into production-ready outcomes",
        ],
      },
    ],
  },

  // ---- My Education (timeline) -------------------------------------------
  education: {
    heading: "Academic Background",
    items: [
      {
        institute: "MIT Institute of Design, Pune",
        degree: "Master's of Design (MDes)",
        program: "Information Design and Data Visualization",
        coursework: ["Information Design", "Data Visualization", "Design Research", "Design Strategy"],
        period: "July 2024 - July 2027",
        location: "Pune, Maharashtra",
        current: true,
      },
      {
        institute: "Edit Institute, Pune",
        degree: "Diploma of Designing",
        program: "UI/UX Designing",
        coursework: ["Fintech Design", "Design Thinking", "User Experience Design","User Interface Design"],
        period: "July 2023 - Dec 2023",
        location: "Pune, Maharashtra",
      },
      {
        institute: "Vishwakarma Institute of Technology, Pune",
        degree: "Bachelor's of Technology (BTech)",
        program: "Electronics Engineering",
        coursework: ["Machine Learning", "Neural Networks", "Internet of Things"],
        period: "Aug 2018 - Aug 2022",
        location: "Pune, Maharashtra",
      },
    ],
  },

  // ---- Fashion gallery (horizontal scroll) -------------------------------
  fashion: {
    heading: "About Me",
    greeting: "Hi, I'm Asawari.",
    aboutImage: "assets/images/portrait/Group 19.png",
    aboutImageAlt: "Portrait of Asawari",
    paragraphs: [
      "I’m an information and UX designer who started out as an engineer. I studied Electronics Engineering, then spent two years as a UI developer building e-learning modules for pharmaceutical clients. That’s where I learned how products get built, how much detail goes into making complex content clear, and why a design has to work across devices and users, not just look good in a mockup.",
      "I’m now pursuing my Master of Design in Information Design & Data Visualization at MIT Institute of Design, where I focus on turning complex information into experiences people can understand and act on.",
      "My process starts with people. I use interviews, diary studies, and usability testing to find out what’s actually happening before I decide what to design. I map journeys and structure information so the logic is sound, then prototype and test until the design holds up. Because I’ve written front-end code myself, I design with implementation in mind and can talk to developers in their own terms.",
      "I bring a researcher’s curiosity, a systems-thinker’s structure, and a developer’s practicality to every project.",
    ],
    booksHeading: "Books that I have read and loved",
    subheading: "Outfit that speak my style and personality",
    outfitIntro:
      "A collection of looks that capture my personal style, from everyday favorites to pieces I love experimenting with.",
    books: [
      {
        title: "The Creative Act: A Way of Being",
        image: "assets/images/book-covers/image.png",
      },
      {
        title: "The Wedding Dress",
        image: "assets/images/book-covers/image-1.png",
      },
      {
        title: "The Palace of Illusions",
        image: "assets/images/book-covers/image-2.png",
      },
      {
        title: "Memoirs of a Geisha",
        image: "assets/images/book-covers/image-3.png",
      },
      {
        title: "The Alchemist",
        image: "assets/images/book-covers/image-4.png",
      },
      {
        title: "Deception Point",
        image: "assets/images/book-covers/image 60.png",
      },
      {
        title: "Harry Potter and the Cursed Child",
        image: "assets/images/book-covers/image-1a.png",
      },
      {
        title: "Krishna: Life and Song of the Blue God",
        image: "assets/images/book-covers/image-2c.png",
      },
      {
        title: "The Last Queen",
        image: "assets/images/book-covers/image-3g.png",
      },
      {
        title: "The Kite Runner",
        image: "assets/images/book-covers/image-4s.png",
      },
      {
        title: "The Book of Ichigo Ichie",
        image: "assets/images/book-covers/image-5.png",
      },
      {
        title: "The Legend of Parshu-Raam",
        image: "assets/images/book-covers/image-7.png",
      },
      {
        title: "Vishwamitra",
        image: "assets/images/book-covers/image-8.png",
      },
      {
        title: "Dollar Bahu",
        image: "assets/images/book-covers/image-9.png",
      },
      {
        title: "Three Thousand Stitches",
        image: "assets/images/book-covers/image-10.png",
      },
      {
        title: "Mahashweta",
        image: "assets/images/book-covers/image-11.png",
      },
      {
        title: "Valmiki's Women",
        image: "assets/images/book-covers/image-12.png",
      },
      {
        title: "Cosmos",
        image: "assets/images/book-covers/image-14.png",
      },
      {
        title: "Devi Purana",
        image: "assets/images/book-covers/image-15.png",
      },
      {
        title: "Taiwan Travelogue",
        image: "assets/images/book-covers/image-16.png",
      },
      {
        title: "Here, There and Everywhere",
        image: "assets/images/book-covers/image-17.png",
      },
      {
        title: "The Courage to Be Disliked",
        image: "assets/images/book-covers/image-18.png",
      },
      {
        title: "White Elephant",
        image: "assets/images/book-covers/image-19.png",
      },
      {
        title: "The Forest of Enchantments",
        image: "assets/images/book-covers/image-20.png",
      },
      {
        title: "The Diary of a Young Girl",
        image: "assets/images/book-covers/image-21.png",
      },
      {
        title: "Kaizen",
        image: "assets/images/book-covers/imagea.png",
      },
      {
        title: "Fooled By Randomness",
        image: "assets/images/book-covers/image_10.png",
      },
      {
        title: "Verity",
        image: "assets/images/book-covers/verity.png",
      },
      {
        title: "LSC",
        image: "assets/images/book-covers/LSC.png",
      },
    ],
    // Portrait images scroll horizontally in an auto-moving carousel.
    // Add/remove freely — file names are URL-encoded automatically in main.js.
    photos: [
      { image: "assets/images/outfits/PXL_20250513_092102550.jpg", alt: "Outfit check" },
      { image: "assets/images/outfits/PXL_20250702_120640103~2.jpg", alt: "Outfit check" },
      { image: "assets/images/outfits/PXL_20250704_091924545.jpg", alt: "Outfit check" },
      { image: "assets/images/outfits/PXL_20250706_072907889.jpg", alt: "Outfit check" },
      { image: "assets/images/outfits/PXL_20250914_093009357.jpg", alt: "Outfit check" },
      { image: "assets/images/outfits/PXL_20250914_093252510.jpg", alt: "Outfit check" },
      { image: "assets/images/outfits/PXL_20251121_060315568.jpg", alt: "Outfit check" },
      { image: "assets/images/outfits/PXL_20251121_100308571.MP.jpg", alt: "Outfit check" },
      { image: "assets/images/outfits/PXL_20251219_114134998.MP~2.jpg", alt: "Outfit check" },
      { image: "assets/images/outfits/PXL_20260414_041024176.MP.jpg", alt: "Outfit check" },
      { image: "assets/images/outfits/PXL_20260507_063136141.jpg", alt: "Outfit check" },
      { image: "assets/images/outfits/PXL_20260510_032905458.MP.jpg", alt: "Outfit check" },
      { image: "assets/images/outfits/PXL_20260525_105654420.jpg", alt: "Outfit check" },
      { image: "assets/images/outfits/PXL_20260601_080635618.jpg", alt: "Outfit check" },
    ],
  },

  // ---- Let's Connect (footer) --------------------------------------------
  connect: {
    heading: "Hiring for UX or Information Design? Let's talk.",
    email: "asawarisakharkar2000@gmail.com",
    // Right-hand quick links with a diagonal arrow, as in the design.
    links: [
      { label: "Medium Articles", url: "https://medium.com/@asawarisakharkar2000" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/asawari-sakharkar-0861b3300/" },
    ],
  },
};
