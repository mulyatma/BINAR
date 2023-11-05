import "./Navbar.css";

function Navbar() {
  return (
    <header>
      {/* <!-- NAVBAR --> */}
      <nav className="navbar fixed-top">
        <div className="container">
          <a href="/#hero">
            <div className="brand" href=""></div>
          </a>
          {/* <!-- NAVIGATION --> */}
          <ul className="navbar-nav navigation d-none d-lg-flex">
            <li className="nav-item">
              <a href="/#ourservices">Our Services</a>
            </li>
            <li className="nav-item">
              <a href="/#whyus">Why Us</a>
            </li>
            <li className="nav-item">
              <a href="/#testimonial">Testimonial</a>
            </li>
            <li className="nav-item">
              <a href="/#faq">FAQ</a>
            </li>
            <li className="nav-item">
              <button href="#">Register</button>
            </li>
          </ul>
          {/* <!-- OFFCANVAS BUTTON --> */}
          <a
            className="d-lg-none"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <img src="images/fi_menu.png" alt="" />
          </a>

          {/* <!-- OFFCANVAS --> */}
          <div
            className="offcanvas offcanvas-size-md offcanvas-end"
            tabIndex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title fw-bold" id="offcanvasRightLabel">
                BCR
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <div className="" id="navbarNav d-block ">
                <ul className="navbar-nav">
                  <li className="nav-item pb-3">
                    <a href="#">Our Services</a>
                  </li>
                  <li className="nav-item pb-3">
                    <a href="#">Why Us</a>
                  </li>
                  <li className="nav-item pb-3">
                    <a href="#">Testimonial</a>
                  </li>
                  <li className="nav-item pb-3">
                    <a href="#">FAQ</a>
                  </li>
                  <li className="nav-item pb-3">
                    <button href="#">Register</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
