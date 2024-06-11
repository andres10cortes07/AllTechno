const ctnForm = document.querySelector('.ctn-form div');
const categoriesAccepteds = ["cellphones", "laptops", "processors", "ram", "screens", "powerSupplies", "desktopPc"];

ctnForm.addEventListener("change", (e) => {
    const selectCategory = document.getElementById("category");
    const optionSelected = selectCategory.value;
    const btnCreate = document.querySelector(".btn-crear");
    let codeOptions = "";

    if(categoriesAccepteds.includes(optionSelected)){

        switch (optionSelected) {
            case "cellphones":
                codeOptions = `
                    <div>
                        <label class="label-form" for="category">Categoria del producto</label>
                        <select name="category" id="category" class="inp-create">
                            <optgroup label="Categoria">
                                <option value="">Elige una opción</option>
                                <option value="cellphones" selected>Celular</option>
                                <option value="laptops">Portatil</option>
                                <option value="processors">Procesador</option>
                                <option value="ram">RAM</option>
                                <option value="screens">Monitor</option>
                                <option value="powerSupplies">Fuente de poder</option>
                                <option value="desktopPc">Equipo de escritorio</option>
                            </optgroup> 
                        </select>
                    </div>
                    <div>
                        <label class="label-form" for="precio">Precio</label>
                        <input type="number" id="precio" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="marca">Marca</label>
                    <input type="text" id="marca" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="modelo">Modelo</label>
                    <input type="text" id="modelo" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="bateria">Bateria</label>
                    <input type="number" id="bateria" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="procesador">Procesador</label>
                    <input type="text" id="procesador" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="camaraFrontal">Camara frontal</label>
                    <input type="number" id="camaraFrontal" class="inp-create">
                    </div>

                    <div>
                     <label class="label-form" for="camaraPosterior">Camara posterior</label>
                    <input type="number" id="camaraPosterior" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="resolucion">Resolución</label>
                    <input type="text" id="resolucion" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="huella">Huella</label>
                    <input type="text" id="huella" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="almacenamiento">Almacenamiento</label>
                    <input type="number" id="almacenamiento" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="ram">RAM</label>
                    <input type="number" id="ram" class="inp-create">
                    </div>

                    <div style="flex: 1 100%">
                    <label class="label-form" for="colores">Colores disponibles (Separados por coma)</label>
                    <input type="text" id="colores" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="imagen-1">Imagen N°1</label>
                    <input type="file" id="imagen-1" class="inp-create">
                    <span class="file-name"></span>
                    </div>

                    <div>
                    <label class="label-form" for="imagen-2">Imagen N°2</label>
                    <input type="file" id="imagen-2" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="imagen-3">Imagen N°3</label>
                    <input type="file" id="imagen-3" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="imagen-4">Imagen N°4</label>
                    <input type="file" id="imagen-4" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="imagen-5">Imagen N°5</label>
                    <input type="file" id="imagen-5" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="imagen-6">Imagen N°6</label>
                    <input type="file" id="imagen-6" class="inp-create">
                    </div>
                `;
                break;
            case "powerSupplies":
                codeOptions = `
                <div>
                        <label class="label-form" for="category">Categoria del producto</label>
                        <select name="category" id="category" class="inp-create">
                            <optgroup label="Categoria">
                                <option value="">Elige una opción</option>
                                <option value="cellphones">Celular</option>
                                <option value="laptops">Portatil</option>
                                <option value="processors">Procesador</option>
                                <option value="ram">RAM</option>
                                <option value="screens">Monitor</option>
                                <option value="powerSupplies" selected>Fuente de poder</option>
                                <option value="desktopPc">Equipo de escritorio</option>
                            </optgroup> 
                        </select>
                    </div>
                    <div>
                        <label class="label-form" for="precio">Precio</label>
                        <input type="number" id="precio" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="marca">Marca</label>
                    <input type="text" id="marca" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="modelo">Modelo</label>
                    <input type="text" id="modelo" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="voltaje">Voltaje</label>
                    <input type="number" id="voltaje" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="potencia">Potencia</label>
                    <input type="number" id="potencia" class="inp-create">
                    </div>
        
                    <div style="flex: 1 100%">
                    <label class="label-form" for="certificacion">Certificación</label>
                    <input type="text" id="certificacion" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-1">Imagen N°1</label>
                    <input type="file" id="imagen-1" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-2">Imagen N°2</label>
                    <input type="file" id="imagen-2" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-3">Imagen N°3</label>
                    <input type="file" id="imagen-3" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-4">Imagen N°4</label>
                    <input type="file" id="imagen-4" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-5">Imagen N°5</label>
                    <input type="file" id="imagen-5" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-6">Imagen N°6</label>
                    <input type="file" id="imagen-6" class="inp-create">
                    </div>
                `;
                break;
            case "screens":
                codeOptions = `
                <div>
                        <label class="label-form" for="category">Categoria del producto</label>
                        <select name="category" id="category" class="inp-create">
                            <optgroup label="Categoria">
                                <option value="">Elige una opción</option>
                                <option value="cellphones">Celular</option>
                                <option value="laptops">Portatil</option>
                                <option value="processors">Procesador</option>
                                <option value="ram">RAM</option>
                                <option value="screens" selected>Monitor</option>
                                <option value="powerSupplies">Fuente de poder</option>
                                <option value="desktopPc">Equipo de escritorio</option>
                            </optgroup> 
                        </select>
                    </div>
                    <div>
                        <label class="label-form" for="precio">Precio</label>
                        <input type="number" id="precio" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="marca">Marca</label>
                    <input type="text" id="marca" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="modelo">Modelo</label>
                    <input type="text" id="modelo" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="dimensiones">Dimensiones</label>
                    <input type="text" id="dimensiones" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="pulgadas">Pulgadas</label>
                    <input type="number" id="pulgadas" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="resolucion">Resolución</label>
                    <input type="text" id="resolucion" class="inp-create">
                    </div>
        
                    <div style="flex: 1 100%">
                    <label class="label-form" for="tipo">Tipo</label>
                    <input type="text" id="tipo" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-1">Imagen N°1</label>
                    <input type="file" id="imagen-1" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-2">Imagen N°2</label>
                    <input type="file" id="imagen-2" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-3">Imagen N°3</label>
                    <input type="file" id="imagen-3" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-4">Imagen N°4</label>
                    <input type="file" id="imagen-4" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-5">Imagen N°5</label>
                    <input type="file" id="imagen-5" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-6">Imagen N°6</label>
                    <input type="file" id="imagen-6" class="inp-create">
                    </div>
                `;
                break;
            case "laptops":
                codeOptions = `
                <div>
                        <label class="label-form" for="category">Categoria del producto</label>
                        <select name="category" id="category" class="inp-create">
                            <optgroup label="Categoria">
                                <option value="">Elige una opción</option>
                                <option value="cellphones">Celular</option>
                                <option value="laptops" selected>Portatil</option>
                                <option value="processors">Procesador</option>
                                <option value="ram">RAM</option>
                                <option value="screens">Monitor</option>
                                <option value="powerSupplies">Fuente de poder</option>
                                <option value="desktopPc">Equipo de escritorio</option>
                            </optgroup> 
                        </select>
                    </div>
                    <div>
                        <label class="label-form" for="precio">Precio</label>
                        <input type="number" id="precio" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="marca">Marca</label>
                    <input type="text" id="marca" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="modelo">Modelo</label>
                    <input type="text" id="modelo" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="procesador">Procesador</label>
                    <input type="text" id="procesador" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="grafica">Gráfica</label>
                    <input type="text" id="grafica" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="resolucion">Resolución</label>
                    <input type="text" id="resolucion" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="tamañoPantalla">Tamaño de Pantalla</label>
                    <input type="number" id="tamañoPantalla" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="almacenamiento">Almacenamiento</label>
                    <input type="number" id="almacenamiento" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="ram">RAM</label>
                    <input type="number" id="ram" class="inp-create">
                    </div>
        
                    <div style="flex: 1 100%">
                    <label class="label-form" for="colores">Colores (Separados por coma)</label>
                    <input type="text" id="colores" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-1">Imagen N°1</label>
                    <input type="file" id="imagen-1" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-2">Imagen N°2</label>
                    <input type="file" id="imagen-2" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-3">Imagen N°3</label>
                    <input type="file" id="imagen-3" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-4">Imagen N°4</label>
                    <input type="file" id="imagen-4" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-5">Imagen N°5</label>
                    <input type="file" id="imagen-5" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-6">Imagen N°6</label>
                    <input type="file" id="imagen-6" class="inp-create">
                    </div>
                `;
                break;
            case "processors":
                codeOptions = `
                <div>
                        <label class="label-form" for="category">Categoria del producto</label>
                        <select name="category" id="category" class="inp-create">
                            <optgroup label="Categoria">
                                <option value="">Elige una opción</option>
                                <option value="cellphones">Celular</option>
                                <option value="laptops">Portatil</option>
                                <option value="processors" selected>Procesador</option>
                                <option value="ram">RAM</option>
                                <option value="screens">Monitor</option>
                                <option value="powerSupplies">Fuente de poder</option>
                                <option value="desktopPc">Equipo de escritorio</option>
                            </optgroup> 
                        </select>
                    </div>
                    <div>
                        <label class="label-form" for="precio">Precio</label>
                        <input type="number" id="precio" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="marca">Marca</label>
                    <input type="text" id="marca" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="modelo">Modelo</label>
                    <input type="text" id="modelo" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="numeroNucleos">Número de Nucleos</label>
                    <input type="number" id="numeroNucleos" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="numeroHilos">Número de Hilos</label>
                    <input type="number" id="numeroHilos" class="inp-create">
                    </div>
        
                    <div style="flex: 1 100%">
                    <label class="label-form" for="relojBase">Reloj Base</label>
                    <input type="text" id="relojBase" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-1">Imagen N°1</label>
                    <input type="file" id="imagen-1" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-2">Imagen N°2</label>
                    <input type="file" id="imagen-2" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-3">Imagen N°3</label>
                    <input type="file" id="imagen-3" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-4">Imagen N°4</label>
                    <input type="file" id="imagen-4" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-5">Imagen N°5</label>
                    <input type="file" id="imagen-5" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-6">Imagen N°6</label>
                    <input type="file" id="imagen-6" class="inp-create">
                    </div>
                `;
                break;
            case "ram":
                codeOptions = `
                <div>
                        <label class="label-form" for="category">Categoria del producto</label>
                        <select name="category" id="category" class="inp-create">
                            <optgroup label="Categoria">
                                <option value="">Elige una opción</option>
                                <option value="cellphones">Celular</option>
                                <option value="laptops">Portatil</option>
                                <option value="processors">Procesador</option>
                                <option value="ram" selected>RAM</option>
                                <option value="screens">Monitor</option>
                                <option value="powerSupplies">Fuente de poder</option>
                                <option value="desktopPc">Equipo de escritorio</option>
                            </optgroup> 
                        </select>
                    </div>
                    <div>
                        <label class="label-form" for="precio">Precio</label>
                        <input type="number" id="precio" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="marca">Marca</label>
                    <input type="text" id="marca" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="modelo">Modelo</label>
                    <input type="text" id="modelo" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="capacidad">Capacidad</label>
                    <input type="number" id="capacidad" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="velocidad">Velocidad</label>
                    <input type="number" id="velocidad" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="tipo">Tipo</label>
                    <input type="text" id="tipo" class="inp-create">
                    </div>
        
                    <div style="flex: 1 100%">
                    <label class="label-form" for="led">LED</label>
                    <input type="text" id="led" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-1">Imagen N°1</label>
                    <input type="file" id="imagen-1" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-2">Imagen N°2</label>
                    <input type="file" id="imagen-2" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-3">Imagen N°3</label>
                    <input type="file" id="imagen-3" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-4">Imagen N°4</label>
                    <input type="file" id="imagen-4" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-5">Imagen N°5</label>
                    <input type="file" id="imagen-5" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-6">Imagen N°6</label>
                    <input type="file" id="imagen-6" class="inp-create">
                    </div>
                `;
                break;
            case "desktopPc":
                codeOptions = `
                <div>
                        <label class="label-form" for="category">Categoria del producto</label>
                        <select name="category" id="category" class="inp-create">
                            <optgroup label="Categoria">
                                <option value="">Elige una opción</option>
                                <option value="cellphones">Celular</option>
                                <option value="laptops">Portatil</option>
                                <option value="processors">Procesador</option>
                                <option value="ram">RAM</option>
                                <option value="screens">Monitor</option>
                                <option value="powerSupplies">Fuente de poder</option>
                                <option value="desktopPc" selected>Equipo de escritorio</option>
                            </optgroup> 
                        </select>
                    </div>
                    <div>
                        <label class="label-form" for="precio">Precio</label>
                        <input type="number" id="precio" class="inp-create">
                    </div>

                    <div>
                    <label class="label-form" for="procesador">Procesador</label>
                    <input type="text" id="procesador" class="inp-create">
                    </div>
                    
                    <div>
                    <label class="label-form" for="grafica">Gráfica</label>
                    <input type="text" id="grafica" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="ram">RAM</label>
                    <input type="text" id="ram" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="almacenamiento">Almacenamiento</label>
                    <input type="text" id="almacenamiento" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="board">Board</label>
                    <input type="text" id="board" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="chasis">Chasis</label>
                    <input type="text" id="chasis" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="fuente">Fuente</label>
                    <input type="text" id="fuente" class="inp-create">
                    </div>
        
                    <div style="flex: 1 100%">
                    <label class="label-form" for="refrigeracion">Refrigeración</label>
                    <input type="text" id="refrigeracion" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-1">Imagen N°1</label>
                    <input type="file" id="imagen-1" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-2">Imagen N°2</label>
                    <input type="file" id="imagen-2" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-3">Imagen N°3</label>
                    <input type="file" id="imagen-3" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-4">Imagen N°4</label>
                    <input type="file" id="imagen-4" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-5">Imagen N°5</label>
                    <input type="file" id="imagen-5" class="inp-create">
                    </div>
        
                    <div>
                    <label class="label-form" for="imagen-6">Imagen N°6</label>
                    <input type="file" id="imagen-6" class="inp-create">
                    </div>
                `;
                break;

        }
        const ctnInputs = document.querySelector(".ctn-form div")
        ctnInputs.innerHTML = ""
        ctnInputs.innerHTML = codeOptions;

    } else {
        //! alerta de que la categoria no es valida
    }
});