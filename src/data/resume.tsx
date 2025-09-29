import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, Gamepad2Icon } from "lucide-react";

export const DATA = {
  name: "Naoise Law",
  initials: "NL",
  url: "https://naoise.io",
  location: "London, UK / Dublin, Ireland",
  locationLink: "https://www.google.com/maps/place/london",
  description:
    "MSc student at LSE specializing in AI and Digital Innovation. Passionate about using technology to solve complex business problems and automate processes.",
  summary:
    "I'm currently pursuing my MSc in Managing Information Systems and Digital Innovation at the London School of Economics, focusing on how AI tools can transform business processes. My dissertation explored how AI tools impact software developers' workflows, involving extensive research with programmers on tool integration and workflow optimization. Previously, I worked in private equity at SEIC, where I supervised five funds and built predictive analytics dashboards. My diverse background spans finance, audit, and operations, where I consistently identified inefficiencies and built solutions - from creating tracking tools for 16-entity audits at Grant Thornton to managing large-scale events at Dublin Fringe Festival hosting 8,000+ guests. I'm passionate about the intersection of technology and business, particularly in making processes more efficient through automation and AI.",
  avatarUrl: "/naoise.png",
  skills: [
    "Python",
    "AI/ML Tools",
    "Salesforce CRM",
    "Advanced Excel",
    "SQL",
    "Data Analytics",
    "Google Analytics",
    "Adobe Creative Suite",
    "Process Automation",
    "Workday",
    "Microsoft Office Suite",
    "Canva",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "http://localhost:3001/simulator", icon: Gamepad2Icon, label: "3D Simulator" },
  ],
  contact: {
    email: "Lawnaoise@gmail.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/naoiselaw",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/naoise-law",
        icon: Icons.linkedin,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:Lawnaoise@gmail.com",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "SEIC",
      href: "https://www.seic.com",
      badges: [],
      location: "Dublin, Ireland",
      title: "Private Equity Fund Analyst",
      logoUrl: "/seic.png",
      start: "January 2024",
      end: "July 2024",
      description:
        "Supervised and analyzed five private equity funds, preparing NAVs and performance reports. Led client meetings, presenting fund analysis to senior staff, owners, and investors. Built predictive analytics dashboards and automated reporting processes.",
    },
    {
      company: "Bank of Ireland",
      badges: [],
      href: "https://www.bankofireland.com",
      location: "Dublin, Ireland",
      title: "Legal Administrator",
      logoUrl: "/boi.png",
      start: "August 2023",
      end: "January 2024",
      description:
        "Managed mortgage transition project from KBC acquisition with 99.5% data integrity. Reviewed and onboarded security clearances across multiple internal systems. Identified risks and recommended remediation strategies.",
    },
    {
      company: "EPIC - Empowering People in Care",
      href: "https://www.epiconline.ie",
      badges: [],
      location: "Dublin, Ireland",
      title: "Advocacy Administrator",
      logoUrl: "/epic.png",
      start: "May 2023",
      end: "August 2023",
      description:
        "Managed external request system directing resources for children in care. Conducted research, data analysis, and report writing for evidence-based recommendations. Improved internal processes and maintained Salesforce CRM database.",
    },
    {
      company: "Grant Thornton Ireland",
      href: "https://www.grantthornton.ie",
      badges: [],
      location: "Dublin, Ireland",
      title: "Assurance Trainee",
      logoUrl: "/grantthornton.png",
      start: "January 2022",
      end: "January 2023",
      description:
        "Audited multinational datacenter manufacturer across Ireland and UK. Developed Excel tracking tool for 16-entity workflows improving audit efficiency. Presented financial reports and strategies in client meetings.",
    },
    {
      company: "Dublin Fringe Festival",
      href: "https://www.fringefest.com",
      badges: [],
      location: "Dublin, Ireland",
      title: "Chief Steward & Production Assistant",
      logoUrl: "/fringe.png",
      start: "2017",
      end: "2023",
      description:
        "Managed teams for Garden of Shadows Exhibition hosting 8,000+ guests over 12 days across 1.5km venue. Led production for multiple shows including set design and volunteer coordination. Conducted risk assessments and ensured safety compliance.",
    },
    {
      company: "Royal St. George Yacht Club",
      href: "https://www.rsgyc.ie",
      badges: [],
      location: "Dublin, Ireland",
      title: "Barman & Event Coordinator",
      logoUrl: "/rsgyc.png",
      start: "2018",
      end: "2021",
      description:
        "Managed teams during large regattas and events. Trained new employees and conducted full stock takes. Delivered high-standard service in members-only environment.",
    },
  ],
  education: [
    {
      school: "London School of Economics",
      href: "https://www.lse.ac.uk",
      degree: "MSc Managing Information Systems and Digital Innovation",
      logoUrl: "/lse.png",
      start: "2024",
      end: "2025",
    },
    {
      school: "Trinity College Dublin",
      href: "https://www.tcd.ie",
      degree: "BSc (Hons) Business and Economics - Grade 2.1",
      logoUrl: "/tcd.png",
      start: "2017",
      end: "2021",
    },
    {
      school: "The High School Rathgar",
      href: "https://www.thehighschool.ie",
      degree: "Leaving Certificate - 500+ points",
      logoUrl: "/highschool.png",
      start: "2011",
      end: "2017",
    },
    {
      school: "Google & Professional Certifications",
      href: "#",
      degree: "Digital Marketing, Analytics, Ads Display Certifications",
      logoUrl: "/google.png",
      start: "2022",
      end: "2024",
    },
  ],
  projects: [
    {
      title: "AI Tools Impact on Software Developers",
      href: "#",
      dates: "May 2024 - September 2024",
      active: true,
      description:
        "Master's dissertation researching how AI tools transform developer workflows. Interviewed 20+ programmers, analyzed tool integration patterns, and identified best practices for AI augmentation in software development. Created framework for optimal AI tool adoption.",
      technologies: [
        "Python",
        "Qualitative Analysis",
        "Research Methods",
        "AI Tools",
      ],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Private Equity Analytics Dashboard",
      href: "#",
      dates: "March 2024 - July 2024",
      active: true,
      description:
        "Built predictive analytics dashboard for 5 PE funds at SEIC, reducing reporting time by 60%. Automated NAV calculations and performance metrics. Integrated multiple data sources for real-time fund monitoring.",
      technologies: [
        "Excel",
        "VBA",
        "Data Visualization",
        "Financial Modeling",
      ],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Multi-Entity Audit Tracker",
      href: "#",
      dates: "April 2022 - December 2022",
      active: true,
      description:
        "Developed Excel-based tracking system for 16-entity audit at Grant Thornton. Streamlined workflow management, reducing coordination time by 40%. Adopted by entire audit team of 8 members.",
      technologies: [
        "Advanced Excel",
        "VBA",
        "Process Design",
      ],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Festival Operations Platform",
      href: "#",
      dates: "2019 - 2023",
      active: true,
      description:
        "Managed operations for 8,000+ guest events at Dublin Fringe Festival. Implemented digital scheduling and volunteer coordination systems. Led teams of 20+ staff across 1.5km venue.",
      technologies: [
        "Project Management",
        "Operations",
        "Team Leadership",
      ],
      links: [],
      image: "",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "LSE Digital Innovation Challenge",
      dates: "October 2024",
      location: "London, UK",
      description:
        "Developed an AI-powered solution for automating financial compliance checks. Our team created a prototype that reduced manual review time by 70% using NLP and machine learning.",
      image: "/lse-hackathon.png",
      win: "Top 10 Finalist",
      links: [],
    },
  ],
} as const;
