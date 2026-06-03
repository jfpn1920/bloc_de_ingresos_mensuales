//----------------------------------------------//
//--|funcionalidad_bloc_de_ingresos_mensuales|--//
//----------------------------------------------//
const campoFecha =
    document.getElementById(
        "fecha_creacion"
    );
const campoDescripcion =
    document.getElementById(
        "descripcion"
    );
const campoCategoria =
    document.getElementById(
        "categoria"
    );
const campoMonto =
    document.getElementById(
        "monto"
    );
const botonAgregar =
    document.getElementById(
        "boton_agregar"
    );
campoFecha.value =
    localStorage.getItem(
        "fecha_ingreso"
    ) || "";
campoDescripcion.value =
    localStorage.getItem(
        "descripcion_ingreso"
    ) || "";
campoCategoria.value =
    localStorage.getItem(
        "categoria_ingreso"
    ) || "";
campoMonto.value =
    localStorage.getItem(
        "monto_ingreso"
    ) || "";
campoFecha.addEventListener(
    "input",
    function(){
        localStorage.setItem(
            "fecha_ingreso",
            campoFecha.value
        );
    }
);
campoDescripcion.addEventListener(
    "input",
    function(){
        localStorage.setItem(
            "descripcion_ingreso",
            campoDescripcion.value
        );
    }
);
campoCategoria.addEventListener(
    "change",
    function(){
        localStorage.setItem(
            "categoria_ingreso",
            campoCategoria.value
        );
    }
);
campoMonto.addEventListener(
    "input",
    function(){
        localStorage.setItem(
            "monto_ingreso",
            campoMonto.value
        );
    }
);
botonAgregar.addEventListener(
    "click",
    function(){
        let fecha =
            campoFecha.value.trim();
        let descripcion =
            campoDescripcion.value.trim();
        let categoria =
            campoCategoria.value.trim();
        let monto =
            campoMonto.value.trim();
        if(
            fecha !== "" &&
            descripcion !== "" &&
            categoria !== "" &&
            monto !== ""
        ){
            let datos =
                new FormData();
            datos.append(
                "accion",
                "guardar"
            );
            datos.append(
                "fecha",
                fecha
            );
            datos.append(
                "descripcion",
                descripcion
            );
            datos.append(
                "categoria",
                categoria
            );
            datos.append(
                "monto",
                monto
            );
            fetch(
                "bloc_de_ingresos_mensuales.php",
                {
                    method: "POST",
                    body: datos
                }
            )
            .then(
                respuesta =>
                respuesta.json()
            )
            .then(
                resultado => {
                    if(
                        resultado.estado ===
                        "ok"
                    ){
                        if(
                            typeof mostrarIngresos ===
                            "function"
                        ){
                            mostrarIngresos();
                        }
                        if(
                            typeof actualizarResumen ===
                            "function"
                        ){
                            actualizarResumen();
                        }
                        alert(
                            "Se ha agregado un ingreso mensual correctamente"
                        );
                        campoFecha.value = "";
                        campoDescripcion.value = "";
                        campoCategoria.value = "";
                        campoMonto.value = "";
                        localStorage.removeItem(
                            "fecha_ingreso"
                        );
                        localStorage.removeItem(
                            "descripcion_ingreso"
                        );
                        localStorage.removeItem(
                            "categoria_ingreso"
                        );
                        localStorage.removeItem(
                            "monto_ingreso"
                        );
                    }
                    else{
                        alert(
                            resultado.mensaje
                        );
                    }
                }
            );
        }
        else{
            alert(
                "No se ha creado ningún ingreso"
            );
        }
    }
);
//---------------------------------------//
//--|funcionalidad_resumen_de_ingresos|--//
//---------------------------------------//
const totalMes =
    document.getElementById(
        "total_mes"
    );
const totalRegistrados =
    document.getElementById(
        "total_registrados"
    );
actualizarResumen();
function actualizarResumen(){
    fetch(
        "bloc_de_ingresos_mensuales.php?accion=listar"
    )
    .then(
        respuesta =>
        respuesta.json()
    )
    .then(
        ingresos => {
            let sumaTotal = 0;
            ingresos.forEach(
                function(
                    ingreso
                ){
                    sumaTotal +=
                        Number(
                            ingreso.monto
                        ) || 0;
                }
            );
            totalMes.textContent =
                sumaTotal;
            totalRegistrados.textContent =
                ingresos.length;
        }
    );
}
//------------------------------------------------//
//--|funcionalidad_tablero_de_ingreso_mensuales|--//
//------------------------------------------------//
const contenedorTabla =
    document.getElementById(
        "contenedor_tabla"
    );
const mensajeVacio =
    document.getElementById(
        "mensaje_vacio"
    );
let ingresos = [];
mostrarIngresos();
function mostrarIngresos(){
    fetch(
        "bloc_de_ingresos_mensuales.php?accion=listar"
    )
    .then(
        respuesta =>
        respuesta.json()
    )
    .then(
        datos => {
            ingresos = datos;
            contenedorTabla.innerHTML = "";
            if(
                ingresos.length === 0
            ){
                mensajeVacio.style.display =
                    "flex";
                return;
            }
            mensajeVacio.style.display =
                "none";
            ingresos.forEach(
                function(
                    ingreso,
                    indice
                ){
                    contenedorTabla.innerHTML +=
                    `
                    <tr>
                        <td>
                            ${indice + 1}
                        </td>
                        <td>
                            ${ingreso.descripcion}
                        </td>
                        <td>
                            ${ingreso.categoria}
                        </td>
                        <td>
                            ${ingreso.monto}
                        </td>
                        <td>
                            ${ingreso.fecha}
                        </td>
                        <td>
                            <i
                                class="fa-solid fa-eye boton_vista_previa"
                                onclick="vistaPrevia(${ingreso.id})"
                            ></i>
                            <i
                                class="fa-solid fa-pen-to-square boton_editar"
                                onclick="editarIngreso(${ingreso.id})"
                            ></i>
                            <i
                                class="fa-solid fa-trash boton_eliminar"
                                onclick="eliminarIngreso(${ingreso.id})"
                            ></i>
                        </td>
                    </tr>
                    `;
                }
            );
        }
    );
}
//------------------//
//--|vista_previa|--//
//------------------//
function vistaPrevia(
    id
){
    let ingreso =
        ingresos.find(
            function(item){
                return item.id == id;
            }
        );
    if(
        !ingreso
    ){
        return;
    }
    alert(
        "Descripción: " +
        ingreso.descripcion +
        "\nCategoría: " +
        ingreso.categoria +
        "\nMonto: " +
        ingreso.monto +
        "\nFecha: " +
        ingreso.fecha
    );
}
//------------//
//--|editar|--//
//------------//
function editarIngreso(
    id
){
    let ingreso =
        ingresos.find(
            function(item){
                return item.id == id;
            }
        );
    if(
        !ingreso
    ){
        alert(
            "No se encontró el ingreso"
        );
        return;
    }
    let nuevaDescripcion =
        prompt(
            "Editar descripción:",
            ingreso.descripcion
        );
    if(
        nuevaDescripcion === null
    ){
        return;
    }
    let nuevoMonto =
        prompt(
            "Editar monto:",
            ingreso.monto
        );
    if(
        nuevoMonto === null
    ){
        return;
    }
    if(
        isNaN(
            nuevoMonto
        )
    ){
        alert(
            "Debe ingresar un monto válido"
        );
        return;
    }
    let nuevaFecha =
        prompt(
            "Editar fecha:",
            ingreso.fecha
        );
    if(
        nuevaFecha === null
    ){
        return;
    }
    let datos =
        new FormData();
    datos.append(
        "accion",
        "editar"
    );
    datos.append(
        "id",
        id
    );
    datos.append(
        "descripcion",
        nuevaDescripcion.trim()
    );
    datos.append(
        "monto",
        parseFloat(
            nuevoMonto
        )
    );
    datos.append(
        "fecha",
        nuevaFecha.trim()
    );
    fetch(
        "bloc_de_ingresos_mensuales.php",
        {
            method: "POST",
            body: datos
        }
    )
    .then(
        respuesta =>
        respuesta.json()
    )
    .then(
        resultado => {
            console.log(
                resultado
            );
            if(
                resultado.estado
            ){
                mostrarIngresos();
                actualizarResumen();
                alert(
                    "Ingreso actualizado correctamente"
                );
            }
            else{
                alert(
                    "Error al actualizar el ingreso"
                );
            }
        }
    )
    .catch(
        error => {
            console.error(
                error
            );
            alert(
                "Error de conexión con el servidor"
            );
        }
    );
}
//--------------//
//--|eliminar|--//
//--------------//
function eliminarIngreso(
    id
){
    if(
        confirm(
            "¿Desea eliminar este ingreso?"
        )
    ){
        let datos =
            new FormData();
        datos.append(
            "accion",
            "eliminar"
        );
        datos.append(
            "id",
            id
        );
        fetch(
            "bloc_de_ingresos_mensuales.php",
            {
                method: "POST",
                body: datos
            }
        )
        .then(
            respuesta =>
            respuesta.json()
        )
        .then(
            resultado => {
                if(
                    resultado.estado
                ){
                    mostrarIngresos();
                    if(
                        typeof actualizarResumen ===
                        "function"
                    ){
                        actualizarResumen();
                    }
                    alert(
                        "Ingreso eliminado correctamente"
                    );
                }
            }
        );
    }
}