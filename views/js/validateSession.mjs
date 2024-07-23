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
                if(window.location.href.includes("admin/home")){
                    if(data.rol === "Admin"){
                        document.querySelector(".actions").style.display = "none"
                        document.querySelector(".btns-users div:first-child").style.display = "none"
                        document.querySelector(".btns-users").style.justifyContent = "start"
                        document.querySelector(".btns-users div:last-child").style.marginLeft = "50px"
    
                        const btnsForLeader = document.querySelectorAll(".btns-leader")
                        btnsForLeader.forEach(btn => {
                            btn.style.display = "none"
                        })
                    }
                }
                else if (window.location.href.includes("createUser")){
                    if(data.rol === "Admin"){
                        return Swal.fire({
                            title: "No autorizado",
                            text: "No cuentas con el rol necesario para acceder a esta página",
                            icon: "error",
                            confirmButtonText: "OK"
                        }).then(() => {
                            window.history.back();
                        });
                    }
                }
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