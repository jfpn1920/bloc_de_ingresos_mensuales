<?php
require_once(
    "conexion.php"
);
header(
    "Content-Type: application/json"
);
$accion =
    $_POST["accion"] ??
    $_GET["accion"] ??
    "";
if(
    $accion === "guardar"
){
    $descripcion =
        $_POST["descripcion"];
    $categoria =
        $_POST["categoria"];
    $monto =
        $_POST["monto"];
    $fecha =
        $_POST["fecha"];
    $consulta =
        $conexion->prepare(
            "INSERT INTO ingresos_mensuales
            (
                descripcion,
                categoria,
                monto,
                fecha
            )
            VALUES
            (
                ?,
                ?,
                ?,
                ?
            )"
        );
    $consulta->bind_param(
        "ssds",
        $descripcion,
        $categoria,
        $monto,
        $fecha
    );
    $consulta->execute();
    echo json_encode(
        [
            "estado" => true
        ]
    );
    exit;
}
//-------------------//
//--|mostrar_datos|--//
//-------------------//
if(
    $accion === "listar"
){
    $resultado =
        $conexion->query(
            "SELECT *
            FROM ingresos_mensuales
            ORDER BY id DESC"
        );
    $datos = [];
    while(
        $fila =
        $resultado->fetch_assoc()
    ){
        $datos[] =
            $fila;
    }
    echo json_encode(
        $datos
    );
    exit;
}
//------------------//
//--|editar_datos|--//
//------------------//
if(
    $accion === "editar"
){
    $id =
        $_POST["id"];
    $descripcion =
        $_POST["descripcion"];
    $monto =
        $_POST["monto"];
    $fecha =
        $_POST["fecha"];
    $consulta =
        $conexion->prepare(
            "UPDATE ingresos_mensuales
            SET
                descripcion = ?,
                monto = ?,
                fecha = ?
            WHERE id = ?"
        );
    $consulta->bind_param(
        "sdsi",
        $descripcion,
        $monto,
        $fecha,
        $id
    );
    $consulta->execute();
    echo json_encode(
        [
            "estado" => true
        ]
    );
    exit;
}
//--------------------//
//--|eliminar_datos|--//
//--------------------//
if(
    $accion === "eliminar"
){
    $id =
        $_POST["id"];
    $consulta =
        $conexion->prepare(
            "DELETE FROM ingresos_mensuales
            WHERE id = ?"
        );
    $consulta->bind_param(
        "i",
        $id
    );
    $consulta->execute();
    echo json_encode(
        [
            "estado" => true
        ]
    );
    exit;
}
?>