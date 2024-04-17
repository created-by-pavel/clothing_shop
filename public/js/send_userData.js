const submitForm = (formId, url) => {
  const form = document.getElementById(formId);
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(JSON.stringify(data));

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((responseData) => {
      console.log("Service response:", responseData);
      if (responseData && responseData.ok) {
        console.log('logged in');
        window.location.replace("https://clothing-shop-5n2c.onrender.com");
      }
    }).catch((error) => {
      console.error("Error:", error);
    });
  });
};

submitForm('loginForm', 'https://clothing-shop-5n2c.onrender.com/login');
submitForm('signInForm', 'https://clothing-shop-5n2c.onrender.com/signUp');