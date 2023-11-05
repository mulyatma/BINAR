import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Header/Navbar";
import CTABanner from "./components/Main/CTABanner";
import FAQ from "./components/Main/FQA";
import Hero from "./components/Main/Hero";
import OurServices from "./components/Main/OurServices";
import Testimonial from "./components/Main/Testimonial";
import WhyUs from "./components/Main/WhyUs";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <OurServices />
      <WhyUs />
      <Testimonial />
      <CTABanner />
      <FAQ />
      <Footer />
    </>
  );
}

export default App;
