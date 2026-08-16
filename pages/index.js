import Head from "next/head";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Courses from "@/components/Courses";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <>
      <Head>
        <title>The CLAT Blueprint | Elite 1:1 CLAT Mentorship</title>
      </Head>
      <Navbar />
      <main>
        <Hero />
        <Courses />
        <About />
        <WhyChooseUs />
        <Testimonials />
        <ContactFooter />
      </main>
    </>
  );
}
