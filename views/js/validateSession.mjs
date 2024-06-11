document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:5000/allTechno/api/session')
        .then(res => {
            if (!res.ok) {
                throw new Error('Not authenticated');
            }
            return res.json();
        })
        .then(data => {
            if (!(data.loggedIn)) {
                Swal.fire({
                    title: "No autorizado",
                    text: "Debes iniciar sesión para acceder a esta página.",
                    icon: "error",
                    confirmButtonText: "OK"
                }).then(() => {
                    window.history.back();
                });
            }
            else {
                document.getElementById('loading-overlay').style.display = 'none'; // Ocultar la capa de carga
                document.getElementById('admin-content').style.display = 'block'; // Mostrar contenido
            }
        })
        .catch(error => {
            Swal.fire({
                title: "No autorizado",
                text: "Debes iniciar sesión para acceder a esta página.",
                icon: "error",
                confirmButtonText: "OK"
            }).then(() => {
                window.history.back();
            });
        });
})