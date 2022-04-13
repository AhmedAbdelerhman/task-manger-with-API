const formDOM = document.querySelector(".form");
const usernameInputDOM = document.querySelector(".username-input");
const passwordInputDOM = document.querySelector(".password-input");
const formAlertDOM = document.querySelector(".form-alert");
const btnDOM = document.querySelector("#data");

document.querySelector(".btn-block").addEventListener("click", async (e) => {
  formAlertDOM.classList.remove("text-success");

  e.preventDefault();
  const email = usernameInputDOM.value;
  const password = passwordInputDOM.value;

  try {
    const { data } = await axios.post("http://localhost:3000/api/auth/signup", {
      email: email,
      password: password,
    });

    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = data.msg;
    formAlertDOM.classList.add("text-success");
    usernameInputDOM.value = "";
    passwordInputDOM.value = "";

    localStorage.setItem("token", data.token);

  } catch (error) {
    console.log(error);
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
  }, 2000);
});

// btnDOM.addEventListener('click', async () => {
//   const token = localStorage.getItem('token')
//   try {
//     const { data } = await axios.get('/api/v1/dashboard', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     resultDOM.innerHTML = `<h5>${data.msg}</h5><p>${data.secret}</p>`

//     data.secret
//   } catch (error) {
//     localStorage.removeItem('token')
//     resultDOM.innerHTML = `<p>${error.response.data.msg}</p>`
//   }
// })
