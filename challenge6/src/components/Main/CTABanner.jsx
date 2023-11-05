import { Link } from "react-router-dom";
import "./css/CTABanner.css";

function CTABanner() {
  return (
    <section id="ctabanner">
      <div className="container text-center">
        <h1>Sewa Mobil di Purwokerto Sekarang</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Link to="/cars">
          <button>Mulai Sewa Mobil</button>
        </Link>
      </div>
    </section>
  );
}

export default CTABanner;
