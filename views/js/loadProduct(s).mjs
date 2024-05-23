export const loadProducts = (category) => {

    fetch(`http://localhost:5000/allTechno/${category}`)
    .then (res => res.json())
    .then (products => {
        const codeProducts = products.map(product => {
            return `
                <div class="swiper-wrapper" data-id="${product.id}">
                <div class="swiper-slide">
                <swiper-container style="--swiper-navigation-color: transparent; --swiper-navigation-size: 1.5em; --swiper-pagination-color: #000;" class="mySwiper" pagination="true" pagination-clickable="true" navigation="true" space-between="30" loop="true">
                        <swiper-slide>
                            <div class="swiper-zoom-container">
                                <img src="${product.url1}" />
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="swiper-zoom-container">
                                <img src="${product.url2}" />
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="swiper-zoom-container">
                                <img src="${product.url3}" />
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="swiper-zoom-container">
                                <img src="${product.url4}" />
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="swiper-zoom-container">
                                <img src="${product.url5}" />
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="swiper-zoom-container">
                                <img src="${product.url6}" />
                            </div>
                        </swiper-slide>
                    </swiper-container>
                    <div class="data-product">
                        <h4 class="product-name">${product.marca} ${product.modelo}</h4>
                        <span class="product-price">$${product.precio.toLocaleString()}</span>
                    </div>
                </div>
                </div>
            `

        }).join("");

        const main = document.querySelector("main");
        main.innerHTML = `
            <div class="row-ttl-home">
                <h3>Portátiles</h3>
                <div>
                    <hr>
                </div>
                <select name="filter" class="select-filter">
                    <option value="">Ordenar por más nuevos</option>
                    <option value="">Ordenar por precio: de menor a mayor</option>
                    <option value="">Ordenar por precio: de mayor a menor</option>
                    <option value="">Ordenar por popularidad</option>
                </select>
            </div>
            <div class="slider-card">
                <div class="container">
                    ${codeProducts}
                </div>
            </div>
        `;

        const cards = document.querySelectorAll(".swiper-wrapper");

        cards.forEach(card => {
            let activeSwiper;

            card.addEventListener("mouseover", (e) => {
                card.style.cursor = "pointer";
                activeSwiper = e.target.closest("swiper-container")
                
                if (activeSwiper) activeSwiper.style.setProperty("--swiper-navigation-color", "#777");
            });

            card.addEventListener("mouseout", (e) => {
                if (activeSwiper) activeSwiper.style.setProperty("--swiper-navigation-color", "transparent")
            });

            card.addEventListener("click", (e) => {
                const cardClicked = e.target.closest(".swiper-wrapper");
                const id = cardClicked.dataset.id;
                
                if (!(e.target.className == "mySwiper")) loadProduct(category, id)
            });
        });
    })
    .catch(error => console.error("Error al cargar los productos:", error));
}

export const loadProduct = (category, id) => {
    const link = document.createElement("link");
    link.href = "../css/style_product.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    fetch(`http://localhost:5000/allTechno/${category}/${id}`)
    .then (res => 
        res.json()
    )
    .then (res => {
        res = res[0];

        switch (category) {
            case "cellphones":
                const codeMain = `
                    <div class="row-ttl-home">
                        <h3>Celulares</h3>
                        <div>
                            <hr>
                        </div>  
                    </div>
        
        
                    <div class="ctn-details-pro">
            
                        <div class="imgs-pro">
                            <div class="swiper-wrapper" data-id="${res.id}">
                                <div class="swiper-slide">
                                    <swiper-container style="--swiper-navigation-color: #777; --swiper-navigation-size: 1.5em; --swiper-pagination-color: #000;" class="mySwiper" pagination="true" pagination-clickable="true" navigation="true" space-between="30" loop="true"
                                        <swiper-slide>
                                            <div class="swiper-zoom-container">
                                                <img src="${res.url1}" />
                                            </div>
                                        </swiper-slide>
                                        <swiper-slide>
                                            <div class="swiper-zoom-container">
                                                <img src="${res.url2}" />
                                            </div>
                                        </swiper-slide>
                                        <swiper-slide>
                                            <div class="swiper-zoom-container">
                                                <img src="${res.url3}" />
                                            </div>
                                        </swiper-slide>
                                        <swiper-slide>
                                            <div class="swiper-zoom-container">
                                                <img src="${res.url4}" />
                                            </div>
                                        </swiper-slide>
                                        <swiper-slide>
                                            <div class="swiper-zoom-container">
                                                <img src="${res.url5}" />
                                            </div>
                                        </swiper-slide>
                                        <swiper-slide>
                                            <div class="swiper-zoom-container">
                                                <img src="${res.url6}" />
                                            </div>
                                        </swiper-slide>
                                    </swiper-container>
                                </div>
                            </div>
                        </div>
            
                        <div class="ctn-info-pro">
                            <div class="info">
                                <h4>${res.marca + " " + res.modelo}</h4>
                                <ul>
                                    <li>Bateria (MaH): ${res.bateria}</li>
                                    <li>Procesador : ${res.procesador}</li>
                                    <li>Camara frontal (MP) : ${res.camaraFrontal}</li>
                                    <li>Camara Posterior (MP) : ${res.camaraPosterior}</li>
                                    <li>Resolucion : ${res.resolucion}</li>
                                    <li>Huella Digital : ${res.huella}</li>
                                    <li>Almacenaminto (GB): ${res.almacenamiento}</li>
                                    <li>RAM (GB): ${res.ram}</li>
                                    <li>Colores disponibles: ${res.colores}</li>
                                </ul>
            
            
                                <h5>$${res.precio.toLocaleString()}</h5>
                            </div>
                        </div>
        
                    </div>
                `;

                document.querySelector("main").innerHTML = "";
                document.querySelector("main").innerHTML = codeMain;

                break;

            // case "powersupplies":
                
            //     break;
        
            // case "monitor":
                
            //     break;

            // case "laptops":
                
            //     break;
                
            // case "processors":
                
            //     break;

            // case "rams":
                
            //     break;
        
            // case "desktoppcs":
                
            //     break;

            default:
                //! aqui puedo realizar el mostrar 404 de elementos UI
                break;
        }
    })
    .catch (error => console.error("Error: ", error))
}