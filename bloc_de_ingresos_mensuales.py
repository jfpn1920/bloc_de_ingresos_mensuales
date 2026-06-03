opcion = 0
i = 0
contador = 0
posicion = 0
encontrado = 0
ingreso = 0.0
total = 0.0
descripcion = ""
ingresos = []
descripciones = []
#-----------------------------------------------#
#--|menu_principal_bloc_de_ingresos_mensuales|--#
#-----------------------------------------------#
while opcion != 6:
    print("\n==============================")
    print("💰 BLOQUE DE INGRESOS MENSUALES")
    print("==============================")
    print("1. Agregar ingreso")
    print("2. Ver todos los ingresos")
    print("3. Buscar ingreso")
    print("4. Calcular total mensual")
    print("5. Eliminar ingreso")
    print("6. Salir")
    opcion = int(input("Seleccione una opcion: "))
    #---------------------#
    #--|agregar_ingreso|--#
    #---------------------#
    if opcion == 1:
        descripcion = input("Ingrese descripcion del ingreso: ")
        ingreso = float(input("Ingrese monto del ingreso: "))
        descripciones.append(descripcion)
        ingresos.append(ingreso)
        contador += 1
        print("✔ Ingreso agregado correctamente")
    #----------------------------#
    #--|ver_todos_los_ingresos|--#
    #----------------------------#
    elif opcion == 2:
        if contador == 0:
            print("No hay ingresos registrados")
        else:
            for i in range(contador):
                print(i + 1, ".", descripciones[i], "-", "$", ingresos[i])
    #--------------------#
    #--|buscar_ingreso|--#
    #--------------------#
    elif opcion == 3:
        descripcion = input("Ingrese descripcion a buscar: ")
        encontrado = 0
        for i in range(contador):
            if descripciones[i] == descripcion:
                print("✔ Encontrado:", descripciones[i], "-", "$", ingresos[i])
                encontrado = 1
        if encontrado == 0:
            print("❌ No se encontro el ingreso")
    #------------------#
    #--|total_mesual|--#
    #------------------#
    elif opcion == 4:
        total = 0
        for i in range(contador):
            total += ingresos[i]
        print("🧮 Total mensual de ingresos: $", total)
    #----------------------#
    #--|eliminar_ingreso|--#
    #----------------------#
    elif opcion == 5:
        posicion = int(input("Ingrese posicion del ingreso a eliminar (1 - {}): ".format(contador)))
        if posicion >= 1 and posicion <= contador:
            ingresos.pop(posicion - 1)
            descripciones.pop(posicion - 1)
            contador -= 1
            print("🗑️ Ingreso eliminado correctamente")
        else:
            print("❌ Posicion invalida")
    #------------------------------#
    #--|salir_del_menu_principal|--#
    #------------------------------#
    elif opcion == 6:
        print("🚪 Saliendo del sistema...")
    else:
        print("❌ Opcion invalida")