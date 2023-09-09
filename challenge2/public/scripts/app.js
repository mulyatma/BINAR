class App {
  constructor() {
    // this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("container-cars");
  }

  async init() {
    await this.load();
    this.run();

    // Register click listener
    // this.clearButton.onclick = this.clear;
    // this.loadButton.onclick = this.run;
  }

  run = () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.className = "col";
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async load() {
    this.clear();
    let cars = [];
    cars = await Binar.listCars();
    const passenger = document.getElementById("inputPassenger").value;
    const time = document.getElementById("inputTime").value;
    const date = document.getElementById("inputDate").value;
    const hiden = (document.getElementById("hasilcari").style.visibility =
      "visible");

    const fullDateTime = new Date(`${date} ${time}`);

    if (time == "" || date == "") {
      alert("Form Belum Lengkap");
    }

    const condition = cars.filter((i) => {
      if (passenger === "") {
        return i.available && new Date(i.availableAt).getTime() >= fullDateTime;
      } else {
        return (
          i.available &&
          i.capacity >= passenger &&
          new Date(i.availableAt).getTime() >= fullDateTime
        );
      }
    });

    console.log(passenger);

    Car.init(condition);

    // Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
