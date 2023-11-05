import Footer from "./components/Footer/Footer";
import Navbar from "./components/Header/Navbar";
import Hero from "./components/Main/Hero";
import "./CariMobil.css";
import { useEffect, useState } from "react";

function CariMobil() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getCars = async () => {
      const respons = await fetch(
        "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json"
      );
      const data = await respons.json();
      setCars(data);
    };
    getCars();
  }, []);

  return (
    <>
      <Navbar />

      <Hero />

      <section id="carimobil" className="border rounded">
        <div id="search" className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <label>Tipe Driver</label>
              <select className="form-select" id="specificSize">
                <option selected>Pilih Tipe Driver</option>
                <option value="1">Dengan Supir</option>
                <option value="2">Tanpa Supir (Lepas Kunci)</option>
              </select>
            </div>
            <div className="col">
              <label>Tanggal</label>
              <input type="date" className="form-control" id="inputDate" />
            </div>
            <div className="col">
              <label>Waktu Jemput/Ambil</label>
              <select className="form-select" id="inputTime">
                <option selected>Pilih Waktu</option>
                <option value="08:00:00">08.00 WIB</option>
                <option value="09:00:00">09.00 WIB</option>
                <option value="10:00:00">10.00 WIB</option>
                <option value="11:00:00">11.00 WIB</option>
                <option value="12:00:00">12.00 WIB</option>
              </select>
            </div>
            <div className="col">
              <label>Jumlah Penumpang (Optional)</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="inputPassenger"
                  placeholder="Jumlah Penumpang"
                />
                <div className="input-group-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-people"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="col">
              <div>
                <button id="serach-btn">Cari Mobil</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="hasilcari" style={{}}>
        <div className="container">
          <div id="container-cars" className="row row-cols-3 g-3">
            {cars.map((car) => (
              <div className="wrapper" key={car.id}>
                <div className="cars-card">
                  <img
                    src={car.image}
                    style={{ width: "100%", height: "300px" }}
                  />
                  <div className="container-fluid d-flex flex-column gap-3">
                    <p>
                      {car.manufacture}/{car.type}
                    </p>
                    <h5 className="fw-bold">Rp {car.rentPerDay} / hari</h5>
                    <p>{car.description}</p>
                  </div>
                  <ul className="d-flex flex-column">
                    <li>
                      <img src="images/fi_users.png" alt="" />
                      {car.capacity}
                    </li>
                    <li>
                      <img src="images/fi_settings.png" alt="" />
                      {car.transmission}
                    </li>
                    <li>
                      <img src="images/fi_calendar.png" alt="" />
                      {car.year}
                    </li>
                  </ul>
                  <button>Pilih Mobil</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default CariMobil;
