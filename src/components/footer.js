import React from 'react';
import {
    Linkedin,
    Github,
    Twitter,
    Book,
} from 'lucide-react';
import { useStaticQuery, graphql } from 'gatsby';

const iconMap = {
    linkedin: <Linkedin className="w-6 h-6" />,
    github: <Github className="w-6 h-6" />,
    twitter: <Twitter className="w-6 h-6" />,
    stackoverflow: <Book className="w-6 h-6" />,
};

const Footer = () => {

    const { cvJson: { aboutMe: { profile }, careerPreferences: { contact: { publicProfiles: links } } } } = useStaticQuery(
        graphql`
query {
  cvJson {
    aboutMe {
      profile {
        name
        surnames
      }
    }
    careerPreferences { 
      contact {
        publicProfiles {
          URL
          type
        }
      }
    }
  }
}
`)

    return (
        <footer id="contact" className="bg-gray-800 text-white py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Let's Connect</h2>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team.
                </p>
                <div className="mt-8 flex justify-center space-x-6">
                    {links.map((link) => (
                        <a
                            key={link.type}
                            href={link.URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-primary-400 transform hover:-translate-y-1 transition-all duration-300"
                            aria-label={`Visit my ${link.type} profile`}
                        >
                            {iconMap[link.type] || <span className="capitalize">{link.type}</span>}
                        </a>
                    ))}
                </div>
                <div className="mt-16 border-t border-gray-700 pt-8">
                    <p className="text-gray-400">&copy; {new Date().getFullYear()} {profile.name} {profile.surnames}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
