import { FC } from "react";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useStore from "@/hooks/usetStore";

const Navbar: FC = () => {
  const { user, logout } = useStore();

  console.log(user);
  return (
    <header className="sticky top-0 z-10 bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* <div className="hidden md:flex items-center justify-center aspect-square rounded-xl relative">
              <img
                src={logo}
                title="illusion"
                alt="illusion-logo"
                className="object-cover pointer-events-none"
              />
            </div> */}
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">
                Tech Hatti
              </span>
            </Link>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link to="/" className="text-sm font-medium hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm font-medium hover:text-primary"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm font-medium hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center">
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