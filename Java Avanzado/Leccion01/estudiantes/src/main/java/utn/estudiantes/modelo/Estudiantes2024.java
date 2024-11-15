package utn.estudiantes.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
// boilerplate - Repetitivo
// Usando Spring boot, Lombok y Hibernate conseguimnos simplificar la cantidad de código

@Data // Getters and Setters
@NoArgsConstructor // Constructor vacio
@AllArgsConstructor // Constructor con todos los argumentos
@ToString // Método to String
public class Estudiantes2024 { // Clase de entidad que representa una tabla de datos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Nuestra llave primaria es autoincrementable
    private Integer idEstudiantes2024;
    private String nombre;
    private String apellido;
    private String telefono;
    private String email;
}
