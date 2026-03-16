import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";
import { SVGProps } from "react";
import React from "react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";

type SvgIcon = (props: SVGProps<SVGSVGElement>) => React.ReactElement;
type SkillItem = { name: string; icon: string | SvgIcon | null };
type SkillGroup = { category: string; items: SkillItem[] };

export const DATA = {
  name: "Aman Ranjan",
  initials: "AR",
  url: "https://amanranjan.vercel.app",
  location: "LPU, Jalandhar, Punjab",
  locationLink: "https://maps.app.goo.gl/hwYQb31GprBiMZk1A",
  coordinates: { lat: 31.256590055182514, lng: 75.70837359564838}, 
  description: "Software Developer • Web Developer",
  summary:
    "I'm a computer science student who enjoys understanding how systems actually work and building software that is structured, efficient, and scalable. Most of my time goes into exploring data structures, algorithms, and backend logic, and I like breaking down complex problems into simple, logical solutions. I'm interested in writing clean code, understanding the deeper side of technology, and continuously improving how I design and build software.",
  avatarUrl: "/me.jpg",
  skills: [
    {
      category: "Programming Languages",
      items: [
        { name: "Java", icon: Java },
        { name: "Python", icon: Python },
        { name: "C/C++", icon: "skillIcon/cpp.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", icon: Typescript },
        { name: "SQL", icon: "skillIcon/sql.png" },
      ],
    },
    {
      category: "Frontend",
      items: [
        { name: "React", icon: ReactLight },
        { name: "Next.js", icon: NextjsIconDark },
        { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
        { name: "Recoil", icon: "skillIcon/recoil.svg" },
        { name: "React Query", icon: "skillIcon/reactquery.svg" },
        { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      ],
    },
    {
      category: "Backend & Database",
      items: [
        { name: "Node.js", icon: "skillIcon/nodejs.svg" },
        { name: "Django", icon: "skillIcon/django.svg" },
        { name: "Express.js", icon: "skillIcon/ex.png" },
        { name: "WebSockets", icon: "skillIcon/websocket.png" },
        { name: "REST APIs", icon: "skillIcon/rest-api-icon.svg" },
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "PostgreSQL", icon: Postgresql },
        { name: "Prisma", icon: "skillIcon/prisma.svg" },
        { name: "JWT", icon: "skillIcon/jwt-3.svg" },
      ],
    },
    {
      category: "Dev Tools & Architecture",
      items: [
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "Postman", icon: "skillIcon/postman.svg" },
        { name: "Docker", icon: Docker },
        { name: "Kubernetes", icon: Kubernetes },
        { name: "Turborepo", icon: "skillIcon/turborepo.svg" },
        { name: "VS Code", icon: "skillIcon/vscode.svg" },
      ],
    },
    {
      category: "Soft Skills",
      items: [
        { name: "Problem Solving", icon: null },
        { name: "Critical Thinking", icon: null },
        { name: "Team Player", icon: null },
        { name: "Adaptability", icon: null },
        { name: "Quick Learner", icon: null },
        { name: "Collaborative Mindset", icon: null },
      ],
    },
  ] as SkillGroup[],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
  ],
  contact: {
    email: "amanranjan.work@outlook.com",
    tel: "+91 852 987 1980",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/amanrj03",
        icon: Icons.github,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/amanranjan03",
        icon: Icons.linkedin,
      },
      X: {
        name: "X",
        url: "https://twitter.com/amanrj03",
        icon: Icons.x,
      },
    },
  },
  work: [
    {
      company: "Atomic Finance",
      href: "https://atomic.finance",
      badges: [],
      location: "Remote",
      title: "Bitcoin Protocol Engineer",
      logoUrl: "/atomic.png",
      start: "May 2021",
      end: "Oct 2022",
      description:
        "Implemented the Bitcoin discreet log contract (DLC) protocol specifications as an open source Typescript SDK. Dockerized all microservices and setup production kubernetes cluster. Architected a data lake using AWS S3 and Athena for historical backtesting of bitcoin trading strategies. Built a mobile app using react native and typescript.",
    },
  ],
  education: [
    {
      key: 1,
      school: "Lovely Professional University",
      href: "https://lpu.in",
      degree: "B.Tech in Computer Science and Engineering",
      logoUrl: "/lpu.webp",
      start: "2023",
      end: "2027",
    },
    {
      key: 2,
      school: "Vijay Laxmi Memorial Public School",
      href: "https://vlmschool.com/",
      degree: "Senior Secondary Certificate (Class 12th)",
      logoUrl: "/vlm.png",
      start: null,
      end: "2021",
    },
    {
      key: 3,
      school: "Vijay Laxmi Memorial Public School",
      href: "https://vlmschool.com/",
      degree: "Secondary School Certificate (Class 10th)",
      logoUrl: "/vlm.png",
      start: null,
      end: "2019",
    },
  ],
  projects: [
    {
      title: "Baba Mobiles",
      dates: "Jan 2026 - Feb 2026",
      description:"Architected a comprehensive e-commerce solution for mobile phone sales incorporating user authentication, product catalog management, shopping cart, secure checkout, and order tracking capabilities. ",
      technologies: ["React.js", "Django", "PostgreSQL", "TailwindCSS", "JWT", "JavaScript"],
      links: [
        { type: "Source", href: "https://github.com/amanrj03/Baba-Mobile", working: true },],
      image: "mobilestore.png",
      video: "",
    },
    {
      title: "Momentum",
      dates: "Oct 2025 - Dec 2025",
      description: "Designed and developed a scalable online video directory platform to showcase and discover entrepreneurial journeys through structured, role-based content. ",
      technologies: ["React.js", "Typescript", "PostgreSQL", "Prisma", "TailwindCSS", "Express.js", "JWT"],
      links: [ { type: "Source", href: "https://github.com/amanrj03/Momentun", working: true },
      ],
      image: "momentum2.png",
      video: "",
    },
    {
      title: "Sunny Chat",
      dates: "Aug 2025 - Sep 2025",
      description:
        "Built Sunny Chat, a secure end-to-end encrypted messaging app focused on privacy-first real-time communication.",
      technologies: ["React.js", "Typescript","Express.js", "PostgreSQL", "Prisma", "TailwindCSS", "WebSocket", "Libsodium-wrappers"],
      links: [
        { type: "Source", href: "https://github.com/amanrj03/Chat-App", working: true },
      ],
      image: "sunnychat.png",
      video: "",
    },
    {
      title: "Zephyr Groups",
      dates: "Mar 2025 - Apr 2025",
      description:
        "Constructed a robust feedback management system for power supply issues, featuring secure dual-authentication and role-based access for streamlined resolution tracking. ",
      technologies: ["PHP", "SQL", "JavaScript", "HTML", "Tailwind CSS", "Google OAuth"],
      links: [{ type: "Source", href: "https://github.com/Aman-Ranjan-003/feedback_system", working: true }],
      image: "zephyr.png",
      video: "",
    },
  ],
  certificates: [
    {
      title: "Web Development and DevOps",
      organization: "100xDEVS",
      logoUrl: "/100xdev.png",
      issued: "May 2025",
      pdfUrl: "/certificates/100xdevs.pdf",
    },
    {
      title: "Next.js",
      organization: "Udemy",
      logoUrl: "/udemy.png",
      issued: "March 2026",
      pdfUrl: "/certificates/nextjs.pdf",
    },
    {
      title: "Python and Django",
      organization: "Udemy",
      logoUrl: "/udemy.png",
      issued: "Feburary 2026",
      pdfUrl: "/certificates/pythonanddjango.pdf",
    },
    {
      title: "The Bits and Bytes of Computer Networking",
      organization: "Google / Coursera",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
      issued: "September 2024",
      pdfUrl: "/certificates/bitsandbites.pdf",
    },
    {
      title: "Advanced Data Structure",
      organization: "Lovely Professional University",
      logoUrl: "/lpu.webp",
      issued: "July 2025",
      pdfUrl: "/certificates/ads.pdf",
    },
    {
      title: "Introduction to Hardware and Operating Systems",
      organization: "IBM / Coursera",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      issued: "September 2024",
      pdfUrl: "/certificates/hardwareandos.pdf",
    },
    {
      title: "Peer-to-Peer Protocols and Local Area Networks",
      organization: "Coursera",
      logoUrl: "/coursera.png",
      issued: "September 2024",
      pdfUrl: "/certificates/LAN.pdf",
    },
    {
      title: "Fundamentals of Network Communication",
      organization: "Coursera",
      logoUrl: "/coursera.png",
      issued: "September 2024",
      pdfUrl: "/certificates/NC.pdf",
    },
    {
      title: "Digital Systems: From Logic Gates to Processors",
      organization: "Coursera",
      logoUrl: "/coursera.png",
      issued: "September 2024",
      pdfUrl: "/certificates/DS.pdf",
    },
    {
      title: "Packet Switching Networks and Algorithms",
      organization: "Coursera",
      logoUrl: "/coursera.png",
      issued: "October 2024",
      pdfUrl: "/certificates/PSNA.pdf",
    },
    {
      title: "TCP/IP and Advanced Topics",
      organization: "Coursera",
      logoUrl: "/coursera.png",
      issued: "October 2024",
      pdfUrl: "/certificates/tcpip.pdf",
    },
    {
      title: "Computer Communications",
      organization: "Coursera",
      logoUrl: "/coursera.png",
      issued: "October 2024",
      pdfUrl: "/certificates/CC.pdf",
    },
    {
      title: "ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM",
      organization: "Infosys",
      logoUrl: "/infosys.jpg",
      issued: "August 2025",
      pdfUrl: "/certificates/chatgpt4.pdf",
    },
    {
      title: "Build Generative AI Apps and Solutions with No-Code Tools",
      organization: "Infosys",
      logoUrl: "/infosys.jpg",
      issued: "August 2025",
      pdfUrl: "/certificates/buildgenai.pdf",
    },
    {
      title: "Master Generative AI & Generative AI tools (ChatGPT & more)",
      organization: "Infosys",
      logoUrl: "/infosys.jpg",
      issued: "August 2025",
      pdfUrl: "/certificates/mastergenai.pdf",
    },
    {
      title: "Computational Theory: Language Principle & Finite Automata Theory",
      organization: "Infosys",
      logoUrl: "/infosys.jpg",
      issued: "August 2025",
      pdfUrl: "/certificates/automata.pdf",
    },
  ],
} as const;
