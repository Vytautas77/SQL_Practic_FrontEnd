const AddBtn = document.getElementById("AddBtn");
const infoMessage = document.getElementById("infoMessage");
const linkRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
// const carNumberPlatesRegex = /^[A-Z0-9]{17}$ /; //^[abc\d]{17}$/;
const inputFetch = "http://localhost:3000/cars";

const inputData = () => {
  const carTitle = document.getElementById("carTitle").value;
  const carNumberPlates = document.getElementById("carNumberPlates").value;
  const carPhotoUrl = document.getElementById("carPhotoUrl").value;
  const carPrice = document.getElementById("carPrice").value;
  if (!carTitle) {
    infoMessage.innerHTML = "The Car model field is not entered!";
    throw new Error("The Car model field is not entered!");
  }

  if (!carNumberPlates) {
    infoMessage.innerHTML = "The Car number plates field is not entered!";
    throw new Error("The Car number plates field is not entered!");
  }
  // if (!carNumberPlatesRegex.test(carNumberPlates)) {
  //   infoMessage.innerHTML = "Invalid car number plate!";
  //   throw new Error("Invalid car number plate!");
  // }
  if (!carPhotoUrl) {
    infoMessage.innerHTML = "The Car photo URL field is not entered!";
    throw new Error("The Car photo URL field is not entered!");
  }
  if (!linkRegex.test(carPhotoUrl)) {
    infoMessage.innerHTML = "The Car photo URL invalid track link!";
    throw new Error("The Car photo URL invalid track link!");
  }
  if (!carPrice) {
    infoMessage.innerHTML = "The Car price field is not entered!";
    throw new Error("The Car price field is not entered!");
  }

  const inputs = {
    title: carTitle,
    number_plates: carNumberPlates,
    image: carPhotoUrl,
    price: carPrice,
  };
  return inputs;
};

AddBtn.addEventListener("click", async () => {
  const inputCar = inputData();
  try {
    const response = await fetch(inputFetch, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputCar),
    });
    const data = await response.json();
    if (data) {
      infoMessage.innerHTML = "Data uploaded successfully.";
      setTimeout(() => {
        window.location.replace("./index.html");
      }, 3000);
    }
  } catch (err) {
    infoMessage.innerHTML = "Data upload FAILED.";
  }
});
