
import React, { useState, useEffect } from 'react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'About' },
        { href: '#experience', label: 'Experience' },
        { href: '/posts', label: 'Posts' },
        { href: '#certifications', label: 'Certifications' },
    ];

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 shadow-md backdrop-blur-lg' : 'bg-transparent'}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <a href="#" className="text-xl font-bold text-slate-800 hover:text-indigo-600 transition-colors">
                        Eduard Paul Lakida
                    </a>
                    <div className="hidden md:flex md:space-x-8">
                        {navLinks.map((link) => (
                            <a 
                                key={link.href}
                                href={link.href} 
                                className="text-slate-600 hover:text-indigo-600 font-medium transition-colors px-3 py-2 rounded-md"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
