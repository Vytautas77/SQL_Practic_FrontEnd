const carWrapper = document.getElementById("carsWrapper");
const infoMessageBox = document.getElementById("infoMessageBox");
const carsFetch = "http://localhost:3000/cars/";

const carCard = (car) => {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("class", "carWrapper");

  const carTitle = document.createElement("h2");
  carTitle.setAttribute("class", "carTitle");
  carTitle.innerHTML = car.title;
  const carNumberPlates = document.createElement("h5");
  carNumberPlates.setAttribute("class", "carNumberPlates");
  carNumberPlates.innerHTML = `Chassis number: ${car.number_plates}`;
  const carUrl = document.createElement("img");
  carUrl.setAttribute("class", "carUrl");
  carUrl.src = car.image;
  const carPrice = document.createElement("h3");
  carPrice.setAttribute("class", "carPrice");
  carPrice.innerHTML = `Price: ${car.price} &#x20AC`;

  const delBtn = document.createElement("button");
  delBtn.setAttribute("class", "delBtn");
  delBtn.innerHTML = "DELETE CAR";

  delBtn.addEventListener("click", async () => {
    try {
      const carId = car.id;
      localStorage.setItem("carId", carId);
      const response = await fetch(carsFetch + carId, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data) {
        alert("INFORMATION DELETED SUCCESSFULLY.");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      alert("INFORMATION NOT DELETED.");
    }
  });

  wrapper.append(carTitle, carNumberPlates, carUrl, carPrice, delBtn);

  return wrapper;
};

const getCars = async () => {
  const response = await fetch(carsFetch);
  const cars = await response.json();
  if (cars.cars.length === 0) {
    const infoBox = document.createElement("div");
    infoBox.setAttribute("class", "infoBox");
    infoBox.innerHTML = "There are currently no car ads";
    infoMessageBox.appendChild(infoBox);
  } else {
    cars.cars
      .sort((a, b) => {
        return a.title > b.title ? 1 : -1;
      })
      .forEach((car) => {
        const card = carCard(car);
        carWrapper.append(card);
      });
  }
};

getCars();

// const getCars = async () => {
//   const response = await fetch(carsFetch);
//   const cars = await response.json();
//   cars.cars
//     .sort((a, b) => {
//       return a.title > b.title ? 1 : -1;
//     })
//     .forEach((car) => {
//       const card = carCard(car);
//       carWrapper.append(card);
//     });
// };
// getCars();
