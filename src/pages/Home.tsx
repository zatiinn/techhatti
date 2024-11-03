import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Category, Product } from "@/lib/Types";

interface HomeProps {
  categories: Category[];
  products: Product[];
}

const Home: FC<HomeProps> = ({ categories, products }) => {
  return (
    <>
      <section className="bg-muted py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl">
              Welcome to Tech Hatti
            </h1>
            <p className="mt-3 mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl">
              Discover the latest in electronics with top brands, unbeatable
              prices, and fast delivery. From smartphones to smart home devices,
              elevate your tech game with our wide selection tailored just for
              you!
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Button asChild>
                <Link to="/products">Shop Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
            Trending all categories
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 4).map((category) => (
              <div key={category.id} className="group relative h-full gap-2">
                <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="object-center object-cover group-hover:opacity-75 transition-opacity"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium line-clamp-1">
                    <Link to={`products`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {category.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                    {category.description}
                  </p>
                </div>
                <Link to={`products`}>
                  <Button className="w-full my-3">Shop Now</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
            Trending Products
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((category) => (
              <div key={category.id} className="group relative h-full gap-2">
                <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="object-center object-cover group-hover:opacity-75 transition-opacity"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium line-clamp-1">
                    <Link to={`products`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {category.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                    {category.description}
                  </p>
                </div>
                <Link to={`products`}>
                  <Button className="w-full my-3">Shop Now</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
