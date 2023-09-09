class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
      <div class="wrapper">
        <div class="cars-card">
          <img src="${this.image}" style="width: 100%; height:300px" />
          <div class="container-fluid d-flex flex-column gap-3">
            <p>${this.manufacture}/${this.type}</p>
            <h5 class="fw-bold">Rp ${this.rentPerDay} / hari</h5>
            <p>
              ${this.description}
            </p>
          </div>
          <ul class="d-flex flex-column">
          <li><img src="images/fi_users.png" alt="" />${this.capacity}</li>
          <li><img src="images/fi_settings.png" alt="" />${this.transmission}</li>
          <li><img src="images/fi_calendar.png" alt="" />${this.year}</li>
          </ul>
          <button>Pilih Mobil</button>
        </div>
      </div>
    `;
  }
}
