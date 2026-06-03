Algoritmo bloc_de_ingresos_mensuales
	Definir opcion, i, contador, posicion, encontrado Como Entero
	Definir ingreso, total Como Real
	Definir descripcion Como Cadena
	Dimension ingresos[100]
	Dimension descripciones[100]
	contador <- 0
	//-----------------------------------------------//
	//--|menu_principal_bloc_de_ingresos_mensuales|--//
	//-----------------------------------------------//
	Repetir
		Escribir ""
		Escribir "=============================="
		Escribir "?? BLOQUE DE INGRESOS MENSUALES"
		Escribir "=============================="
		Escribir "1. Agregar ingreso"
		Escribir "2. Ver todos los ingresos"
		Escribir "3. Buscar ingreso"
		Escribir "4. Calcular total mensual"
		Escribir "5. Eliminar ingreso"
		Escribir "6. Salir"
		Escribir "Seleccione una opcion: "
		Leer opcion
		Segun opcion Hacer
			//---------------------//
			//--|agregar_ingreso|--//
			//---------------------//
			1:
				Escribir "Ingrese descripcion del ingreso: "
				Leer descripcion
				Escribir "Ingrese monto del ingreso: "
				Leer ingreso				
				descripciones[contador] <- descripcion
				ingresos[contador] <- ingreso
				contador <- contador + 1
				Escribir "? Ingreso agregado correctamente"
			//----------------------------//
			//--|ver_todos_los_ingresos|--//
			//----------------------------//
			2:
				Si contador = 0 Entonces
					Escribir "No hay ingresos registrados"
				SiNo
					Para i <- 0 Hasta contador - 1 Hacer
						Escribir i + 1, ". ", descripciones[i], " - $", ingresos[i]
					FinPara
				FinSi
			//--------------------//
			//--|buscar_ingreso|--//
			//--------------------//
			3:
				Escribir "Ingrese descripcion a buscar: "
				Leer descripcion
				encontrado <- 0
				Para i <- 0 Hasta contador - 1 Hacer
					Si descripciones[i] = descripcion Entonces
						Escribir "? Encontrado: ", descripciones[i], " - $", ingresos[i]
						encontrado <- 1
					FinSi
				FinPara
				Si encontrado = 0 Entonces
					Escribir "? No se encontro el ingreso"
				FinSi
			//------------------//
			//--|total_mesual|--//
			//------------------//
			4:
				total <- 0
				Para i <- 0 Hasta contador - 1 Hacer
					total <- total + ingresos[i]
				FinPara
				Escribir "?? Total mensual de ingresos: $", total
			//----------------------//
			//--|eliminar_ingreso|--//
			//----------------------//
			5:
				Escribir "Ingrese posicion del ingreso a eliminar (1 - ", contador, "): "
				Leer posicion
				Si posicion >= 1 Y posicion <= contador Entonces
					Para i <- posicion - 1 Hasta contador - 2 Hacer
						ingresos[i] <- ingresos[i + 1]
						descripciones[i] <- descripciones[i + 1]
					FinPara
					contador <- contador - 1
					Escribir "??? Ingreso eliminado correctamente"
				SiNo
					Escribir "? Posicion invalida"
				FinSi
			//------------------------------//
			//--|salir_del_menu_principal|--//
			//------------------------------//
			6:
				Escribir "?? Saliendo del sistema..."
			De Otro Modo:
				Escribir "? Opcion invalida"
		FinSegun
	Hasta Que opcion = 6
FinAlgoritmo