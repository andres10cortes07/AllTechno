export const loadProducts = (category) => {

    fetch(`http://localhost:5000/allTechno/${category}`)
    .then (res => res.json())
    .then (products => {
        const codeProducts = products.map(product => {
            let swiperSlidesHTML = ""; // Inicializamos una cadena vacía para contener el HTML de los swiper-slide

            // Iteramos sobre cada url y generamos el HTML del swiper-slide correspondiente
            for (let i = 1; i <= 6; i++) {
              const url = product[`url${i}`]; // Obtenemos la URL correspondiente

              // Verificamos si la URL no es null
              if (url !== null && url !== "null") {
                swiperSlidesHTML += `
                  <swiper-slide>
                    <div class="swiper-zoom-container">
                      <img src="../../${url}" alt="img-product"/>
                    </div>
                  </swiper-slide>
                `;
              }
            }

            if (swiperSlidesHTML !== "") {
                return `
                    <div class="swiper-wrapper" data-id="${product.id}">
                        <div class="swiper-slide">
                            <swiper-container style="--swiper-navigation-color: transparent; --swiper-navigation-size: 1.5em; --swiper-pagination-color: #000;" class="mySwiper" pagination="true" pagination-clickable="true" navigation="true" space-between="30" loop="true">
                                ${swiperSlidesHTML}
                            </swiper-container>
                            <div class="data-product">

                                ${category === "desktopComputers" ? `
                                <h4 class="product-name">${product.procesador + " + " + product.almacenamiento + " + " + product.ram}</h4>
                                <span class="product-price">$${product.precio.toLocaleString()}</span>
                                ` : `
                                    <h4 class="product-name">${product.marca} ${product.modelo}</h4>
                                    <span class="product-price">$${product.precio.toLocaleString()}</span>
                                `}
                            </div>
                        </div>
                    </div>

                `
            }
            else {
                return ""
            }

        }).join("");

        const container = document.querySelector(".slider-card > .container")
        container.innerHTML = `
                <div class="container">
                    ${codeProducts}
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
                
                if (!(e.target.className == "mySwiper")) window.location.href = `product.html?id=${id}&category=${category}`
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
        res = res[0]
        let codeMain = ""
        switch (category) {
            case "cellphones":
                codeMain = `
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
                                    <swiper-container style="--swiper-navigation-color: #777; --swiper-navigation-size: 1.5em; --swiper-pagination-color: #000;" class="mySwiper" pagination="true" pagination-clickable="true" navigation="true" space-between="30" loop="true">
                                        <swiper-slide>
                                            <div class="swiper-zoom-container">
                                                <img src="../../${res.url1}" alt="img-product" />
                                            </div>
                                        </swiper-slide>
                                        <swiper-slide>
                                            <div class="swiper-zoom-container">
                                                <img src="../../${res.url2}" alt="img-product" />
                                            </div>
                                        </swiper-slide>
                                        <swiper-slide>
                                            <div class="swiper-zoom-container">
                                                <img src="../../${res.url3}" alt="img-product" />
                                            </div>
                                        </swiper-slide>
                                        <swiper-slide>
                                            <div class="swiper-zoom-container">
                                                <img src="../../${res.url4}" alt="img-product" />
                                            </div>
                                        </swiper-slide>
                                        <swiper-slide>
                                            <div class="swiper-zoom-container">
                                                <img src="../../${res.url5}" alt="img-product" />
                                            </div>
                                        </swiper-slide>
                                        <swiper-slide>
                                            <div class="swiper-zoom-container">
                                                <img src="../../${res.url6}" alt="img-product" />
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
                                    <li>Bateria : ${res.bateria} MaH</li>
                                    <li>Procesador : ${res.procesador}</li>
                                    <li>Camara frontal : ${res.camaraFrontal} MP</li>
                                    <li>Camara Posterior : ${res.camaraPosterior} MP</li>
                                    <li>Resolucion : ${res.resolucion}</li>
                                    <li>Huella Digital : ${res.huella}</li>
                                    <li>Almacenaminto: ${res.almacenamiento} GB</li>
                                    <li>RAM: ${res.ram} GB</li>
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

            case "laptops":
                codeMain = `
                    <div class="row-ttl-home">
                        <a href="laptops.html"><h3>Portatiles</h3></a>
                        <div>
                            <hr>
                        </div>  
                    </div>
        
        
                    <div class="ctn-details-pro">
            
                        <div class="imgs-pro">
                            <div class="swiper-wrapper" data-id="${res.id}">
                                <div class="swiper-slide">
                                    <swiper-container style="--swiper-navigation-color: #777; --swiper-navigation-size: 1.5em; --swiper-pagination-color: #000;" class="mySwiper" pagination="true" pagination-clickable="true" navigation="true" space-between="30" loop="true">
                                        <swiper-slide>
                                            <div class="swiper-zoom-container">
                                                <img src="../../${res.url1}" alt="img-product" />
                                            </div>
                                        </swiper-slide>
                                        <swiper-slide>
                                            <div class="swiper-zoom-container">
                                                <img src="../../${res.url2}" alt="img-product" />
                                            </div>
                                        </swiper-slide>
                                        <swiper-slide>
                                            <div class="swiper-zoom-container">
                                                <img src="../../${res.url3}" alt="img-product" />
                                            </div>
                                        </swiper-slide>
                                        <swiper-slide>
                                            <div class="swiper-zoom-container">
                                                <img src="../../${res.url4}" alt="img-product" />
                                            </div>
                                        </swiper-slide>
                                        <swiper-slide>
                                            <div class="swiper-zoom-container">
                                                <img src="../../${res.url5}" alt="img-product" />
                                            </div>
                                        </swiper-slide>
                                        <swiper-slide>
                                            <div class="swiper-zoom-container">
                                                <img src="../../${res.url6}" alt="img-product" />
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
                                    <li>Procesador : ${res.procesador}</li>
                                    <li>Grafica : ${res.grafica}</li>
                                    <li>Resolución : ${res.resolucion}</li>
                                    <li>Tamaño de pantalla : ${res.tamañoPantalla} pulgadas</li>
                                    <li>Almacenaminto : ${res.almacenamiento} GB</li>
                                    <li>RAM : ${res.ram} GB</li>
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