import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiMongodb,
  SiMongoose,
  SiNodedotjs,
  SiTailwindcss,
  SiSass,
  SiExpress,
  SiPostgresql,
  SiRedis,
  SiStripe,
  SiSupabase,
  SiVercel,
  SiPrisma,
  SiVite,
  SiDocker,
  SiGsap,
  SiReactrouter,
  SiFramer,
  SiGooglemaps,
  SiBootstrap,
  SiTanstack,
  SiNeon,
  SiGraphql,
  SiResend,
} from "react-icons/si";
import type { IconType } from "react-icons";

export interface TechIconDef {
  icon?: IconType;
  color: string;
  abbrev?: string;
}

export const techCategories: { label: string; techs: string[] }[] = [
  {
    label: "Language",
    techs: ["TypeScript", "JavaScript"],
  },
  {
    label: "Framework",
    techs: ["Next.js", "Next.js 14", "React", "React 18", "Express", "Node.js", "React Router", "React Flow", "Vite"],
  },
  {
    label: "Database",
    techs: ["MongoDB", "Mongoose", "PostgreSQL", "Redis", "Neon", "Supabase", "Prisma", "Docker"],
  },
  {
    label: "Styling",
    techs: ["Tailwind CSS", "SCSS", "SCSS Modules", "Sass", "Bootstrap Icons", "Framer Motion", "GSAP", "Embla Carousel", "Recharts"],
  },
  {
    label: "Auth",
    techs: ["Auth.js", "NextAuth", "bcryptjs"],
  },
  {
    label: "State & Data",
    techs: ["TanStack Query", "Zustand", "next-themes"],
  },
  {
    label: "Services",
    techs: ["Stripe", "Resend", "OpenAI", "Vercel", "AWS Amplify", "AWS Route 53", "Google Maps", "GraphQL"],
  },
  {
    label: "Other",
    techs: ["QRCode", "ZXing", "Monaco Editor"],
  },
];

export const techIconMap: Record<string, TechIconDef> = {
  "React":           { icon: SiReact,        color: "#61dafb" },
  "React 18":        { icon: SiReact,        color: "#61dafb" },
  "Next.js":         { icon: SiNextdotjs,    color: "#888888" },
  "Next.js 14":      { icon: SiNextdotjs,    color: "#888888" },
  "TypeScript":      { icon: SiTypescript,   color: "#3178c6" },
  "JavaScript":      { icon: SiJavascript,   color: "#d4a017" },
  "MongoDB":         { icon: SiMongodb,      color: "#47a248" },
  "Mongoose":        { icon: SiMongoose,     color: "#aa0000" },
  "Node.js":         { icon: SiNodedotjs,    color: "#339933" },
  "Tailwind CSS":    { icon: SiTailwindcss,  color: "#06b6d4" },
  "SCSS":            { icon: SiSass,         color: "#cc6699" },
  "SCSS Modules":    { icon: SiSass,         color: "#cc6699" },
  "Sass":            { icon: SiSass,         color: "#cc6699" },
  "Express":         { icon: SiExpress,      color: "#888888" },
  "PostgreSQL":      { icon: SiPostgresql,   color: "#4169e1" },
  "Redis":           { icon: SiRedis,        color: "#dc382d" },
  "Stripe":          { icon: SiStripe,       color: "#635bff" },
  "Supabase":        { icon: SiSupabase,     color: "#3ecf8e" },
  "Vercel":          { icon: SiVercel,       color: "#888888" },
  "Prisma":          { icon: SiPrisma,       color: "#888888" },
  "Vite":            { icon: SiVite,         color: "#646cff" },
  "Docker":          { icon: SiDocker,       color: "#2496ed" },
  "GSAP":            { icon: SiGsap,         color: "#88ce02" },
  "React Router":    { icon: SiReactrouter,  color: "#ca4245" },
  "Framer Motion":   { icon: SiFramer,       color: "#0055ff" },
  "Google Maps":     { icon: SiGooglemaps,   color: "#4285f4" },
  "Bootstrap Icons": { icon: SiBootstrap,   color: "#7952b3" },
  "TanStack Query":  { icon: SiTanstack,    color: "#ff4154" },
  "Neon":            { icon: SiNeon,         color: "#00c58e" },
  "GraphQL":         { icon: SiGraphql,      color: "#e10098" },
  "Resend":          { icon: SiResend,       color: "#888888" },
  "Auth.js":         { color: "#4f46e5",     abbrev: "Au" },
  "NextAuth":        { color: "#4f46e5",     abbrev: "NA" },
  "AWS Amplify":     { color: "#ff9900",     abbrev: "AWS" },
  "AWS Route 53":    { color: "#ff9900",     abbrev: "R53" },
  "Embla Carousel":  { color: "#888888",     abbrev: "EC" },
  "OpenAI":          { color: "#10a37f",     abbrev: "AI" },
  "QRCode":          { color: "#555555",     abbrev: "QR" },
  "React Flow":      { color: "#0284c7",     abbrev: "RF" },
  "Recharts":        { color: "#22c55e",     abbrev: "RC" },
  "ZXing":           { color: "#555555",     abbrev: "ZX" },
  "Zustand":         { color: "#433e38",     abbrev: "Zu" },
  "bcryptjs":        { color: "#555555",     abbrev: "bc" },
  "next-themes":     { color: "#555555",     abbrev: "NT" },
  "Monaco Editor":   { color: "#007acc",     abbrev: "ME" },
};
