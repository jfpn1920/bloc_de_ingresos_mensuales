Imports System
Imports System.Collections.Generic
Module bloc_de_ingresos_mensuales
    Sub Main(args As String())
        Dim opcion As Integer = 0
        Dim i As Integer = 0
        Dim contador As Integer = 0
        Dim posicion As Integer = 0
        Dim encontrado As Integer = 0
        Dim ingreso As Double = 0
        Dim total As Double = 0
        Dim descripcion As String = ""
        Dim ingresos As New List(Of Double)
        Dim descripciones As New List(Of String)
        '-----------------------------------------------#
        '--|menu_principal_bloc_de_ingresos_mensuales|--#
        '-----------------------------------------------#
        While opcion <> 6
            Console.WriteLine("")
            Console.WriteLine("==============================")
            Console.WriteLine("💰 BLOQUE DE INGRESOS MENSUALES")
            Console.WriteLine("==============================")
            Console.WriteLine("1. Agregar ingreso")
            Console.WriteLine("2. Ver todos los ingresos")
            Console.WriteLine("3. Buscar ingreso")
            Console.WriteLine("4. Calcular total mensual")
            Console.WriteLine("5. Eliminar ingreso")
            Console.WriteLine("6. Salir")
            Console.Write("Seleccione una opcion: ")
            opcion = Convert.ToInt32(Console.ReadLine())
            '---------------------#
            '--|agregar_ingreso|--#
            '---------------------#
            If opcion = 1 Then
                Console.Write("Ingrese descripcion del ingreso: ")
                descripcion = Console.ReadLine()
                Console.Write("Ingrese monto del ingreso: ")
                ingreso = Convert.ToDouble(Console.ReadLine())
                descripciones.Add(descripcion)
                ingresos.Add(ingreso)
                contador += 1
                Console.WriteLine("✔ Ingreso agregado correctamente")
                '----------------------------#
                '--|ver_todos_los_ingresos|--#
                '----------------------------#
            ElseIf opcion = 2 Then
                If contador = 0 Then
                    Console.WriteLine("No hay ingresos registrados")
                Else
                    For i = 0 To contador - 1
                        Console.WriteLine((i + 1).ToString() & ". " & descripciones(i) & " - $" & ingresos(i))
                    Next
                End If
                '--------------------#
                '--|buscar_ingreso|--#
                '--------------------#
            ElseIf opcion = 3 Then
                Console.Write("Ingrese descripcion a buscar: ")
                descripcion = Console.ReadLine()
                encontrado = 0
                For i = 0 To contador - 1
                    If descripciones(i).ToLower() = descripcion.ToLower() Then
                        Console.WriteLine("✔ Encontrado: " & descripciones(i) & " - $" & ingresos(i))
                        encontrado = 1
                    End If
                Next
                If encontrado = 0 Then
                    Console.WriteLine("❌ No se encontro el ingreso")
                End If
                '------------------#
                '--|total_mesual|--#
                '------------------#
            ElseIf opcion = 4 Then
                total = 0
                For i = 0 To contador - 1
                    total += ingresos(i)
                Next
                Console.WriteLine("🧮 Total mensual de ingresos: $" & total)
                '----------------------#
                '--|eliminar_ingreso|--#
                '----------------------#
            ElseIf opcion = 5 Then
                Console.Write("Ingrese posicion del ingreso a eliminar (1 - " & contador & "): ")
                posicion = Convert.ToInt32(Console.ReadLine())
                If posicion >= 1 And posicion <= contador Then
                    ingresos.RemoveAt(posicion - 1)
                    descripciones.RemoveAt(posicion - 1)
                    contador -= 1
                    Console.WriteLine("🗑️ Ingreso eliminado correctamente")
                Else
                    Console.WriteLine("❌ Posicion invalida")
                End If
                '------------------------------#
                '--|salir_del_menu_principal|--#
                '------------------------------#
            ElseIf opcion = 6 Then
                Console.WriteLine("🚪 Saliendo del sistema...")
            Else
                Console.WriteLine("❌ Opcion invalida")
            End If
        End While
    End Sub
End Module