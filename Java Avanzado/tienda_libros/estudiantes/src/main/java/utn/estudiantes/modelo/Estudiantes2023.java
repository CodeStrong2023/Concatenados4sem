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
@Data
@NoArgsConstructor //Constructor basio
@AllArgsConstructor //constructor con todos los elementos
@ToString
public class Estudiantes2023 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idestudiantes2023;
    private String nombre;
    private String apellido;
    private String telefono;
    private String email;
}
