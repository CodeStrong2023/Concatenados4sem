package utn.estudiantes;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import utn.estudiantes.modelo.Estudiantes2024;
import utn.estudiantes.servicio.EstudianteServicio;

import java.util.List;
import java.util.Scanner;

@SpringBootApplication
public class EstudiantesApplication implements CommandLineRunner { // Esta interface nos permite implementar el método
	// Para ejecutar nuestra aplicación por consola

	// Se realiza la inyección de dependecias de manera automática
	@Autowired
	private EstudianteServicio estudianteServicio;
	// Usamos el LoggerFactory para obtener un logger y poder enviar información a consola y el nivel
	/* Como estámos usando el framework Spring ya no usaremos System.out.println()
 	si no que usaremos el logger que nos permite configurar y activar o desactivar*/
	private static final Logger logger = LoggerFactory.getLogger(EstudiantesApplication.class);

	String nl = System.lineSeparator();

	public static void main(String[] args) {

		logger.info("Iniciando la aplicación...");
		// Levantar  la fábrica de Spring
		SpringApplication.run(EstudiantesApplication.class, args);
		logger.info("Aplicación Finalizada!");

	}

	@Override
	public void run(String... args) throws Exception {
		// Aquí agregamos nuestra lógica de negocio
		logger.info(nl + "Ejecutando el método run de Spring..." + nl);
		var salir = false;
		var consola = new Scanner(System.in);
		while(!salir){
			mostrarMenu();
			salir = ejecutarOpciones(consola);
			logger.info(nl);
		} // Fin ciclo while
	}

	private void mostrarMenu(){
		//logger.info(nl);
		logger.info("""
    			******* Sistema de Estudiantes *******
    			1. Listar Estudiantes
    			2. Buscar Estudiante
    			3. Agregar Estudiante
    			4. Modificar Estudiante
    			5. Eliminar Estudiante
    			6. Salir
    			Eliga una opción:""");
	}

	private boolean ejecutarOpciones(Scanner consola){
		var opcion = 0;
		var esNumero = false;

		while (!esNumero) {
			try {
				opcion = Integer.parseInt(consola.nextLine());
				esNumero = true;

			} catch (NumberFormatException e) {
				logger.info("Debe ingresar un número(!)" + nl);
				logger.info("Eliga una opcion: ");
			}
		}

		var salir = false;
		switch (opcion){
			case 1 -> { // Listar estudiantes
				logger.info(nl+"Listado de estudiantes: "+nl);
				List<Estudiantes2024> estudiantes = estudianteServicio.listarEstudiantes();
				estudiantes.forEach((estudiante -> logger.info(estudiante.toString()+nl)));
			}
			case 2 ->{ // Buscar estudiante
				logger.info("Digite el id estudiante a buscar: ");
				var idEstudiante = Integer.parseInt(consola.nextLine());
				Estudiantes2024 estudiante =
						estudianteServicio.buscarEstudiantePorId(idEstudiante);
				if(estudiante != null)
					logger.info("Estudiante encontrado: "+ estudiante + nl);
				else
					logger.info("Estudiante NO encontrado con el id: "+ idEstudiante + nl);
			}
			case 3 -> { // Agregar estudiante
				logger.info("Agregar estudiante: "+nl);
				logger.info("Nombre: ");
				var nombre = consola.nextLine();
				logger.info("Apellido: ");
				var apellido = consola.nextLine();
				logger.info("Telefono: ");
				var telefono = consola.nextLine();
				logger.info("Email: ");
				var email = consola.nextLine();
				// Crear el objeto estudiante sin el id
				var estudiante = new Estudiantes2024();
				estudiante.setNombre(nombre);
				estudiante.setApellido(apellido);
				estudiante.setTelefono(telefono);
				estudiante.setEmail(email);
				estudianteServicio.guardarEstudiante(estudiante);
				logger.info("Estudiante agregado: " + estudiante + nl);
			}
			case 4 -> { // Modificar estudiante
				logger.info("Modificar estudiante: "+nl);
				logger.info("Ingrese el id estudiante: ");
				var idEstudiante = Integer.parseInt(consola.nextLine());
				// Buscamos el estudiante a modificar
				Estudiantes2024 estudiante =
						estudianteServicio.buscarEstudiantePorId(idEstudiante);
				if(estudiante != null){
					logger.info("Nombre: ");
					var nombre = consola.nextLine();
					logger.info("Apellido: ");
					var apellido = consola.nextLine();
					logger.info("Telefono: ");
					var telefono = consola.nextLine();
					logger.info("Email: ");
					var email = consola.nextLine();
					estudiante.setNombre(nombre);
					estudiante.setApellido(apellido);
					estudiante.setTelefono(telefono);
					estudiante.setEmail(email);
					estudianteServicio.guardarEstudiante(estudiante);
					logger.info("Estudiante modificado: " + estudiante + nl);
				}
				else
					logger.info("Estudiante NO encontrado con el id: " + idEstudiante + nl);

			}
			case 5 -> { // Eliminar estudiante
				logger.info("Eliminar estudiante: " + nl);
				logger.info("Digite el id estudiante a buscar: ");
				var idEstudiante = Integer.parseInt(consola.nextLine());
				var estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
				if(estudiante != null) {
					estudianteServicio.eliminarEstudiante(estudiante);
					logger.info("Estudiante eliminado: " + estudiante + nl);
				}
				else
					logger.info("Estudiante NO encontrado con id: "+ idEstudiante + nl);
			}
			case 6 -> { // Salir
				logger.info("Hasta pronto!" + nl + nl);
				salir = true;
			}
			default -> logger.info("Opcion no reconocida: " + opcion + nl);
		} // Fin switch
		return salir;
	} // Fin método ejecutarOpciones
} // Fin clase EstudiantesApplication
