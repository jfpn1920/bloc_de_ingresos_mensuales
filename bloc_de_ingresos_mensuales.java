import java.util.ArrayList;
import java.util.Scanner;
public class bloc_de_ingresos_mensuales {
    public static void main(String[] args) {
        int opcion = 0;
        int i = 0;
        int contador = 0;
        int posicion = 0;
        int encontrado = 0;
        double ingreso = 0.0;
        double total = 0.0;
        String descripcion = "";
        ArrayList<Double> ingresos = new ArrayList<>();
        ArrayList<String> descripciones = new ArrayList<>();
        Scanner sc = new Scanner(System.in);
        //-----------------------------------------------//
        //--|menu_principal_bloc_de_ingresos_mensuales|--//
        //-----------------------------------------------//
        while (opcion != 6) {
            System.out.println("\n==============================");
            System.out.println("💰 BLOQUE DE INGRESOS MENSUALES");
            System.out.println("==============================");
            System.out.println("1. Agregar ingreso");
            System.out.println("2. Ver todos los ingresos");
            System.out.println("3. Buscar ingreso");
            System.out.println("4. Calcular total mensual");
            System.out.println("5. Eliminar ingreso");
            System.out.println("6. Salir");
            System.out.print("Seleccione una opcion: ");
            opcion = sc.nextInt();
            sc.nextLine();
            //---------------------//
            //--|agregar_ingreso|--//
            //---------------------//
            if (opcion == 1) {
                System.out.print("Ingrese descripcion del ingreso: ");
                descripcion = sc.nextLine();
                System.out.print("Ingrese monto del ingreso: ");
                ingreso = sc.nextDouble();
                sc.nextLine();
                descripciones.add(descripcion);
                ingresos.add(ingreso);
                contador++;
                System.out.println("✔ Ingreso agregado correctamente");
            }
            //----------------------------//
            //--|ver_todos_los_ingresos|--//
            //----------------------------//
            else if (opcion == 2) {
                if (contador == 0) {
                    System.out.println("No hay ingresos registrados");
                } else {
                    for (i = 0; i < contador; i++) {
                        System.out.println((i + 1) + ". " + descripciones.get(i) + " - $" + ingresos.get(i));
                    }
                }
            }
            //--------------------//
            //--|buscar_ingreso|--//
            //--------------------//
            else if (opcion == 3) {
                System.out.print("Ingrese descripcion a buscar: ");
                descripcion = sc.nextLine();
                encontrado = 0;
                for (i = 0; i < contador; i++) {
                    if (descripciones.get(i).equalsIgnoreCase(descripcion)) {
                        System.out.println("✔ Encontrado: " + descripciones.get(i) + " - $" + ingresos.get(i));
                        encontrado = 1;
                    }
                }
                if (encontrado == 0) {
                    System.out.println("❌ No se encontro el ingreso");
                }
            }
            //------------------//
            //--|total_mesual|--//
            //------------------//
            else if (opcion == 4) {
                total = 0;
                for (i = 0; i < contador; i++) {
                    total += ingresos.get(i);
                }
                System.out.println("🧮 Total mensual de ingresos: $" + total);
            }
            //----------------------//
            //--|eliminar_ingreso|--//
            //----------------------//
            else if (opcion == 5) {
                System.out.print("Ingrese posicion del ingreso a eliminar (1 - " + contador + "): ");
                posicion = sc.nextInt();
                sc.nextLine();
                if (posicion >= 1 && posicion <= contador) {
                    ingresos.remove(posicion - 1);
                    descripciones.remove(posicion - 1);
                    contador--;
                    System.out.println("🗑️ Ingreso eliminado correctamente");
                } else {
                    System.out.println("❌ Posicion invalida");
                }
            }
            //------------------------------//
            //--|salir_del_menu_principal|--//
            //------------------------------//
            else if (opcion == 6) {
                System.out.println("🚪 Saliendo del sistema...");
            }
            else {
                System.out.println("❌ Opcion invalida");
            }
        }
        sc.close();
    }
}