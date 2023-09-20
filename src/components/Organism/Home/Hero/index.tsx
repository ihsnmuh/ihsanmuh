import { cn } from "@/lib/utils";
import { ChevronUp, FileText, Github, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="min-h-screen relative flex items-center">
      <img
        className="dark:invisible absolute h-full w-full max-w-none bg-left"
        src="/images/background/hero-light.jpeg"
        alt="hero background"
      />
      <img
        className="invisible dark:visible absolute h-full w-full max-w-none bg-left"
        src="/images/background/hero-dark.jpg"
        alt="hero background"
      />
      <div className="relative layout flex flex-col w-full gap-1">
        <p className="font-primary text-base sm:text-lg">
          Hello, Everyone! I&lsquo;m
        </p>
        <h1
          className={cn(
            "capitalize text-transparent font-bold font-secondary",
            "text-5xl sm:text-7xl",
            "bg-clip-text text-transparent",
            "bg-gradient-to-r from-primary-500 to-violet-500 dark:to-orange-500",
          )}
        >
          Muhammad Ihsan
        </h1>
        <p
          className={cn(
            "capitalize font-primary text-slate-500",
            "text-xl sm:text-3xl",
          )}
        >
          Frontend Developer based in Indonesia
        </p>
        <div className="flex gap-4 mt-4">
          <Link href="https://github.com/ihsnmuh">
            <Github
              size={24}
              className="text-slate-500 hover:text-black dark:hover:text-white"
            />
          </Link>
          <Link href="https://www.linkedin.com/in/ihsanmuhammad19/">
            <Linkedin
              size={24}
              className="text-slate-500 hover:text-[#0077b5]"
            />
          </Link>
          <Link href="https://instagram.com/ihsnmuh">
            <Instagram
              size={24}
              className="text-slate-500 hover:text-pink-500"
            />
          </Link>
          <div className="border-r-2 border-slate-600" />
          <Link href="https://drive.google.com/file/d/1EsyrBpAz3mU7oJqYwff-B97ddg6XKL3C/view?usp=sharing">
            <div className="flex gap-2 items-center text-slate-500 hover:text-primary-500">
              <FileText size={24} />
              <p>Resume</p>
            </div>
          </Link>
        </div>
      </div>
      <a
        href="#summary"
        className={cn(
          "flex flex-col items-center justify-center w-screen mx-auto",
          "absolute bottom-1",
          "animate-bounce",
        )}
      >
        <ChevronUp />
        <p className="text-xs">scroll up</p>
      </a>
    </section>
  );
};

export default Hero;
