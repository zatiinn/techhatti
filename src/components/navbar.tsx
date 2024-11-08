import { FC, useState } from "react";
import { ShoppingCart, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Simple mock of authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4">
        {/* Main Navbar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo - Always visible */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-bold text-primary">
                Tech Hatti
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-1 justify-center space-x-4">
            {/* Search Bar */}
            <div className="relative w-96">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-md px-4 py-2 pr-12 border focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={handleSearch}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <Button size="sm" variant="ghost">
                  <Search className="h-5 w-5" />
                </Button>
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-8 ml-4">
              <a href="/" className="text-sm font-medium hover:text-primary">
                Home
              </a>
              <a href="/about" className="text-sm font-medium hover:text-primary">
                About
              </a>
              <a href="/contact" className="text-sm font-medium hover:text-primary">
                Contact
              </a>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Cart - Visible on all screens */}
            <a href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
              </Button>
            </a>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              {!isLoggedIn ? (
                <>
                  <a href="/auth">
                    <Button variant="ghost" size="sm">Login</Button>
                  </a>
                  <a href="/auth">
                    <Button size="sm">Sign Up</Button>
                  </a>
                </>
              ) : (
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-md px-4 py-2 pr-12 border focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={handleSearch}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <Button size="sm" variant="ghost">
                  <Search className="h-5 w-5" />
                </Button>
              </span>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-4">
              <a 
                href="/" 
                className="text-sm font-medium hover:text-primary px-2 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="/about" 
                className="text-sm font-medium hover:text-primary px-2 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="/contact" 
                className="text-sm font-medium hover:text-primary px-2 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-2 pt-2 border-t">
              {!isLoggedIn ? (
                <>
                  <a href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full" variant="ghost">
                      Login
                    </Button>
                  </a>
                  <a href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full">
                      Sign Up
                    </Button>
                  </a>
                </>
              ) : (
                <Button 
                  className="w-full" 
                  variant="ghost" 
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;