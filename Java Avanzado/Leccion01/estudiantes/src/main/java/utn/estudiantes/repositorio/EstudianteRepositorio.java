package utn.estudiantes.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import utn.estudiantes.modelo.Estudiantes2024;

// Ya no es necesario agregar @Repository, ya que se utiliza la Interface JpaRepository
public interface EstudianteRepositorio extends JpaRepository<Estudiantes2024, Integer> { // JpaRepository<Clase, Primary Key>

}
