document.querySelector(".btn-pdf-user").addEventListener("click", (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/allTechno/generate/reportpdf/users")
        .then(response => {
            if (!response.ok) {
                throw new Error("No autorizado");
            }
            return response.blob(); 
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "Reporte de usuarios.pdf"; 
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            Swal.fire({
                title: "Reporte descargado exitosamente",
                icon: "success",
                confirmButtonText: "OK"
            });
        })
        .catch(error => {
            Swal.fire({
                title: "Error",
                text: error.message || "Ha ocurrido un error al descargar el reporte.",
                icon: "error",
                confirmButtonText: "OK"
            });
        });
});