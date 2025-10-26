
import React from 'react';
// import { SOCIAL_LINKS, PROFILE } from '../constants';
import SocialIcon from './socialicon';

export const PROFILE = {
    name: "Eduard Paul Lakida",
    title: "Lead Solutions Architect",
    location: "Madrid, Spain",
    image: "https://i.imgur.com/example.jpg" // Placeholder from CV
};

export const SOCIAL_LINKS = [
    { name: 'Email', url: 'mailto:aaa@outlook.com', text: 'aaa@outlook.com' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/eduardpaul', text: 'linkedin.com/in/eduardpaul' },
    { name: 'Skype', url: 'skype:aaaa?call', text: 'aaa' },
    { name: 'Mobile', url: 'tel:+aaaa', text: '(+34) aaa' },
];

const Footer = () => {
    return (
        <footer className="bg-slate-800 text-slate-300">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center space-x-6 mb-8">
                    {SOCIAL_LINKS.map((link) => (
                        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                            <span className="sr-only">{link.name}</span>
                            <SocialIcon name={link.name} className="h-6 w-6" />
                        </a>
                    ))}
                </div>
                <p className="text-center text-base text-slate-400">
                    &copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;