const validateProductData = (productData) => {
    for (let key in productData) {
        const value = productData[key];
        if (!value || isNaN(value) || value == "") { 
            return false
        }
    }
    return true
};

const consumoDeFetch = (optionSelected) => {
    fetch(`http://localhost:5000/allTechno/${optionSelected}`, {
        method: 'POST',
        body: formData
    })
        .then(res => {
            if (res.status !== 201) {
                return res.json().then((data) => {
                    throw new Error(data.error);
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
                text: error.message || `Error en la creación del producto`,
                icon: "error",
                timer: 5000
            });
        });
}

const validateSendForm = () => {
    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault()
        
        const formData = new FormData(e.target)
        const productData = {}
        switch (optionSelected) {
            case "cellphones":
                minLength = 12
                productData.marca = formData.get("marca")
                productData.modelo = formData.get("modelo")
                productData.bateria = parseInt(formData.get("bateria"), 10)
                productData.procesador = formData.get("procesador")
                productData.camaraFrontal = parseInt(formData.get("camaraFrontal"), 10)
                productData.camaraPosterior = parseInt(formData.get("camaraPosterior"), 10)
                productData.resolucion = formData.get("resolucion")
                productData.huella = formData.get("huella")
                productData.almacenamiento = parseInt(formData.get("almacenamiento"), 10)
                productData.ram = parseInt(formData.get("ram"), 10)
                productData.precio = parseInt(formData.get("precio"), 10)
                productData.colores = formData.get("colores")
                break;

            case "powerSupplies":
                minLength = 6
                productData.marca = formData.get("marca")
                productData.modelo = formData.get("modelo")
                productData.voltaje = formData.get("voltaje")
                productData.potencia = formData.get("potencia")
                productData.certificacion = formData.get("certificacion")
                productData.precio = formData.get("precio")
                break;

            case "screens":
                minLength = 7
                productData.marca = formData.get("marca")
                productData.modelo = formData.get("modelo")
                productData.dimensiones = formData.get("dimensiones")
                productData.pulgadas = formData.get("pulgadas")
                productData.resolucion = formData.get("resolucion")
                productData.tipo = formData.get("tipo")
                productData.precio = formData.get("precio")
                break;

            case "laptops":
                minLength = 10
                productData.marca = formData.get("marca")
                productData.modelo = formData.get("modelo")
                productData.procesador = formData.get("procesador")
                productData.grafica = formData.get("grafica")
                productData.resolucion = formData.get("resolucion")
                productData.tamañoPantalla = formData.get("tamañoPantalla")
                productData.almacenamiento = formData.get("almacenamiento")
                productData.ram = formData.get("ram")
                productData.precio = formData.get("precio")
                productData.colores = formData.get("colores")
                break;

            case "processors":
                minLength = 6
                productData.marca = formData.get("marca")
                productData.modelo = formData.get("modelo")
                productData.numNucleos = formData.get("numNucleos")
                productData.numHilos = formData.get("numHilos")
                productData.relojBase = formData.get("relojBase")
                productData.precio = formData.get("precio")
                break;

            case "ram":
                minLength = 7
                productData.marca = formData.get("marca")
                productData.modelo = formData.get("modelo")
                productData.capacidad = formData.get("capacidad")
                productData.velocidad = formData.get("velocidad")
                productData.tipo = formData.get("tipo")
                productData.led = formData.get("led")
                productData.precio = formData.get("precio")
                break;

            case "desktopPc":
                minLength = 9
                productData.procesador = formData.get("procesador")
                productData.grafica = formData.get("grafica")
                productData.ram = formData.get("ram")
                productData.almacenamiento = formData.get("almacenamiento")
                productData.board = formData.get("board")
                productData.chasis = formData.get("chasis")
                productData.fuente = formData.get("fuente")
                productData.refrigeracion = formData.get("refrigeracion")
                productData.precio = formData.get("precio")
                break;

            default:
                productData = {}
                break;
        }

        if(!validateProductData(productData)) {
            return Swal.fire({
                title: "Error",
                text: `Hay campos vacios`,
                icon: "error",
                timer: 5000
            });
        }

        formData.append(`json_data`, JSON.stringify(productData));

        // Obtener referencia al campo de archivos
        const fileInput = document.querySelector('input[type="file"]');
        const files = fileInput.files;

        // Agregar cada archivo al FormData
        for (let i = 0; i < files.length; i++) {
            formData.append('imagenes', files[i]);
        }

        consumoDeFetch(optionSelected)
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const selectCategory = document.getElementById("category");
    const dynamicFields = document.getElementById("dynamic-fields");
    const categoriesAccepteds = ["cellphones", "laptops", "processors", "ram", "screens", "powerSupplies", "desktopPc"];

    selectCategory.addEventListener("change", (e) => {
        const optionSelected = selectCategory.value;
        dynamicFields.innerHTML = "";

        if (categoriesAccepteds.includes(optionSelected)) {

            switch (optionSelected) {
                case "cellphones":
                    codeOptions = `

                    <div>
                    <label class="label-form" for="marca">Marca</label>
                    <input type="text" id="marca" name="marca" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="modelo">Modelo</label>
                    <input type="text" id="modelo" name="modelo" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="bateria">Bateria</label>
                    <input type="number" id="bateria" name="bateria" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="procesador">Procesador</label>
                    <input type="text" id="procesador" name="procesador" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="camaraFrontal">Camara frontal</label>
                    <input type="number" id="camaraFrontal" name="camaraFrontal" class="inp-create">
                    </div>

                    <div>
                     <label class="label-form" for="camaraPosterior">Camara posterior</label>
                    <input type="number" id="camaraPosterior" name="camaraPosterior" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="resolucion">Resolución</label>
                    <input type="text" id="resolucion" name="resolucion" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="huella">Huella</label>
                    <input type="text" id="huella" name="huella" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="almacenamiento">Almacenamiento</label>
                    <input type="number" id="almacenamiento" name="almacenamiento" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="ram">RAM</label>
                    <input type="number" id="ram" name="ram" class="inp-create">
                    </div>

                    <div style="flex: 1 100%">
                    <label class="label-form" for="colores">Colores disponibles (Separados por coma)</label>
                    <input type="text" id="colores" name="colores" class="inp-create">
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
                    <label class="label-form" for="marca">Marca</label>
                    <input type="text" id="marca" name="marca" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="modelo">Modelo</label>
                    <input type="text" id="modelo" name="modelo" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="voltaje">Voltaje</label>
                    <input type="number" id="voltaje" name="voltaje" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="potencia">Potencia</label>
                    <input type="number" id="potencia" name="potencia" class="inp-create">
                    </div>
        
                    <div style="flex: 1 100%">
                    <label class="label-form" for="certificacion">Certificación</label>
                    <input type="text" id="certificacion" name="certificacion" class="inp-create">
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
                    <label class="label-form" for="marca">Marca</label>
                    <input type="text" id="marca" name="marca" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="modelo">Modelo</label>
                    <input type="text" id="modelo" name="modelo" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="dimensiones">Dimensiones</label>
                    <input type="text" id="dimensiones" name="dimensiones" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="pulgadas">Pulgadas</label>
                    <input type="number" id="pulgadas" name="pulgadas" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="resolucion">Resolución</label>
                    <input type="text" id="resolucion" name="resolucion" class="inp-create">
                    </div>
        
                    <div style="flex: 1 100%">
                    <label class="label-form" for="tipo">Tipo</label>
                    <input type="text" id="tipo" name="tipo" class="inp-create">
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
                    <label class="label-form" for="marca">Marca</label>
                    <input type="text" id="marca" name="marca" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="modelo">Modelo</label>
                    <input type="text" id="modelo" name="modelo" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="procesador">Procesador</label>
                    <input type="text" id="procesador" name="procesador" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="grafica">Gráfica</label>
                    <input type="text" id="grafica" name="grafica" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="resolucion">Resolución</label>
                    <input type="text" id="resolucion" name="resolucion" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="tamañoPantalla">Tamaño de Pantalla</label>
                    <input type="number" id="tamañoPantalla" name="tamañoPantalla" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="almacenamiento">Almacenamiento</label>
                    <input type="number" id="almacenamiento" name="almacenamiento" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="ram">RAM</label>
                    <input type="number" id="ram" name="ram" class="inp-create">
                    </div>
        
                    <div style="flex: 1 100%">
                    <label class="label-form" for="colores">Colores (Separados por coma)</label>
                    <input type="text" id="colores" name="colores" class="inp-create">
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
                    <label class="label-form" for="marca">Marca</label>
                    <input type="text" id="marca" name="marca" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="modelo">Modelo</label>
                    <input type="text" id="modelo" name="modelo" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="numeroNucleos">Número de Nucleos</label>
                    <input type="number" id="numeroNucleos" name="numeroNucleos" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="numeroHilos">Número de Hilos</label>
                    <input type="number" id="numeroHilos" name="numeroHilos" class="inp-create">
                    </div>
        
                    <div style="flex: 1 100%">
                    <label class="label-form" for="relojBase">Reloj Base</label>
                    <input type="text" id="relojBase" name="relojBase" class="inp-create">
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
                    <label class="label-form" for="marca">Marca</label>
                    <input type="text" id="marca" name="marca" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="modelo">Modelo</label>
                    <input type="text" id="modelo" name="modelo" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="capacidad">Capacidad</label>
                    <input type="number" id="capacidad" name="capacidad" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="velocidad">Velocidad</label>
                    <input type="number" id="velocidad" name="velocidad" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="tipo">Tipo</label>
                    <input type="text" id="tipo" name="tipo" class="inp-create">
                    </div>
        
                    <div style="flex: 1 100%">
                    <label class="label-form" for="led">LED</label>
                    <input type="text" id="led" name="led" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen">Imagen</label>
                    <input type="file" id="imagen" name="imagenes" class="inp-create" multiple>
                    </div>
                `;
                    break;
                case "desktopPc":
                    codeOptions = `

                    <div>
                    <label class="label-form" for="procesador">Procesador</label>
                    <input type="text" id="procesador" name="procesador" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="grafica">Gráfica</label>
                    <input type="text" id="grafica" name="grafica" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="ram">RAM</label>
                    <input type="text" id="ram" name="ram" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="almacenamiento">Almacenamiento</label>
                    <input type="text" id="almacenamiento" name="almacenamiento" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="board">Board</label>
                    <input type="text" id="board" name="board" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="chasis">Chasis</label>
                    <input type="text" id="chasis" name="chasis" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="fuente">Fuente</label>
                    <input type="text" id="fuente" name="fuente" class="inp-create">
                    </div>
        
                    <div style="flex: 1 100%">
                    <label class="label-form" for="refrigeracion">Refrigeración</label>
                    <input type="text" id="refrigeracion" name="refrigeracion" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen">Imagen</label>
                    <input type="file" id="imagen" name="imagenes" class="inp-create" multiple>
                    </div>
                `;
                    break;

            }
            dynamicFields.innerHTML = codeOptions;

            validateSendForm()

        } else {
            return Swal.fire({
                title: "Error",
                text: `Categoria invalida`,
                icon: "error",
                timer: 3000
            });
        }
    })
})