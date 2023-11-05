import "./Footer.css";

function Footer() {
  return (
    <footer>
      <section id="footer">
        <div className="address">
          <p>Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
          <p>binarcarrental@gmail.com</p>
          <p>081-233-334-808</p>
        </div>
        <div className="fnavigation">
          <a href="">Our Services</a>
          <a href="">Why Us</a>
          <a href="">Testimoni</a>
          <a href="">FAQ</a>
        </div>
        <div className="sosmed">
          <p>Connect with us</p>
          <div className="ficon">
            <a href="#">
              <img
                src="src\components\Main\images\icon_facebook.png"
                alt="icon facebook"
              />
            </a>
            <a href="#">
              <img
                src="src\components\Main\images\icon_instagram.png"
                alt="icon instagram"
              />
            </a>
            <a href="#">
              <img
                src="src\components\Main\images\icon_twitter.png"
                alt="icon twitter"
              />
            </a>
            <a href="#">
              <img
                src="src\components\Main\images\icon_mail.png"
                alt=" icon mail"
              />
            </a>
            <a href="#">
              <img
                src="src\components\Main\images\icon_twitch.png"
                alt="icon twitch"
              />
            </a>
          </div>
        </div>
        <div className="copyright">
          <p>Copyright Binar 2022</p>
          <img src="src\components\Main\images\Rectangle 74.png" alt="logo" />
        </div>
      </section>
    </footer>
  );
}

export default Footer;
