document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:5000/allTechno/api/session')
        .then(res => {
            if (!res.ok) {
                throw new Error('Debes iniciar sesión para acceder a esta página.');
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
                document.getElementById('loading-overlay').style.display = 'none'; // Hide loading layer
                document.getElementById('admin-content').style.display = 'block'; // show content
            }
        })
        .catch(error => {
            Swal.fire({
                title: "No autorizado",
                text: error,
                icon: "error",
                confirmButtonText: "OK"
            }).then(() => {
                window.history.back();
            });
        });
})