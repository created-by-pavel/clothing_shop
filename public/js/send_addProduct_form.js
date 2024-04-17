const button = document.getElementById('submitButton');
const form = document.getElementById('addProductForm');

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price")),
    images: formData.get("images").split(",")
  };
  console.log(JSON.stringify(data));

  fetch("http://localhost:81/products/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then((responseData) => {
      console.log("Service response:", responseData);
      if (responseData && responseData.ok) {
        window.location.replace("https://clothing-shop-5n2c.onrender.com");
      }})
    .catch((error) => {
      console.error("Error:", error);
    });
});
