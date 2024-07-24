document.addEventListener("DOMContentLoaded", () => {

    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = url.searchParams;

    const identificacion = params.get('identificacion');
    
    fetch(`http://localhost:5000/allTechno/user/${identificacion}`)
    .then(res => res.json())
    .then(data => {
        data = data[0]

        const inpIdentificacion = document.getElementById("identificacion")
        const inpCorreo = document.getElementById("correo")
        const inpNombres = document.getElementById("nombres")
        const inpApellidos = document.getElementById("apellidos")
        const inpCelular = document.getElementById("celular")
        const inpRol = document.getElementById("rol")

        inpIdentificacion.value = data.identificacion
        inpCorreo.value = data.correo
        inpNombres.value = data.nombres
        inpApellidos.value = data.apellidos
        inpCelular.value = data.celular
        inpRol.value = data.rol
    })
    .catch(error => {
        return Swal.fire({
            title: "Error",
            text: "Hubo un error al acceder a los datos del usuario, intentalo de nuevo",
            icon: "error"
        }).then(res => window.location.href = "home.html")
    })

    const form = document.getElementById("form-edit-user")

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        let productData = {};
    
        productData.identificacion = formData.get("identificacion")
        productData.correo = formData.get("correo")
        productData.nombres = formData.get("nombres")
        productData.apellidos = formData.get("apellidos")
        productData.celular = formData.get("celular")
        productData.rol = formData.get("rol")
    
        fetch(`http://localhost:5000/allTechno/user/${identificacion}`, {
            method : "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(productData)
        })
        .then(res => {
            if(!res.ok) {
                return Swal.fire({
                    title: "Error",
                    text: `Hubo un error al editar el usuario, intentalo de nuevo`,
                    icon: "error"
                });
            }
            return res.json()
        })
        .then(res => {
            return Swal.fire({
                title: "Usuario editado",
                text: "Usuario editado con exito, puedes ver los cambios aplicados en el inicio",
                icon: "success"
            }).then(res => window.location.href = "../admin/home.html")
        })
        .catch(error => {
            return Swal.fire({
                title: "Error",
                text: error || `Hubo un error al editar el usuario, intentalo de nuevo`,
                icon: "error"
            });
        })
    })
})