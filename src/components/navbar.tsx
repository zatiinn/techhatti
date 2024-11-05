import { FC } from "react";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useStore from "@/hooks/usetStore";

import logo from "../../public/store-logo.png";
import Searchbar from "./searchbar";

const Navbar: FC = () => {
  const { user, logout } = useStore();

  return (
    <header className="sticky top-0 z-10 bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center h-full">
              <img
                src={logo}
                title="illusion"
                alt="illusion-logo"
                className="h-8 w-auto object-contain" // Updated height for better fit
              />
            </Link>
            <nav className="hidden md:block">
              <ul className="flex space-x-4">
                <li>
                  <Link
                    to="/"
                    className="text-sm md:text-base font-medium hover:text-primary"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-sm md:text-base font-medium hover:text-primary"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-sm md:text-base font-medium hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center">
            <Searchbar />
            <Link to={"/cart"}>
              <Button variant="ghost" size="icon" className="mr-2">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
            <div className="flex items-center gap-2">
              {!user ? (
                <>
                  <Link to="/auth">
                    <Button>Login</Button>
                  </Link>
                  <Link to="/auth">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              ) : (
                <Button onClick={logout}>logout</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
