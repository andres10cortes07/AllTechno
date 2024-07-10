document.addEventListener("DOMContentLoaded", () => {
    const selectCategory = document.getElementById("category");
    const dynamicFields = document.getElementById("dynamic-fields");
    const categoriesAccepteds = ["cellphones", "laptops", "processors", "ram", "screens", "powerSupplies", "desktopComputers"];
    let currentSubmitHandler = null;

    const validateProductData = (productData) => {
        for (let key in productData) {
            const value = productData[key];
            if (!value || value.length === 0) {
                return false;
            }
        }
        return true;
    };

    const consumoDeFetch = (optionSelected, formData) => {
        fetch(`http://localhost:5000/allTechno/${optionSelected}`, {
            method: 'POST',
            body: formData
        })
            .then(res => {
                if (res.status !== 201) {
                    return res.json().then(data => {
                        if (data.error === 'ER_DUP_ENTRY') {
                            throw new Error('Ya existe una o más imagenes con el mismo nombre, modificalo e intentalo de nuevo')
                        }
                        else if (data.error === 'Too many files') {
                            throw new Error('No puedes subir mas de 6 imagenes para un producto')
                        }
                        else {
                            throw new Error(data.error);
                        }
                    });
                }
                return res.json();
            })
            .then(res => {
                return Swal.fire({
                    title: "Producto creado",
                    text: `El producto se ha creado exitosamente`,
                    icon: "success",
                    timer: 5000
                });
            })
            .catch(error => {
                return Swal.fire({
                    title: "Error",
                    text: error || `Error en la creación del producto`,
                    icon: "error",
                    timer: 5000
                })
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        let productData = {};
        const optionSelected = selectCategory.value;

        switch (optionSelected) {
            case "cellphones":
                productData.marca = formData.get("marcaCell");
                productData.modelo = formData.get("modeloCell");
                productData.bateria = parseInt(formData.get("bateriaCell"), 10);
                productData.procesador = formData.get("procesadorCell");
                productData.camaraFrontal = parseInt(formData.get("camaraFrontalCell"), 10);
                productData.camaraPosterior = parseInt(formData.get("camaraPosteriorCell"), 10);
                productData.resolucion = formData.get("resolucionCell");
                productData.huella = formData.get("huellaCell");
                productData.almacenamiento = parseInt(formData.get("almacenamientoCell"), 10);
                productData.ram = parseInt(formData.get("ramCell"), 10);
                productData.precio = parseInt(formData.get("precioCell"), 10);
                productData.colores = formData.get("coloresCell");
                break;

            case "powerSupplies":
                productData.marca = formData.get("marcaPow");
                productData.modelo = formData.get("modeloPow");
                productData.voltaje = parseInt(formData.get("voltajePow"), 10);
                productData.potencia = parseInt(formData.get("potenciaPow"), 10);
                productData.certificacion = formData.get("certificacionPow");
                productData.precio = parseInt(formData.get("precioPow"), 10);
                break;

            case "screens":
                productData.marca = formData.get("marcaScre");
                productData.modelo = formData.get("modeloScre");
                productData.dimensiones = formData.get("dimensionesScre");
                productData.pulgadas = parseInt(formData.get("pulgadasScre"), 10);
                productData.resolucion = formData.get("resolucionScre");
                productData.tipo = formData.get("tipoScre");
                productData.precio = parseInt(formData.get("precioScre"), 10);
                break;

            case "laptops":
                productData.marca = formData.get("marcaLap");
                productData.modelo = formData.get("modeloLap");
                productData.procesador = formData.get("procesadorLap");
                productData.grafica = formData.get("graficaLap");
                productData.resolucion = formData.get("resolucionLap");
                productData.tamañoPantalla = parseInt(formData.get("tamañoPantallaLap"), 10);
                productData.almacenamiento = parseInt(formData.get("almacenamientoLap"), 10);
                productData.ram = parseInt(formData.get("ramLap"), 10);
                productData.precio = parseInt(formData.get("precioLap"), 10);
                productData.colores = formData.get("coloresLap");
                break;

            case "processors":
                productData.marca = formData.get("marcaProc");
                productData.modelo = formData.get("modeloProc");
                productData.numNucleos = parseInt(formData.get("numeroNucleosProc"), 10);
                productData.numHilos = parseInt(formData.get("numeroHilosProc"), 10);
                productData.relojBase = formData.get("relojBaseProc");
                productData.precio = parseInt(formData.get("precioProc"), 10);
                break;

            case "ram":
                productData.marca = formData.get("marcaRam");
                productData.modelo = formData.get("modeloRam");
                productData.capacidad = parseInt(formData.get("capacidadRam"), 10);
                productData.velocidad = parseInt(formData.get("velocidadRam"), 10);
                productData.tipo = formData.get("tipoRam");
                productData.led = formData.get("ledRam");
                productData.precio = parseInt(formData.get("precioRam"), 10);
                break;

            case "desktopComputers":
                productData.procesador = formData.get("procesadorDesk");
                productData.grafica = formData.get("graficaDesk");
                productData.ram = formData.get("ramDesk");
                productData.almacenamiento = formData.get("almacenamientoDesk")
                productData.board = formData.get("boardDesk");
                productData.chasis = formData.get("chasisDesk");
                productData.fuente = formData.get("fuenteDesk");
                productData.refrigeracion = formData.get("refrigeracionDesk");
                productData.precio = parseInt(formData.get("precioDesk"), 10);
                break;

            default:
                break;
        }

        if (!validateProductData(productData)) {
            return Swal.fire({
                title: "Error",
                text: `Hay campos vacíos o inválidos`,
                icon: "error",
                timer: 5000
            });
        }

        formData.append(`json_data`, JSON.stringify(productData));

        formData.delete('imagenes');
        const fileInput = document.querySelector('input[type="file"]');
        const files = fileInput.files;

        for (let i = 0; i < files.length; i++) {
            formData.append('imagenes', files[i]);
        }

        consumoDeFetch(optionSelected, formData);
    };

    selectCategory.addEventListener("change", (e) => {
        let optionSelected = selectCategory.value;
        dynamicFields.innerHTML = "";

        if (categoriesAccepteds.includes(optionSelected)) {
            let codeOptions = '';

            switch (optionSelected) {
                case "cellphones":
                    codeOptions = `
                    <div>
                    <label class="label-form" for="precio">Precio</label>
                    <input type="number" id="precio" name="precioCell" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="marca">Marca</label>
                    <input type="text" id="marca" name="marcaCell" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="modelo">Modelo</label>
                    <input type="text" id="modelo" name="modeloCell" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="bateria">Bateria</label>
                    <input type="number" id="bateria" name="bateriaCell" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="procesador">Procesador</label>
                    <input type="text" id="procesador" name="procesadorCell" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="camaraFrontal">Camara frontal</label>
                    <input type="number" id="camaraFrontal" name="camaraFrontalCell" class="inp-create">
                    </div>

                    <div>
                     <label class="label-form" for="camaraPosterior">Camara posterior</label>
                    <input type="number" id="camaraPosterior" name="camaraPosteriorCell" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="resolucion">Resolución</label>
                    <input type="text" id="resolucion" name="resolucionCell" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="huella">Huella</label>
                    <input type="text" id="huella" name="huellaCell" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="almacenamiento">Almacenamiento</label>
                    <input type="number" id="almacenamiento" name="almacenamientoCell" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="ram">RAM</label>
                    <input type="number" id="ram" name="ramCell" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="colores">Colores disponibles</label>
                    <input type="text" id="colores" name="coloresCell" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="imagen">Imagen</label>
                    <input type="file" id="imagen" name="imagenes" class="inp-create" multiple>
                    <span class="file-name"></span>
                    </div>
                `;
                    break;
                case "powerSupplies":
                    codeOptions = `
                    <div>
                    <label class="label-form" for="precio">Precio</label>
                    <input type="number" id="precio" name="precioPow" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="marca">Marca</label>
                    <input type="text" id="marca" name="marcaPow" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="modelo">Modelo</label>
                    <input type="text" id="modelo" name="modeloPow" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="voltaje">Voltaje</label>
                    <input type="number" id="voltaje" name="voltajePow" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="potencia">Potencia</label>
                    <input type="number" id="potencia" name="potenciaPow" class="inp-create">
                    </div>
        
                    <div style="flex: 1 100%">
                    <label class="label-form" for="certificacion">Certificación</label>
                    <input type="text" id="certificacion" name="certificacionPow" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen">Imagen</label>
                    <input type="file" id="imagen" name="imagenes" class="inp-create" multiple>
                    </div>
                `;
                    break;
                case "screens":
                    codeOptions = `
                    <div>
                    <label class="label-form" for="precio">Precio</label>
                    <input type="number" id="precio" name="precioScre" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="marca">Marca</label>
                    <input type="text" id="marca" name="marcaScre" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="modelo">Modelo</label>
                    <input type="text" id="modelo" name="modeloScre" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="dimensiones">Dimensiones</label>
                    <input type="text" id="dimensiones" name="dimensionesScre" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="pulgadas">Pulgadas</label>
                    <input type="number" id="pulgadas" name="pulgadasScre" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="resolucion">Resolución</label>
                    <input type="text" id="resolucion" name="resolucionScre" class="inp-create">
                    </div>
        
                    <div style="flex: 1 100%">
                    <label class="label-form" for="tipo">Tipo</label>
                    <input type="text" id="tipo" name="tipoScre" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen">Imagen</label>
                    <input type="file" id="imagen" name="imagenes" class="inp-create" multiple>
                    </div>
                `;
                    break;
                case "laptops":
                    codeOptions = `
                    <div>
                    <label class="label-form" for="precio">Precio</label>
                    <input type="number" id="precio" name="precioLap" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="marca">Marca</label>
                    <input type="text" id="marca" name="marcaLap" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="modelo">Modelo</label>
                    <input type="text" id="modelo" name="modeloLap" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="procesador">Procesador</label>
                    <input type="text" id="procesador" name="procesadorLap" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="grafica">Gráfica</label>
                    <input type="text" id="grafica" name="graficaLap" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="resolucion">Resolución</label>
                    <input type="text" id="resolucion" name="resolucionLap" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="tamañoPantalla">Tamaño de Pantalla</label>
                    <input type="number" id="tamañoPantalla" name="tamañoPantallaLap" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="almacenamiento">Almacenamiento</label>
                    <input type="number" id="almacenamiento" name="almacenamientoLap" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="ram">RAM</label>
                    <input type="number" id="ram" name="ramLap" class="inp-create">
                    </div>
        
                    <div style="flex: 1 100%">
                    <label class="label-form" for="colores">Colores (Separados por coma)</label>
                    <input type="text" id="colores" name="coloresLap" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen">Imagen</label>
                    <input type="file" id="imagen" name="imagenes" class="inp-create" multiple>
                    </div>
                `;
                    break;
                case "processors":
                    codeOptions = `
                    <div>
                    <label class="label-form" for="precio">Precio</label>
                    <input type="number" id="precio" name="precioProc" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="marca">Marca</label>
                    <input type="text" id="marca" name="marcaProc" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="modelo">Modelo</label>
                    <input type="text" id="modelo" name="modeloProc" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="numeroNucleos">Número de Nucleos</label>
                    <input type="number" id="numeroNucleos" name="numeroNucleosProc" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="numeroHilos">Número de Hilos</label>
                    <input type="number" id="numeroHilos" name="numeroHilosProc" class="inp-create">
                    </div>
        
                    <div style="flex: 1 100%">
                    <label class="label-form" for="relojBase">Reloj Base</label>
                    <input type="text" id="relojBase" name="relojBaseProc" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen">Imagen</label>
                    <input type="file" id="imagen" name="imagenes" class="inp-create" multiple>
                    </div>
                `;
                    break;
                case "ram":
                    codeOptions = `
                    <div>
                    <label class="label-form" for="precio">Precio</label>
                    <input type="number" id="precio" name="precioRam" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="marca">Marca</label>
                    <input type="text" id="marca" name="marcaRam" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="modelo">Modelo</label>
                    <input type="text" id="modelo" name="modeloRam" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="capacidad">Capacidad</label>
                    <input type="number" id="capacidad" name="capacidadRam" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="velocidad">Velocidad</label>
                    <input type="number" id="velocidad" name="velocidadRam" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="tipo">Tipo</label>
                    <input type="text" id="tipo" name="tipoRam" class="inp-create">
                    </div>
        
                    <div style="flex: 1 100%">
                    <label class="label-form" for="led">LED</label>
                    <input type="text" id="led" name="ledRam" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen">Imagen</label>
                    <input type="file" id="imagen" name="imagenes" class="inp-create" multiple>
                    </div>
                `;
                    break;
                case "desktopComputers":
                    codeOptions = `
                    <div>
                    <label class="label-form" for="precio">Precio</label>
                    <input type="number" id="precio" name="precioDesk" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="procesador">Procesador</label>
                    <input type="text" id="procesador" name="procesadorDesk" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="grafica">Gráfica</label>
                    <input type="text" id="grafica" name="graficaDesk" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="ram">RAM</label>
                    <input type="text" id="ram" name="ramDesk" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="almacenamiento">Almacenamiento</label>
                    <input type="text" id="almacenamiento" name="almacenamientoDesk" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="board">Board</label>
                    <input type="text" id="board" name="boardDesk" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="chasis">Chasis</label>
                    <input type="text" id="chasis" name="chasisDesk" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="fuente">Fuente</label>
                    <input type="text" id="fuente" name="fuenteDesk" class="inp-create">
                    </div>
        
                    <div style="flex: 1 100%">
                    <label class="label-form" for="refrigeracion">Refrigeración</label>
                    <input type="text" id="refrigeracion" name="refrigeracionDesk" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen">Imagen</label>
                    <input type="file" id="imagen" name="imagenes" class="inp-create" multiple>
                    </div>
                `;
                    break;

            }

            // Agregar campos dinámicos según la categoría seleccionada
            dynamicFields.innerHTML = codeOptions;

            // Configurar validación y envío del formulario
            validateSendForm();
        }
        else {
            console.log("no valida")
            return Swal.fire({
                title: "Error",
                text: `La categoria seleccionada no es valida`,
                icon: "error",
                timer: 5000
            })
        }
    });

    const validateSendForm = () => {
        if (currentSubmitHandler) {
            document.getElementById("form-create").removeEventListener("submit", currentSubmitHandler);
        }

        document.getElementById("form-create").addEventListener("submit", handleSubmit);
        currentSubmitHandler = handleSubmit;
    };
});