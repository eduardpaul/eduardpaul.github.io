import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from "gatsby"

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { href: '/about', label: 'About me' },
        { href: '/activity', label: 'Activity' }
    ];

    return (
        <header
            className={`not-prose sticky top-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}
            aria-label="Main Navigation"
        >
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold text-slate-800 hover:text-blue-600 transition-colors">Eduard Paul Lakida</Link>

                    <ul className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link to={item.href} className="font-medium text-slate-600 hover:text-blue-600 transition-colors">{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-controls="mobile-menu"
                            aria-expanded={isMenuOpen}
                            className="text-slate-800 p-2 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    id="mobile-menu"
                    className={`transition-all duration-300 ease-in-out overflow-hidden md:hidden ${isMenuOpen ? 'max-h-96 pt-4' : 'max-h-0'}`}
                >
                    <ul className="flex flex-col items-center space-y-6">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    to={item.href}
                                    className="font-medium text-slate-600 hover:text-blue-600 transition-colors text-lg"
                                    activeClassName="text-blue-700 font-semibold"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;