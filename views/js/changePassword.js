const validateProductData = (productData) => {
    for (let key in productData) {
        const value = productData[key];
        if (!value || value.length === 0) {
            return false;
        }
    }
    return true;
};

document.addEventListener("DOMContentLoaded", (e) => {
    const form = document.getElementById("form-modify-password");
    const submitButton = form.querySelector("button[type='submit']");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Desactivar el botón de envío para evitar envíos múltiples
        submitButton.disabled = true;

        const formData = new FormData(e.target);
        let productData = {
            currentPassword: formData.get("currentPass"),
            newPassword: formData.get("newPass")
        };

        if (!validateProductData(productData)) {
            submitButton.disabled = false; // Reactivar el botón de envío
            return Swal.fire({
                title: "Error",
                text: "Hay campos vacíos o inválidos",
                icon: "error",
                timer: 5000
            });
        }

        fetch(`http://localhost:5000/allTechno/user/changePass`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
        })
        .then(res => {
            // Si el status es 204, no hay contenido que analizar
            if (res.status === 204) {
                return { message: "Password changed successfully" };
            }
            return res.json();
        })
        .then(data => {
            if (data.error) {
                submitButton.disabled = false; // Reactivar el botón de envío
                return Swal.fire({
                    title: "Error",
                    text: data.error || "Hay campos inválidos, revisa e intentalo de nuevo",
                    icon: "error"
                });
            } else {
                return Swal.fire({
                    title: "Clave modificada",
                    text: "Tu contraseña ha sido modificada exitosamente, ingresa de nuevo",
                    icon: "success"
                }).then(res => {
                    window.location.href = "../page-login.html";
                });
            }
        })
        .catch(e => {
            submitButton.disabled = false; // Reactivar el botón de envío en caso de error
            return Swal.fire({
                title: "Error",
                text: "Hubo un error al cambiar la clave, intentalo de nuevo",
                icon: "error"
            });
        });
    });
});