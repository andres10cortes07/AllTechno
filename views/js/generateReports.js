document.querySelector(".btn-pdf-user").addEventListener("click", () => fetchUserPDF());
document.querySelector(".btn-excel-user").addEventListener("click", () => fetchUserExcel());
document.querySelector(".btn-pdf-product").addEventListener("click", () => fetchProductsPDF());
document.querySelector(".btn-excel-product").addEventListener("click", () => fetchProductsExcel());

const fetchUserPDF = () => {
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
}

const fetchUserExcel = () => {
    fetch("http://localhost:5000/allTechno/generate/reporteexcel/users")
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
        a.download = "Reporte de usuarios.xlsx"; 
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
}

const fetchProductsPDF = () => {
    fetch("http://localhost:5000/allTechno/generate/reportpdf/products")
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
        a.download = "Reporte de productos.pdf"; 
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
}

const fetchProductsExcel = () => {
    fetch("http://localhost:5000/allTechno/generate/reporteexcel/products")
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
        a.download = "Reporte de productos.xlsx"; 
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
}