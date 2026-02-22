import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    GithubLogo,
    LinkedinLogo
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const profiles = [
    {
        name: 'GitHub',
        icon: <GithubLogo size={28} weight="fill" />,
        url: 'https://github.com/Nimmanagotitharunkumarhello',
        color: '#333'
    },
    {
        name: 'LinkedIn',
        icon: <LinkedinLogo size={28} weight="fill" />,
        url: 'https://www.linkedin.com/in/nimmanagotitharunkumar/',
        color: '#0077b5'
    },
    {
        name: 'LeetCode',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.956-.207a1.384 1.384 0 0 0-.207-1.953l-3.5-2.831c-2.227-1.802-5.968-1.566-8.268.607L1.6 11.644a4.116 4.116 0 0 0-.749 5.364l4.606 5.503a4.114 4.114 0 0 0 6.072.186l2.396-2.392c1.36-1.36 1.36-3.562.003-4.922a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a1.51 1.51 0 0 1-2.102.019l-.02-.019-4.606-5.503c-.377-.45-.563-1.015-.544-1.57.018-.544.237-1.071.625-1.488L9.98 5.485c1.474-1.58 4.256-1.782 6.035-.453l3.5 2.831c.593.48 1.461.387 1.956-.207a1.384 1.384 0 0 0-.207-1.953l-3.5-2.831a3.025 3.025 0 0 1-4.305.289l.024-.025L13.483 0z" />
            </svg>
        ),
        url: 'https://leetcode.com/u/hellotharun_2006/',
        color: '#ff9c0b'
    },
    {
        name: 'Google Skills',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
            </svg>
        ),
        url: 'https://www.skills.google/public_profiles/0c2f2b44-e4aa-480e-a3e6-fd13e0768157',
        color: '#4285F4'
    }
];

const AnimatedProfiles = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const circles = container.querySelectorAll('.profile-circle');

        // Initial entrance animation
        gsap.fromTo(circles,
            { opacity: 0, scale: 0, y: 50 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'back.out(1.5)',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 85%',
                }
            }
        );

        // Continuous floating animation
        circles.forEach((circle, i) => {
            gsap.to(circle, {
                y: -15,
                duration: 2 + Math.random(),
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: i * 0.2
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="w-full py-16 -mt-16 relative z-20 pointer-events-none">
            <div
                ref={containerRef}
                className="container mx-auto px-6 flex flex-wrap justify-center items-center gap-6 md:gap-10 pointer-events-auto"
            >
                {profiles.map((profile, i) => (
                    <a
                        key={i}
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="profile-circle group relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-secondary/30 backdrop-blur-md border border-white/10 shadow-lg transition-transform duration-300 hover:scale-125 hover:z-30 cursor-pointer"
                        title={profile.name}
                    >
                        {/* Glow effect on hover */}
                        <div
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                            style={{ backgroundColor: profile.color }}
                        />
                        {/* Inner circle with icon */}
                        <div className="flex items-center justify-center w-full h-full rounded-full text-foreground group-hover:text-white transition-colors duration-300 z-10"
                            style={{ color: profile.name === 'LeetCode' || profile.name === 'Google Skills' ? 'inherit' : undefined }}>
                            {profile.icon}
                        </div>

                        {/* Connection line (decorative) - simplified version of the mockup */}
                        <div className="absolute top-1/2 left-1/2 w-px h-24 bg-gradient-to-t from-transparent via-white/10 to-transparent -translate-x-1/2 translate-y-8 md:translate-y-10 -z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default AnimatedProfiles;
