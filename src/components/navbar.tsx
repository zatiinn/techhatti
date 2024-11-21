import { FC, useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useStore from "@/hooks/usetStore";

import logo from "../../public/store-logo.png";

const Navbar: FC = () => {
  const { user, logout } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: `/orders/${user?.uid}`, label: "Orders" },
  ];

  return (
    <header className="sticky top-0 z-10 bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {}
          <div className="flex items-center gap-2 md:gap-4 ml-2 md:ml-0">
            <Link to="/" className="flex items-center h-full">
              <img
                src={logo}
                title="illusion"
                alt="illusion-logo"
                className="h-6 w-auto object-contain md:h-8"
              />
            </Link>

            {}
            <nav className="hidden md:block">
              <ul className="flex space-x-4">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm md:text-base font-medium hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {}
          <div className="flex items-center gap-2 flex-1 md:justify-end">
            {}
            <div className="flex-grow md:flex-grow-0 md:max-w-sm mr-2 md:mr-0">
              <input
                type="search"
                placeholder="Search..."
                className="px-4 py-2 w-full md:w-auto rounded-md bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ maxWidth: "200px" }}
              />
            </div>

            {}
            <Link to={"/cart"}>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
              </Button>
            </Link>

            {}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Menu</span>
            </Button>

            {}
            <div className="hidden md:flex items-center gap-2">
              {!user ? (
                <>
                  <Link to="/auth">
                    <Button variant="secondary">Login</Button>
                  </Link>
                  <Link to="/auth">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              ) : (
                <Button onClick={logout}>Logout</Button>
              )}
            </div>
          </div>
        </div>

        {}
        <div
          className={`md:hidden ${isOpen ? "block" : "hidden"} border-t`}
        >
          <nav className="py-4">
            <ul className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="block px-4 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {}
              {!user ? (
                <li className="px-4 pt-4 border-t">
                  <div className="flex flex-col gap-2">
                    <Link to="/auth" className="w-full">
                      <Button variant="secondary" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/auth" className="w-full">
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                </li>
              ) : (
                <li className="px-4 pt-4 border-t">
                  <Button onClick={logout} className="w-full">
                    Logout
                  </Button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;