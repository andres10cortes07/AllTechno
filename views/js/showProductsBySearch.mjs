const searchBar = document.querySelector(".search-bar")
searchBar.addEventListener("input", (e) => {

    if(searchBar.value.length > 3){
        setTimeout(() => {
            fetch(`http://localhost:5000/allTechno/${searchBar.value}`)
            .then(res => {
                if(res.status == 404){
                    document.querySelector(".dropdown-menu-search").style.display = "block"
                    document.querySelector(".dropdown-menu-search > ul").innerHTML = `<li>No hay productos similares</li>`
                }
                return res.json()
            })
            .then(products  => {
                const codeAllProducts = products.map(product => {
                    if (document.location.href.includes("index.html")) {
                        return `
                        <a href="views/products/product.html?id=${product.id}&category=${product.tabla}"><li>${product.union_tablas}</li></a>
                        `
                    }
                    return `
                        <a href="product.html?id=${product.id}&category=${product.tabla}"><li>${product.union_tablas}</li></a>
                    `
                }).join("")

                document.querySelector(".dropdown-menu-search").style.display = "block"
                document.querySelector(".dropdown-menu-search ul").innerHTML = ""
                document.querySelector(".dropdown-menu-search ul").innerHTML = codeAllProducts
            })

            .catch(error => console.error("Error: " + error))
        }, 1000)
    }
    else if (searchBar.value.length == 0){
        document.querySelector(".dropdown-menu-search").style.display = "none"
    }

})