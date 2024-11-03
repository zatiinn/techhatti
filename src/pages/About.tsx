import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">About Our Company</h1>
        <p className="text-xl text-muted-foreground">
          Discover our journey and meet the founder behind our success
        </p>
      </header>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold">Our Story</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="text-lg">
              Founded in 2015, our e-commerce journey began with a simple idea:
              to provide high-quality, sustainable products that make a
              difference in people's lives and the environment.
            </p>
            <p className="text-lg">
              What started as a small online store operating from a garage has
              now grown into a thriving business, serving customers worldwide
              and partnering with artisans and manufacturers who share our
              values.
            </p>
            <p className="text-lg">
              Our commitment to sustainability, ethical sourcing, and
              exceptional customer service has been the cornerstone of our
              growth and success.
            </p>
          </div>
          <img
            src="https://www.apleona.com/fileadmin/apleona.com/Bilder/Best_Practice/1280x540/apl_17_website_contenbild_wollfers_1280x540.jpg"
            alt="Our company's journey"
            className="hidden md:block rounded-lg shadow-md h-max w-full"
          />
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold">Meet Our Founder</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <img
                src="https://www.mintface.xyz/content/images/2021/08/QmTndiF423kjdXsNzsip1QQkBQqDuzDhJnGuJAXtv4XXiZ-1.png"
                alt="Founder's portrait"
                className="rounded-full h-[300px] w-[300px] object-cover"
              />
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Jane Doe</h3>
                <p className="text-lg">
                  Jane Doe, our visionary founder, has always been passionate
                  about combining business with purpose. With a background in
                  environmental science and years of experience in retail, Jane
                  set out to create a company that not only offers great
                  products but also contributes positively to the world.
                </p>
                <p className="text-lg">
                  Under her leadership, our company has grown from a small
                  startup to a recognized name in sustainable e-commerce, all
                  while maintaining our core values and commitment to our
                  customers and the planet.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold">Our Mission</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="text-lg italic">
            "To provide sustainable, high-quality products that enhance our
            customers' lives while minimizing our environmental impact and
            supporting ethical business practices."
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 space-y-2">
              <h3 className="text-xl font-semibold">Sustainability</h3>
              <p>
                We're committed to reducing our carbon footprint and promoting
                eco-friendly products.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-2">
              <h3 className="text-xl font-semibold">Quality</h3>
              <p>
                We source and deliver only the best products that stand the test
                of time.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-2">
              <h3 className="text-xl font-semibold">Community</h3>
              <p>
                We support local artisans and give back to communities through
                various initiatives.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center space-y-6">
        <h2 className="text-3xl font-semibold">Join Our Journey</h2>
        <p className="text-xl">
          Be a part of our story as we continue to grow and make a positive
          impact.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/products">
            <Button>Shop Now</Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
