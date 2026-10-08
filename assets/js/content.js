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
    resumeFile: "assets/resume.pdf",
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

  // ---- My Skills -------------------------------------------------------
  expertise: {
    heading: "My Skills",
    groups: ["Research", "Design", "Data & Visualization", "Prototyping & Tools"],
    // accent:true renders the outlined pill style ("And an outfit planner").
    tags: [
      { label: "Data Driven Design", group: "Data & Visualization" },
      { label: "Design Thinking", group: "Design" },
      { label: "Design Strategy", group: "Design" },
      { label: "User Research", group: "Research" },
      { label: "UX Writing", group: "Design" },
      { label: "Psychology", group: "Research" },
      { label: "Accessibility", group: "Research" },
      { label: "UX Design", group: "Design" },
     // { label: "And an Outfit Planner", accent: true },
    ],
    impact: [
      { metric: "15+ User interviews", caption: "Converting interview insights into user segment and journey map" },
      { metric: "30+ App screens", caption: "Original ideas, redesign, prototyping which are up and running" },
      { metric: "20+ Website pages", caption: "Live project, client work and web-app design" },
      { metric: "Cross-functional collaboration", caption: "Experienced working with diverse teams, stakeholders, developers and designers" },
    ],
  },

  // ---- My Projects --------------------------------------------------------
  projects: {
    heading: "Products I've Worked On",
    // Each category has a subtitle and a live case-study count.
    categories: [
      {
        title: "UX Case Studies",
        items: [
          { image: "assets/images/projects/Arohi_tileImage.png", title: "Arohi: Disaster Management Interface", description: "A case study exploring a clearer interface for disaster management.", tags: ["Disaster Response", "Information Architecture", "Scenario Mapping", "Ecosystem Design"], pdf: "assets/project-pdfs/Arohi.pdf", url: "https://www.behance.net/gallery/245227537/AROHI-Disaster-Management-Interface" },
          { image: "assets/images/projects/suchalck_tileImage.png", title: "Suchalak: Better Navigation", description: "A navigation-focused case study exploring intuitive wayfinding.", tags: ["Navigation", "Data Driven Design","UI Design", "Psychology"],pdf: "assets/project-pdfs/Suchalak.pdf", url: "https://www.behance.net/gallery/245164655/Suchalak" },
          { image: "assets/images/projects/mae_tileImage.png", title: "Mae: Virtual Mom", description: "A virtual companion concept centered on everyday wellbeing support.", tags: ["Digital Wellbeing", "UX Design","App UI", "User Research", "Data Analysis"], pdf: "assets/project-pdfs/Mae.pdf", url: "https://www.behance.net/gallery/254510655/Mae-Virtual-mom-who-takes-care-of-your-welbeing" },
          { image: "assets/images/projects/dandelion_tileImage.png", title: "Dandelion: To Break Your Overthinking", description: "A digital concept for helping people recognize and work through overthinking.", tags: ["Quality of life", "Prototyping","Usability","Vibe coding"], pdf: "assets/project-pdfs/Dandelion.pdf", url: "https://www.behance.net/gallery/255660865/Dandelion-to-break-your-overthinking" },
        ],
      },
      {
        title: "UI Case Studies",
        items: [
          { image: "assets/images/projects/sruti_tileImage.png", title: "Śruti: Corporate Learning Platform", description: "A learning platform concept focused on access to corporate training.", tags: ["Corporate Learning", "UI/UX Design","Design Thinking"], pdf: "assets/project-pdfs/Sruti.pdf", url: "https://www.behance.net/gallery/246535769/Corporate-Learning-Platform" },
          { image: "assets/images/projects/UniversalCalculator_tileImage.png", title: "Universal Calculator", description: "A flexible calculator interface for everyday calculations.", tags: ["Utility", "UI Design"], pdf: "assets/project-pdfs/UniversalCalculator.pdf", url: "https://www.behance.net/gallery/224749961/Daily-UI-004" },
        ],
      },
      {
        title: "Data Visualization",
        items: [
          { image: "assets/images/projects/perfume_tileImage.png", title: "What fragrances do college students prefer?", description: "A data-led look at fragrance preferences among college students.", tags: ["Student Preferences", "Data Visualization"], pdf: "assets/project-pdfs/Perfume.pdf", url: "https://www.behance.net/gallery/252967607/What-fragrances-do-college-students-prefer" },
          { image: "assets/images/projects/sagaram_tileImage.png", title: "Sagarm: Effect of Ocean Acidification", description: "A data visualization exploring the effects of ocean acidification.", tags: ["Data Visualization", "Ocean Acidification"], pdf: "assets/project-pdfs/Sagarm.pdf", url: "https://www.behance.net/gallery/246071569/Effect-of-Ocean-Acidification" },
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
        date: "[Add publication date]",
        // TODO: replace the profile URL with this article's direct URL.
        url: "https://medium.com/@asawarisakharkar2000",
        image: "assets/images/medium_imges/e257b2a72d0a35f8c6dfb072447f3f22.jpg",
      },
      {
        title: "The diffrences in design POV and strategy POV",
        excerpt: "When your design gets rejected because it has no selling point.",
        date: "[Add publication date]",
        // TODO: replace the profile URL with this article's direct URL.
        url: "https://medium.com/@asawarisakharkar2000",
        image: "assets/images/medium_imges/0_aGJIN3s4E_CcSgUX.webp",
      },
      {
        title: "10 Practices that helped me in my UX Summer Internship this year",
        excerpt: "The practices I picked up while working as a UX Design Intern at Cosmino.",
        date: "[Add publication date]",
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
        description: [
          "Built and maintained 25+ e-learning modules for global pharmaceutical clients, working within strict compliance, accessibility, and multi-market localization constraints",
          "Performed systematic QA across desktop, mobile, and tablet devices, identifying and resolving 100+ usability and responsiveness issues",
          "Collaborated daily with designers, developers, and QA specialists, translating design intent into production-ready outcomes",
          "Contributed to design decisions on typography, spacing, color, and accessibility standards to protect consistency at scale",
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
      "I design things for a living, but I live for three obsessions: <strong>fashion, fiction, and food.</strong>",
      "One minute I'm deciding whether an outfit needs one more layer, the next I'm three chapters deep in a book I swore I'd only \"start,\" and somewhere in between I'm planning my next meal like it's a strategic operation. My wardrobe, my bookshelf, and my camera roll of dinners have a lot in common: all curated, slightly out of control, and always making room for one more.",
      "Fashion taught me that the right details change everything. Books taught me that every detail tells a story. Food taught me that the best things are made with care and meant to be shared. Together, they're why I notice what others scroll past: the stitching, the sentence, the pinch of spice that makes something feel <em>intentional</em>.",
      "If you see me with a tote bag, a paperback, and a snack, yes, that's the whole personality. No, I won't be taking questions (unless it's about where to eat).",
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
    heading: "Hiring for UX or information design? Let's talk.",
    email: "asawarisakharkar2000@gmail.com",
    // Right-hand quick links with a diagonal arrow, as in the design.
    links: [
      { label: "Medium Articles", url: "https://medium.com/@asawarisakharkar2000" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/asawari-sakharkar-0861b3300/" },
    ],
  },
};
