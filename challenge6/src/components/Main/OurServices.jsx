import "./css/OurServices.css";

function OurServices() {
  return (
    <section id="ourservices">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12 imgourservices">
            <img
              src="src\components\Main\images\service.png"
              alt="service image"
            />
          </div>
          <div className="col-lg-6 col-12">
            <h3>Best Car Rental for any kind of trip in Purwokerto!</h3>
            <p>
              Sewa mobil di Purwokerto bersama Binar Car Rental jaminan harga
              lebih murah dibandingkan yang lain, kondisi mobil baru, serta
              kualitas pelayanan terbaik untuk perjalanan wisata, bisnis,
              wedding, meeting, dll.
            </p>
            <ul>
              <li>
                <img
                  src="src\components\Main\images\list.png"
                  alt="icon list"
                />
                Sewa Mobil Dengan Supir di Bali 12 Jam
              </li>
              <li>
                <img
                  src="src\components\Main\images\list.png"
                  alt="icon list"
                />
                Sewa Mobil Lepas Kunci di Bali 24 Jam
              </li>
              <li>
                <img
                  src="src\components\Main\images\list.png"
                  alt="icon list"
                />
                Sewa Mobil Jangka Panjang Bulanan
              </li>
              <li>
                <img
                  src="src\components\Main\images\list.png"
                  alt="icon list"
                />
                Gratis Antar - Jemput Mobil di Bandara
              </li>
              <li>
                <img
                  src="src\components\Main\images\list.png"
                  alt="icon list"
                />
                Layanan Airport Transfer / Drop In Out
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurServices;
