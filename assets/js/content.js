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
      "Portfolio of Asawari Sakharkar — Information Designer, UX Researcher, and problem solver.",
    favicon: "assets/favicononinini.jpeg",
  },

  // ---- Header -------------------------------------------------------------
  header: {
    resumeLabel: "Resume",
    resumeFile: "assets/resume/Asawari_Sakharkar_Resume.pdf",
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
    label: "INFORMATION DESIGNER | UX RESEARCHER",
    greeting: "Hello~",
    name: "I am Asawari Sakharkar",
    tagline:
      "Information designer with a background in UX Research, Data Visualization, and Front-end Development, working across research, design, and product.",
    subtitle: "I turn ambiguous problems into evidence, and evidence into product decisions.",
    // Tip: in Figma, select the whole locket group ("Group 32") and export it
    // as ONE transparent PNG for the cleanest result, then point to it here.
    image: "assets/images/Group 32.png",
    imageAlt: "An open locket showing two photos of Asawari",
  },

  // ---- My Skills -------------------------------------------------------
  expertise: {
    heading: "My Skills",
    // accent:true renders the outlined pill style ("And an outfit planner").
    tags: [
      { label: "Data Driven Design" },
      { label: "Design Thinking" },
      { label: "Design Strategy" },
      { label: "User Research" },
      { label: "UX Writing" },
      { label: "Psychology" },
      { label: "Accessibility" },
      { label: "UX Design" },
     // { label: "And an Outfit Planner", accent: true },
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
          { image: "assets/images/projects/Arohi_tileImage.png", title: "Arohi: Disaster Management Interface", url: "https://www.behance.net/gallery/245227537/AROHI-Disaster-Management-Interface" },
          { image: "assets/images/projects/suchalck_tileImage.png", title: "Suchalak: Better Navigation", url: "https://www.behance.net/gallery/245164655/Suchalak" },
          { image: "assets/images/projects/mae_tileImage.png", title: "Mae: Virtual Mom", url: "https://www.behance.net/gallery/254510655/Mae-Virtual-mom-who-takes-care-of-your-welbeing" },
          { image: "assets/images/projects/dandelion_tileImage.png", title: "Dandelion: To Break Your Overthinking", url: "https://www.behance.net/gallery/255660865/Dandelion-to-break-your-overthinking" },
        ],
      },
      {
        title: "UI Case Studies",
        items: [
          { image: "assets/images/projects/sruti_tileImage.png", title: "Śruti: Corporate Learning Platform", url: "https://www.behance.net/gallery/246535769/Corporate-Learning-Platform" },
          { image: "assets/images/projects/UniversalCalculator_tileImage.png", title: "Universal Calculator", url: "https://www.behance.net/gallery/224749961/Daily-UI-004" },
        ],
      },
      {
        title: "Data Visualization",
        items: [
          { image: "assets/images/projects/sagaram_tileImage.png", title: "Sagarm: Effect of Ocean Acidification", url: "https://www.behance.net/gallery/246071569/Effect-of-Ocean-Acidification" },
          { image: "assets/images/projects/perfume_tileImage.png", title: "What fragrances do college students prefer?", url: "https://www.behance.net/gallery/252967607/What-fragrances-do-college-students-prefer" },
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
        // excerpt: "When we understand an object through a different lens.",
        url: "https://medium.com/@asawarisakharkar2000",
        image: "assets/images/medium_imges/e257b2a72d0a35f8c6dfb072447f3f22.jpg",
      },
      {
        title: "The diffrences in design POV and strategy POV",
        // excerpt: "When your design gets rejected because it has no selling point.",
        url: "https://medium.com/@asawarisakharkar2000",
        image: "assets/images/medium_imges/0_aGJIN3s4E_CcSgUX.webp",
      },
      {
        title: "10 Practices that helped me in my UX Summer Internship this year",
        // excerpt: "The practices I picked up while working as a UX Design Intern at Cosmino.",
        url: "https://medium.com/@asawarisakharkar2000",
        image: "assets/images/medium_imges/c893f0c327a7ac9697d56e08f8285203.jpg",
      },
    ],
  },

  // ---- My Experience (timeline) ------------------------------------------
  experience: {
    heading: "My Experience",
    // `current: true` gives the filled timeline dot (recent roles).
    items: [
      {
        role: "UX Design Consultant",
        org: "Saarogya",
        duration: "Feb 2026 - July 2026",
        // current: true,
        description:
          "At Saarogya, I support design and product decisions by aligning them with the organization's vision. I contribute to the UX and Human-Centered Design (HCD) of Nitya Karma and 16 Points, while also leading the redesign of the company website to enhance user experience and engagement.",
      },
      {
        role: "UX Designer/Researcher",
        org: "Cosmino",
        duration: "April 2026 - June 2026",
        // current: true,
        description:
          "Contributed to early-stage product development through user research, competitive analysis, user testing, go-to-market planning, marketing and outreach strategy, and brand development.",
      },
      {
        role: "UI / UX Designer",
        org: "Diginovators",
        duration: "Mar 2024 - June 2024",
        description:
          "I collaborated with the project manager and senior designers to create web pages for a client. I participated in multiple stages of the design thinking process, from initial ideas to the final prototype.",
      },
      {
        role: "UI Developer",
        org: "Red Nucleus",
        duration: "May 2022 - April 2024",
        description:
          "I contributed to the development and improvement of e-learning modules for pharmaceutical companies. I worked with a team of developers to implement design specifications and write code.",
      },
    ],
  },

  // ---- My Education (timeline) -------------------------------------------
  education: {
    heading: "My Education",
    items: [
      {
        institute: "MIT Institute of Design, Pune",
        program: "Information Design and Data Visualization",
        period: "July 2024 - July 2027",
        location: "Pune, Maharashtra",
        current: true,
      },
      {
        institute: "Edit Institute, Pune",
        program: "Diploma in UI/UX Designing",
        period: "July 2023 - Dec 2023",
        location: "Pune, Maharashtra",
      },
      {
        institute: "Vishwakarma Institute of Technology, Pune",
        program: "BTech Electronics Engineering",
        period: "Aug 2018 - Aug 2022",
        location: "Pune, Maharashtra",
      },
    ],
  },

  // ---- Fashion gallery (horizontal scroll) -------------------------------
  fashion: {
    heading: "When I am not designing I explore Fashion",
    subheading: "My Outfit Checks!",
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
    heading: "Let's Connect",
    email: "asawarisakharkar2000@gmail.com",
    // Right-hand quick links with a diagonal arrow, as in the design.
    links: [
      { label: "Medium Articles", url: "https://medium.com/@asawarisakharkar2000" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/asawari-sakharkar-0861b3300/" },
    ],
  },
};
