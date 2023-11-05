import "./css/WhyUs.css";

function WhyUs() {
  return (
    <section id="whyus">
      <div className="container text-center text-lg-start">
        <h3>Why Us?</h3>
        <p>Mengapa harus pilih Binar Car Rental?</p>
        <div className="container text-start">
          <div className="row">
            <div className="col-lg-3 col-12">
              <div className="card p-2">
                <div className="card-body">
                  <img
                    src="src\components\Main\images\icon_complete.png"
                    alt="icon complete"
                  />
                  <h5 className="card-title">Mobil Lengkap</h5>
                  <p className="card-text">
                    Tersedia banyak pilihan mobil, kondisi masih baru, bersih
                    dan terawat
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-12">
              <div className="card p-2">
                <div className="card-body">
                  <img
                    src="src\components\Main\images\icon_price.png"
                    alt="icon price"
                  />
                  <h5 className="card-title">Harga Murah</h5>
                  <p className="card-text">
                    Harga murah dan bersaing, bisa bandingkan harga kami dengan
                    rental mobil lain
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-12">
              <div className="card p-2">
                <div className="card-body">
                  <img
                    src="src\components\Main\images\icon_24hrs.png"
                    alt="icon 24h"
                  />
                  <h5 className="card-title">Layanan 24 Jam</h5>
                  <p className="card-text">
                    Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami
                    juga tersedia di akhir minggu
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-12">
              <div className="card p-2">
                <div className="card-body">
                  <img
                    src="src\components\Main\images\icon_professional.png"
                    alt="icon profesional"
                  />
                  <h5 className="card-title">Sopir Profesional</h5>
                  <p className="card-text">
                    Sopir yang profesional, berpengalaman, jujur, ramah dan
                    selalu tepat waktu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
