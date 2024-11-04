import { FC } from "react";
import { Link } from "react-router-dom";

const Footer: FC = () => {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:order-2">
            <Link to="/About" className="text-muted-foreground hover:text-primary">
              About Us
            </Link>
            <Link
              to="/contact"
              className="ml-6 text-muted-foreground hover:text-primary"
            >
              Contact
            </Link>
            <Link
              to="/Cart"
              className="ml-6 text-muted-foreground hover:text-primary"
            >
              Cart
            </Link>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-muted-foreground">
              &copy; 2024 Tech Hatti. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
