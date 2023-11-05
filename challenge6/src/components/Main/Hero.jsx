import { Link } from "react-router-dom";
import "./css/Hero.css";

function Hero() {
  console.log(window.location.pathname);

  return (
    <section id="hero">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-5 col-12">
            <h1>Sewa & Rental Mobil Terbaik di kawasan Purwokerto</h1>
            <p>
              Selamat datang di Binar Car Rental. Kami menyediakan mobil
              kualitas terbaik dengan harga terjangkau. Selalu siap melayani
              kebutuhanmu untuk sewa mobil selama 24 jam.
            </p>
            {window.location.pathname === "/" ? (
              <Link to="/cars">
                <button>Mulai Sewa Mobil</button>
              </Link>
            ) : (
              <></>
            )}
          </div>
          <div className="col-lg-7 col-12 img">
            <img
              src="src\components\Main\images\hero.png"
              alt="car image"
              align="right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
