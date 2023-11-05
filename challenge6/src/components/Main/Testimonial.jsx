import "./css/Testimonial.css";

function Testimonial() {
  return (
    <section id="testimonial">
      <div className="container d-flex flex-column align-items-center">
        <h3>Testimonial</h3>
        <p className="text-center">
          Berbagai review positif dari para pelanggan kami
        </p>

        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row">
                <div className="col-lg-3 d-flex justify-content-center">
                  <div>
                    <img
                      src="src\components\Main\images\img_photo.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col d-flex flex-column align-items-center align-items-md-start">
                  <div className="stars">
                    <ul className="d-flex flex-row">
                      <li>
                        <img src="src\components\Main\images\Star.png" alt="" />
                      </li>
                      <li>
                        <img src="src\components\Main\images\Star.png" alt="" />
                      </li>
                      <li>
                        <img src="src\components\Main\images\Star.png" alt="" />
                      </li>
                      <li>
                        <img src="src\components\Main\images\Star.png" alt="" />
                      </li>
                      <li>
                        <img src="src\components\Main\images\Star.png" alt="" />
                      </li>
                    </ul>
                  </div>
                  <div className="testi">
                    <p>
                      “Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod lorem ipsum dolor sit
                      amet, consectetur adipiscing elit, sed do eiusmod”
                    </p>
                    <p className="fw-bolder">John Dee 32, Bromo</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item active">
              <div className="row">
                <div className="col-lg-3 d-flex justify-content-center">
                  <div>
                    <img
                      src="src\components\Main\images\img_photo.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col d-flex flex-column align-items-center align-items-md-start">
                  <div className="stars">
                    <ul className="d-flex flex-row">
                      <li>
                        <img src="src\components\Main\images\Star.png" alt="" />
                      </li>
                      <li>
                        <img src="src\components\Main\images\Star.png" alt="" />
                      </li>
                      <li>
                        <img src="src\components\Main\images\Star.png" alt="" />
                      </li>
                      <li>
                        <img src="src\components\Main\images\Star.png" alt="" />
                      </li>
                      <li>
                        <img src="src\components\Main\images\Star.png" alt="" />
                      </li>
                    </ul>
                  </div>
                  <div className="testi">
                    <p>
                      “Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod lorem ipsum dolor sit
                      amet, consectetur adipiscing elit, sed do eiusmod”
                    </p>
                    <p className="fw-bolder">John Dee 32, Bromo</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item active">
              <div className="row">
                <div className="col-lg-3 d-flex justify-content-center">
                  <div>
                    <img
                      src="src\components\Main\images\img_photo.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col d-flex flex-column align-items-center align-items-md-start">
                  <div className="stars">
                    <ul className="d-flex flex-row">
                      <li>
                        <img src="src\components\Main\images\Star.png" alt="" />
                      </li>
                      <li>
                        <img src="src\components\Main\images\Star.png" alt="" />
                      </li>
                      <li>
                        <img src="src\components\Main\images\Star.png" alt="" />
                      </li>
                      <li>
                        <img
                          src="isrc\components\Main\images\Star.png"
                          alt=""
                        />
                      </li>
                      <li>
                        <img src="src\components\Main\images\Star.png" alt="" />
                      </li>
                    </ul>
                  </div>
                  <div className="testi">
                    <p>
                      “Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod lorem ipsum dolor sit
                      amet, consectetur adipiscing elit, sed do eiusmod”
                    </p>
                    <p className="fw-bolder">John Dee 32, Bromo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <img
              src="src\components\Main\images\Left button.png"
              aria-hidden="true"
            />
            <span className="visually-hidden">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <img
              src="src\components\Main\images\Right button.png"
              aria-hidden="true"
            />
            <span className="visually-hidden">Next</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
