"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import "./home.scss";
import { BsLinkedin, BsGithub, BsFileEarmarkPerson } from "react-icons/bs";

const container = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const socialLinks: { label: string; href: string; icon: React.ReactNode }[] = [
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/alexandru-roventa/",
		icon: <BsLinkedin />,
	},
	{
		label: "GitHub",
		href: "https://github.com/Alcrro",
		icon: <BsGithub />,
	},
];

export default function HeroSection() {
	return (
		<section className="hero-section">
			<motion.div
				className="hero-inner"
				variants={container}
				initial="hidden"
				animate="visible"
			>
				<motion.div
					className="hero-image"
					variants={item}
				>
					<Image
						src="https://alexandru-roventa.s3.eu-central-1.amazonaws.com/me.jpeg"
						alt="Alexandru Roventa"
						width={200}
						height={200}
						priority
						className="profile-image"
					/>
				</motion.div>

				<div className="hero-content">
					<motion.h1
						className="hero-name"
						variants={item}
					>
						Alexandru Roventa
					</motion.h1>

					<motion.p
						className="hero-role"
						variants={item}
					>
						Full-Stack Developer · SaaS Products · AI Integration
					</motion.p>

					<motion.div
						className="hero-cta"
						variants={item}
					>
						<Link
							href="/contact"
							className="btn-primary"
						>
							Contact me
						</Link>
						<Link
							href="/cv"
							className="btn-secondary"
						>
							<BsFileEarmarkPerson />
							Open CV
						</Link>
					</motion.div>

					<motion.div
						className="hero-social"
						variants={item}
					>
						{socialLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={link.label}
								className="social-link"
							>
								{link.icon}
							</Link>
						))}
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}
