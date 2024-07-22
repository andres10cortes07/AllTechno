// The user can delete products both in their group view and in the view of each one, 
// so the cases to access their category and id are also handled.

export const deleteProducts = (btnsDelete, category) => {
    btnsDelete.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            // Find the nearest swiper-slide
            const swiperSlide = e.target.closest(".swiper-slide");

            // if there is a swiper-slide it is in the group view
            if (swiperSlide) {
                const cardProduct = swiperSlide.querySelector(".card-for-click");

                if (cardProduct) {
                    const idProduct = cardProduct.dataset.id;

                    Swal.fire({
                        title: "¿Estás seguro de eliminar este producto?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Si, eliminar!",
                        cancelButtonText: "Cancelar",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            makeFetchProduct(category, idProduct);
                        }
                    });
                }
            } else {
                // If swiperSlide is not found, it is found in the individual product view
                const url = new URL(window.location.href); 
                const category = url.searchParams.get("category");
                const idProduct = url.searchParams.get("id");

                if (category && idProduct) {
                    Swal.fire({
                        title: "¿Estás seguro de eliminar este producto?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Si, eliminar!",
                        cancelButtonText: "Cancelar",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            makeFetchProduct(category, idProduct);
                        }
                    });
                } else {
                    console.error(
                        "No se encontraron swiper-slide o parámetros necesarios en la URL."
                    );
                }
            }
        });
    });
};

const makeFetchProduct = (category, idProduct) => {
    fetch(`http://localhost:5000/allTechno/${category}/${idProduct}`, {
        method: "DELETE",
    })
        .then((res) => {
            if (res.status == 404) {
                return Swal.fire({
                    title: "Error",
                    text: "Producto no encontrado",
                    icon: "error",
                    confirmButtonText: "error",
                });
            } else if (res.status == 200) {
                return Swal.fire({
                    title: "Eliminado",
                    text: "El producto ha sido eliminado exitosamente",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    // If you are in individual view you must return to group view
                    if(window.location.href.includes("product.html")) {window.location.href = `http://127.0.0.1:5500/views/admin/${category}.html`}
                    // When deleting in group view it simply refreshes the page
                    else {window.location.reload()}
                });
            } else {
                throw new Error("Ha ocurrido un error en la eliminación del producto");
            }
        })
        .catch((e) => {
            return Swal.fire({
                title: "Error",
                text: e || "Error",
                icon: "error",
                confirmButtonText: "OK",
            });
        });
};

const btnsDeleteUsers = document.querySelectorAll(".btn-delete-user")
btnsDeleteUsers.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const rowNear = e.target.closest("tr")
        const identification = rowNear.querySelector(".identificacion").textContent
        makeFetchUser(identification)
    })
})

const makeFetchUser = (identification) => {
    fetch(`http://localhost:5000/allTechno/user/${identification}`, {
        method: "DELETE",
    })
        .then((res) => {
            if (res.status == 404) {
                return Swal.fire({
                    title: "Error",
                    text: "Usuario no encontrado",
                    icon: "error",
                    confirmButtonText: "error",
                });
            } else if (res.status == 200) {
                return Swal.fire({
                    title: "Eliminado",
                    text: "El usuario ha sido eliminado exitosamente",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    window.location.reload()
                });
            } else {
                throw new Error("Ha ocurrido un error en la eliminación del usuario");
            }
        })
        .catch((e) => {
            return Swal.fire({
                title: "Error",
                text: e || "Error",
                icon: "error",
                confirmButtonText: "OK",
            });
        });
}