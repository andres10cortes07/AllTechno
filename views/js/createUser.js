const validateProductData = (productData) => {
    for (let key in productData) {
        const value = productData[key];
        if (!value || value.length === 0) {
            return false;
        }
    }
    return true;
};

document.addEventListener("DOMContentLoaded", () => {
    const formToCreateUser = document.getElementById("form-create-user")

    formToCreateUser.addEventListener("submit", (e) => {
        e.preventDefault()
    
        const formData = new FormData(e.target);
        let productData = {};

        productData.identificacion = formData.get("identificacion")
        productData.correo = formData.get("correo")
        productData.nombres = formData.get("nombres")
        productData.apellidos = formData.get("apellidos")
        productData.celular = formData.get("celular")
        productData.rol = formData.get("rol")

        if (!validateProductData(productData)) {
            return Swal.fire({
                title: "Error",
                text: `Hay campos vacíos o inválidos`,
                icon: "error",
                timer: 5000
            });
        }

        fetchConsume(productData)
    })
})

const fetchConsume = (productData) => {
    fetch(`http://localhost:5000/allTechno/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
    })
    .then(res => {
        return res.json().then(data => {
            if (res.status === 400) {
                return Swal.fire({
                    title: "Error",
                    text: data.error || "Hay campos inválidos, revisa e intantalo de nuevo",
                    icon: "error"
                });
            } else {
                return data;
            }
        });
    })
    .then(data => {
        if (data) { 
            return Swal.fire({
                title: "Usuario creado",
                text: "Usuario creado con exito, hemos enviado la clave al correo ingresado",
                icon: "success"
            }).then(res => window.location.href = "../admin/home.html")
        }
    })
    .catch(e => {
        console.log(e);
        return Swal.fire({
            title: "Error",
            text: "Hubo un error al crear el usuario, intentalo de nuevo",
            icon: "error"
        });
    });
}