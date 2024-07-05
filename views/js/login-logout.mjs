export class SesionManagement {

  static login = () => {

    if (validateEmail() && validatePassword()) {
      fetch("http://localhost:5000/allTechno/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          correo: inpEmail.value,
          contraseña: inpPass.value
        })
      })

      .then((res) => {
          if (res.status === 401) {
            return res.json().then((data) => {
              throw new Error(data.error);
            });
          }
          return res.json();
      })

      .then((res) => {
          return Swal.fire({
            title: "Inicio de sesión exitoso",
            text: `Bienvenido ${res.nombres}`,
            icon: "success",
          }).then((res) => {
            window.location.href = "admin/home.html";
          });
      })

      .catch((error) => {
          Swal.fire({
            title: "Error",
            text: error.message || "Ocurrio un error al iniciar sesión, intentalo de nuevo",
            icon: "error",
          });
      });
    }
  };

  static logout = () => {
    fetch("http://localhost:5000/allTechno/admin/logout")
    .then((res) => {
        return res.json();
    })

    .then((res) => {
      if (res.error) {
        throw new Error (`Error al cerrar sesión`)
      } 
      else {
        return Swal.fire({
          title: "Sesion cerrada",
          text: `Has cerrado tu sesión`,
          icon: "success",
        }).then((res) => (window.location.href = "../../index.html"));
      }
    })

    .catch(error => {
      return Swal.fire({
        title: "Error",
        text: error ,
        icon: "error",
      })
    })
  };
}
