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
            let ingresos =
                JSON.parse(
                    localStorage.getItem(
                        "ingresos"
                    )
                ) || [];
            if(
                ingresos.length >= 20
            ){
                alert(
                    "Has alcanzado el límite de 20 ingresos en el tablero"
                );
                return;
            }
            ingresos.push({
                fecha: fecha,
                descripcion: descripcion,
                categoria: categoria,
                monto: monto
            });
            localStorage.setItem(
                "ingresos",
                JSON.stringify(
                    ingresos
                )
            );
            actualizarResumen();
            if(
                typeof mostrarIngresos ===
                "function"
            ){
                mostrarIngresos();
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
    let ingresos =
        JSON.parse(
            localStorage.getItem(
                "ingresos"
            )
        ) || [];
    let sumaTotal = 0;
    ingresos.forEach(
        function(ingreso){
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
mostrarIngresos();
function mostrarIngresos(){
    let ingresos =
        JSON.parse(
            localStorage.getItem(
                "ingresos"
            )
        ) || [];
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
                        onclick="vistaPrevia(${indice})"
                    ></i>
                    <i
                        class="fa-solid fa-pen-to-square boton_editar"
                        onclick="editarIngreso(${indice})"
                    ></i>
                    <i
                        class="fa-solid fa-trash boton_eliminar"
                        onclick="eliminarIngreso(${indice})"
                    ></i>
                </td>
            </tr>
            `;
        }
    );
}
//------------------//
//--|vista_previa|--//
//------------------//
function vistaPrevia(
    indice
){
    let ingresos =
        JSON.parse(
            localStorage.getItem(
                "ingresos"
            )
        ) || [];
    let ingreso =
        ingresos[indice];
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
    indice
){
    let ingresos =
        JSON.parse(
            localStorage.getItem(
                "ingresos"
            )
        ) || [];
    let ingreso =
        ingresos[indice];
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
    ingreso.descripcion =
        nuevaDescripcion.trim();
    ingreso.monto =
        nuevoMonto.trim();
    ingreso.fecha =
        nuevaFecha.trim();
    localStorage.setItem(
        "ingresos",
        JSON.stringify(
            ingresos
        )
    );
    actualizarResumen();
    mostrarIngresos();
    alert(
        "Ingreso actualizado correctamente"
    );
}
//--------------//
//--|eliminar|--//
//--------------//
function eliminarIngreso(
    indice
){
    let ingresos =
        JSON.parse(
            localStorage.getItem(
                "ingresos"
            )
        ) || [];
    if(
        confirm(
            "¿Desea eliminar este ingreso?"
        )
    ){
        ingresos.splice(
            indice,
            1
        );
        localStorage.setItem(
            "ingresos",
            JSON.stringify(
                ingresos
            )
        );
        actualizarResumen();
        mostrarIngresos();
    }
}