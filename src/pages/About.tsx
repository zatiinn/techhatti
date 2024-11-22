import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">About Us </h1>
        <p className="text-xl text-muted-foreground">
          Story behind this Project
        </p>
      </header>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold">About Tech Hatti</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="text-lg">
            Tech Hatti is an e-commerce platform developed Jatin, as part of my final-year BCA project. 
            </p>
            <p className="text-lg">
            This project is dedicated to providing high-quality computer components for gamers and professionals. The store features a wide selection of essential parts, including RAM, motherboards, processors, graphics cards, gaming keyboards, cabinets, and other key components necessary for building or upgrading personal and professional computer systems.
            </p>
            <p className="text-lg">
            Through this project, I aim to demonstrate my ability to create a fully functional e-commerce site. Tech Hatti represents my dedication to understanding the complexities of online retail and my passion for delivering quality service to users.
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
        <h2 className="text-3xl font-semibold">Creator of this Project </h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1280px-Flag_of_India.svg.png"
                alt="Image"
                className="rounded-full h-[200px] w-[200px] object-cover"
              />
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold">Jatin</h3>
                <p className="text-lg">
                I am a motivated individual pursuing a Bachelor's degree in Computer Applications and currently working in IT at Jindal Industries Pvt. Ltd. in Hisar. This project is a reflection of my passion for technology and my commitment to continuous learning. I strive to stay updated with the latest industry trends, and I am eager to apply my skills and experiences in creating a meaningful and practical project like Tech Hatti.
                </p>
                <p className="text-lg">
                
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
          "To create a sustainable and user-focused e-commerce platform that enhances the online shopping experience while adhering to ethical practices."
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
                We support #MadeinIndia and give back to communities through
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