const showError = () => {
    const codeErr = `
    <div class="container">
        <h1 class="first-four">4</h1>
        <div class="cog-wheel1">
            <div class="cog1">
                <div class="top"></div>
                <div class="down"></div>
                <div class="left-top"></div>
                <div class="left-down"></div>
                <div class="right-top"></div>
                <div class="right-down"></div>
                <div class="left"></div>
                <div class="right"></div>
            </div>
        </div>
        <h1 class="second-four">4</h1>
        <p class="wrong-para">OOPS! Pagina no encontrada!</p>
    </div>
    `   

    document.querySelector("main").innerHTML = "";
    document.querySelector("main").innerHTML = codeErr;

    const link = document.createElement("link");
    link.href = "../css/style_error.css";
    link.rel = "stylesheet";
    document.querySelector("head").appendChild(link);

    const script = document.createElement("script");
    script.src = "../js/404.mjs"
    script.type = "module"
    document.querySelector("head").appendChild(script)

    return codeErr
}

export const loadProducts = (category, order) => {
    fetch(`http://localhost:5000/allTechno/${category}/${order}`)
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
    const categories = ["cellphones", "laptops", "powerSupplies", "screens", "processors", "ram", "desktopComputers"]

    if (!categories.includes(category)) showError()

    else {
        const link = document.createElement("link");
        link.href = "../css/style_product.css";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    
        fetch(`http://localhost:5000/allTechno/${category}/${id}`)
        .then (res => 
            res.json()
        )
        .then (res => {
            if(res.error){
                return showError()
            }
            res = res[0]
            let codeMain = ""
            let codeSwiperSlides = ""
    
            switch (category) {
                case "cellphones":
                    for (let i = 1; i <= 6; i++){
                        const url = res[`url${i}`]
    
                        if(url !== null && url !== "null") {
                            codeSwiperSlides += `
                            <swiper-slide>
                                <div class="swiper-zoom-container">
                                    <img src="../../${url}" alt="img-product"/>
                                </div>
                            </swiper-slide>
                        `
                        }
                    }
    
                    if (codeSwiperSlides !== "") {
                        codeMain = `
                        <div class="row-ttl-home">
                            <a href="cellphones.html"><h3>Celulares</h3></a>
                            <div>
                                <hr>
                            </div>  
                        </div>
        
                        <div class="ctn-details-pro">
            
                            <div class="imgs-pro">
                                <div class="swiper-wrapper" data-id="${res.id}">
                                    <div class="swiper-slide">
                                        <swiper-container style="--swiper-navigation-color: #777; --swiper-navigation-size: 1.5em; --swiper-pagination-color: #000;" class="mySwiper" pagination="true" pagination-clickable="true" navigation="true" space-between="30" loop="true">
                                            ${codeSwiperSlides}
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
                                        <li>Camara Frontal : ${res.camaraFrontal} MP</li>
                                        <li>Camara Posterior : ${res.camaraPosterior} MP</li>
                                        <li>Resolución : ${res.resolucion}</li>
                                        <li>Huella : ${res.huella}</li>
                                        <li>Almacenamiento : ${res.ram} GB</li>
                                        <li>Ram : ${res.ram} GB</li>
                                        <li>Colores disponibles : ${res.colores}</li>
                                    </ul>
                        
                        
                                    <h5>$${res.precio.toLocaleString()}</h5>
                                </div>
                            </div>
                        </div>
                        `
                    }
    
                document.querySelector("main").innerHTML = "";
                document.querySelector("main").innerHTML = codeMain;
    
    
                    break;
    
                case "laptops":
                    for (let i = 1; i <= 6; i++){
                        const url = res[`url${i}`]
    
                        if(url !== null && url !== "null") {
                            codeSwiperSlides += `
                            <swiper-slide>
                                <div class="swiper-zoom-container">
                                    <img src="../../${url}" alt="img-product"/>
                                </div>
                            </swiper-slide>
                        `
                        }
                    }
    
                    if (codeSwiperSlides !== "") {
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
                                            ${codeSwiperSlides}
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
                                        <li>Almacenamiento : ${res.almacenamiento} GB</li>
                                        <li>Ram : ${res.ram} GB</li>
                                        <li>Colores disponibles : ${res.colores}</li>
                                    </ul>
                        
                        
                                    <h5>$${res.precio.toLocaleString()}</h5>
                                </div>
                            </div>
                        </div>
                        `
                    }
    
                document.querySelector("main").innerHTML = "";
                document.querySelector("main").innerHTML = codeMain;
    
                    break;
            
                case "powerSupplies":
                    for (let i = 1; i <= 6; i++){
                        const url = res[`url${i}`]
    
                        if(url !== null && url !== "null") {
                            codeSwiperSlides += `
                            <swiper-slide>
                                <div class="swiper-zoom-container">
                                    <img src="../../${url}" alt="img-product"/>
                                </div>
                            </swiper-slide>
                        `
                        }
                    }
    
                    if (codeSwiperSlides !== "") {
                        codeMain = `
                        <div class="row-ttl-home">
                            <a href="powerSupplies.html"><h3>Fuentes de Poder</h3></a>
                            <div>
                                <hr>
                            </div>  
                        </div>
        
                        <div class="ctn-details-pro">
            
                            <div class="imgs-pro">
                                <div class="swiper-wrapper" data-id="${res.id}">
                                    <div class="swiper-slide">
                                        <swiper-container style="--swiper-navigation-color: #777; --swiper-navigation-size: 1.5em; --swiper-pagination-color: #000;" class="mySwiper" pagination="true" pagination-clickable="true" navigation="true" space-between="30" loop="true">
                                            ${codeSwiperSlides}
                                        </swiper-container>
                                    </div>
                                </div>
                            </div>
                        
                            <div class="ctn-info-pro">
                                <div class="info">
                                    <h4>${res.marca + " " + res.modelo}</h4>
                                    <ul>
                                        <li>Voltaje : ${res.voltaje} V</li>
                                        <li>Potencia : ${res.potencia} Watts</li>
                                        <li>Certificación : ${res.certificacion}</li>
                                    </ul>
                        
                        
                                    <h5>$${res.precio.toLocaleString()}</h5>
                                </div>
                            </div>
                        </div>
                        `
                    }
    
                document.querySelector("main").innerHTML = "";
                document.querySelector("main").innerHTML = codeMain;
    
                break;
    
                case "screens":
                    for (let i = 1; i <= 6; i++){
                        const url = res[`url${i}`]
    
                        if(url !== null && url !== "null") {
                            codeSwiperSlides += `
                            <swiper-slide>
                                <div class="swiper-zoom-container">
                                    <img src="../../${url}" alt="img-product"/>
                                </div>
                            </swiper-slide>
                        `
                        }
                    }
    
                    if (codeSwiperSlides !== "") {
                        codeMain = `
                        <div class="row-ttl-home">
                            <a href="screens.html"><h3>Monitores</h3></a>
                            <div>
                                <hr>
                            </div>  
                        </div>
        
                        <div class="ctn-details-pro">
            
                            <div class="imgs-pro">
                                <div class="swiper-wrapper" data-id="${res.id}">
                                    <div class="swiper-slide">
                                        <swiper-container style="--swiper-navigation-color: #777; --swiper-navigation-size: 1.5em; --swiper-pagination-color: #000;" class="mySwiper" pagination="true" pagination-clickable="true" navigation="true" space-between="30" loop="true">
                                            ${codeSwiperSlides}
                                        </swiper-container>
                                    </div>
                                </div>
                            </div>
                        
                            <div class="ctn-info-pro">
                                <div class="info">
                                    <h4>${res.marca + " " + res.modelo}</h4>
                                    <ul>
                                        <li>Dimensiones : ${res.dimensiones}</li>
                                        <li>Pulgadas : ${res.pulgadas}</li>
                                        <li>Resolución : ${res.resolucion}</li>
                                        <li>Tipo : ${res.tipo} pulgadas</li>
                                    </ul>
                        
                        
                                    <h5>$${res.precio.toLocaleString()}</h5>
                                </div>
                            </div>
                        </div>
                        `
                    }
    
                document.querySelector("main").innerHTML = "";
                document.querySelector("main").innerHTML = codeMain;
    
                break;
                    
                case "processors":
                    for (let i = 1; i <= 6; i++){
                        const url = res[`url${i}`]
    
                        if(url !== null && url !== "null") {
                            codeSwiperSlides += `
                            <swiper-slide>
                                <div class="swiper-zoom-container">
                                    <img src="../../${url}" alt="img-product"/>
                                </div>
                            </swiper-slide>
                        `
                        }
                    }
    
                    if (codeSwiperSlides !== "") {
                        codeMain = `
                        <div class="row-ttl-home">
                            <a href="processors.html"><h3>Procesadores</h3></a>
                            <div>
                                <hr>
                            </div>  
                        </div>
        
                        <div class="ctn-details-pro">
            
                            <div class="imgs-pro">
                                <div class="swiper-wrapper" data-id="${res.id}">
                                    <div class="swiper-slide">
                                        <swiper-container style="--swiper-navigation-color: #777; --swiper-navigation-size: 1.5em; --swiper-pagination-color: #000;" class="mySwiper" pagination="true" pagination-clickable="true" navigation="true" space-between="30" loop="true">
                                            ${codeSwiperSlides}
                                        </swiper-container>
                                    </div>
                                </div>
                            </div>
                        
                            <div class="ctn-info-pro">
                                <div class="info">
                                    <h4>${res.marca + " " + res.modelo}</h4>
                                    <ul>
                                        <li>Numero de nucleos : ${res.numNucleos}</li>
                                        <li>Numero de hilos : ${res.numHilos}</li>
                                        <li>Reloj Base : ${res.relojBase}</li>
                                    </ul>
                        
                        
                                    <h5>$${res.precio.toLocaleString()}</h5>
                                </div>
                            </div>
                        </div>
                        `
                    }
    
                document.querySelector("main").innerHTML = "";
                document.querySelector("main").innerHTML = codeMain;
    
                    break;
    
                case "ram":
                    for (let i = 1; i <= 6; i++){
                        const url = res[`url${i}`]
    
                        if(url !== null && url !== "null") {
                            codeSwiperSlides += `
                            <swiper-slide>
                                <div class="swiper-zoom-container">
                                    <img src="../../${url}" alt="img-product"/>
                                </div>
                            </swiper-slide>
                        `
                        }
                    }
    
                    if (codeSwiperSlides !== "") {
                        codeMain = `
                        <div class="row-ttl-home">
                            <a href="ram.html"><h3>RAM</h3></a>
                            <div>
                                <hr>
                            </div>  
                        </div>
        
                        <div class="ctn-details-pro">
            
                            <div class="imgs-pro">
                                <div class="swiper-wrapper" data-id="${res.id}">
                                    <div class="swiper-slide">
                                        <swiper-container style="--swiper-navigation-color: #777; --swiper-navigation-size: 1.5em; --swiper-pagination-color: #000;" class="mySwiper" pagination="true" pagination-clickable="true" navigation="true" space-between="30" loop="true">
                                            ${codeSwiperSlides}
                                        </swiper-container>
                                    </div>
                                </div>
                            </div>
                        
                            <div class="ctn-info-pro">
                                <div class="info">
                                    <h4>${res.marca + " " + res.modelo}</h4>
                                    <ul>
                                        <li>Capacidad : ${res.capacidad} GB</li>
                                        <li>Velocidad : ${res.velocidad} Mhz</li>
                                        <li>Tipo : ${res.tipo}</li>
                                        <li>Led : ${res.led}</li>
                                    </ul>
                        
                        
                                    <h5>$${res.precio.toLocaleString()}</h5>
                                </div>
                            </div>
                        </div>
                        `
                    }
    
                document.querySelector("main").innerHTML = "";
                document.querySelector("main").innerHTML = codeMain;
    
                    break;
            
                case "desktopComputers":
                    for (let i = 1; i <= 6; i++){
                        const url = res[`url${i}`]
    
                        if(url !== null && url !== "null") {
                            codeSwiperSlides += `
                            <swiper-slide>
                                <div class="swiper-zoom-container">
                                    <img src="../../${url}" alt="img-product"/>
                                </div>
                            </swiper-slide>
                        `
                        }
                    }
    
                    if (codeSwiperSlides !== "") {
                        codeMain = `
                        <div class="row-ttl-home">
                            <a href="desktopPcs.html"><h3>Equipos de escritorio</h3></a>
                            <div>
                                <hr>
                            </div>  
                        </div>
        
                        <div class="ctn-details-pro">
            
                            <div class="imgs-pro">
                                <div class="swiper-wrapper" data-id="${res.id}">
                                    <div class="swiper-slide">
                                        <swiper-container style="--swiper-navigation-color: #777; --swiper-navigation-size: 1.5em; --swiper-pagination-color: #000;" class="mySwiper" pagination="true" pagination-clickable="true" navigation="true" space-between="30" loop="true">
                                            ${codeSwiperSlides}
                                        </swiper-container>
                                    </div>
                                </div>
                            </div>
                        
                            <div class="ctn-info-pro">
                                <div class="info">
                                    <h4>${res.procesador + " + " + res.ram + " + " + res.almacenamiento}</h4>
                                    <ul>
                                        <li>Procesador : ${res.procesador}</li>
                                        <li>Grafica : ${res.grafica}</li>
                                        <li>Ram : ${res.ram} GB</li>
                                        <li>Almacenamiento : ${res.almacenamiento} GB</li>
                                        <li>Board : ${res.board} GB</li>
                                        <li>Chasis : ${res.chasis} GB</li>
                                        <li>Fuente de poder : ${res.fuente} GB</li>
                                        <li>Refrigeración : ${res.refrigeracion}</li>
                                    </ul>
                        
                        
                                    <h5>$${res.precio.toLocaleString()}</h5>
                                </div>
                            </div>
                        </div>
                        `
                    }
    
                document.querySelector("main").innerHTML = "";
                document.querySelector("main").innerHTML = codeMain;
    
                break;
            }
        })
        .catch (error => console.error("Error: ", error))
    }
}