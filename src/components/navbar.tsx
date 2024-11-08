import React, { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/orders", label: "Orders" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-4 md:gap-12">
            <a href="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-bold tracking-tight whitespace-nowrap">
                <span className="text-primary">Tech</span>
                <span className="text-zinc-800">Hatti</span>
              </span>
            </a>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-4">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm md:text-base font-medium hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right Section - Responsive Layout */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Bar - Hide on very small screens */}
            <div className="hidden sm:block relative">
              <input
                type="search"
                placeholder="Search..."
                className="w-full md:w-auto px-3 py-1.5 md:px-4 md:py-2 rounded-md bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            {/* Cart Button - Always visible */}
            <a href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
              </Button>
            </a>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted"
              onClick={toggleMenu}
            >
              <div className="relative w-6 h-4 flex flex-col justify-center items-center">
                <span className={`absolute h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out w-6 ${
                  isOpen 
                    ? "rotate-45 translate-y-0"
                    : "-translate-y-2"
                }`}></span>
                <span className={`absolute h-0.5 bg-current rounded-full transition-all duration-200 ease-in-out w-6 ${
                  isOpen
                    ? "opacity-0"
                    : "opacity-100"
                }`}></span>
                <span className={`absolute h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out w-6 ${
                  isOpen
                    ? "-rotate-45 translate-y-0"
                    : "translate-y-2"
                }`}></span>
              </div>
              <span className="sr-only">Menu</span>
            </Button>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-2">
              {!isLoggedIn ? (
                <>
                  <a href="/auth">
                    <Button variant="secondary">Login</Button>
                  </a>
                  <a href="/auth">
                    <Button>Sign Up</Button>
                  </a>
                </>
              ) : (
                <Button onClick={handleLogout}>Logout</Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu - Improved Layout */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen 
              ? "max-h-[32rem] opacity-100" 
              : "max-h-0 opacity-0"
          } border-t`}
        >
          <nav className="py-4">
            <ul className="flex flex-col space-y-2">
              {/* Mobile Search */}
              <li className="px-4 pb-2 border-b">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full px-3 py-2 rounded-md bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </li>

              {/* Navigation Links */}
              {navLinks.map((link, index) => (
                <li 
                  key={link.label}
                  className={`transform transition-all duration-300 ${
                    isOpen 
                      ? "translate-x-0 opacity-100" 
                      : "translate-x-4 opacity-0"
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100}ms` 
                  }}
                >
                  <a
                    href={link.href}
                    className="block px-4 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}

              {/* Mobile Auth Buttons */}
              <li 
                className={`px-4 pt-2 border-t transform transition-all duration-300 ${
                  isOpen 
                    ? "translate-x-0 opacity-100" 
                    : "translate-x-4 opacity-0"
                }`}
                style={{ 
                  transitionDelay: `${navLinks.length * 100}ms` 
                }}
              >
                {!isLoggedIn ? (
                  <div className="flex flex-col gap-2">
                    <a href="/auth" className="w-full">
                      <Button variant="secondary" className="w-full">
                        Login
                      </Button>
                    </a>
                    <a href="/auth" className="w-full">
                      <Button className="w-full">Sign Up</Button>
                    </a>
                  </div>
                ) : (
                  <Button onClick={handleLogout} className="w-full">
                    Logout
                  </Button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;