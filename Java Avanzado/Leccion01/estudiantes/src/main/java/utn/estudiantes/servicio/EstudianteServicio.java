package utn.estudiantes.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utn.estudiantes.modelo.Estudiantes2024;
import utn.estudiantes.repositorio.EstudianteRepositorio;

import java.util.List;

@Service // Agregamos esta anotación para que la clase la pueda reconocer como un componente
// Y así pueda participar de la inyección de dependencias

// Aquí implementaremos la Interface
public class EstudianteServicio implements IEstudianteServicio {
    /* Spring es una fábrica de objetos  que se encargará de inyectar las dependencias
    de los objetos que vayamos necesitando en nuestros objetos*/
    @Autowired
    private EstudianteRepositorio estudianteRepositorio;

    public EstudianteServicio(EstudianteRepositorio estudianteRepositorio) {
        this.estudianteRepositorio = estudianteRepositorio;
    }

    // Implementación básica de los métodos heredados de la interface

    // Método para listar estudiantes y devolver la lista
    @Override
    public List<Estudiantes2024> listarEstudiantes() {
        return estudianteRepositorio.findAll();
    }

    // Método para buscar un estudiante por id
    @Override
    public Estudiantes2024 buscarEstudiantePorId(Integer idestudiantes2024) {
        // Con findById() se regresa el estudiante si hay concordancia o null si no se encontro nada
        return estudianteRepositorio.findById(idestudiantes2024).orElse(null);
    }

    // Método para guardar estudiante
    @Override
    public void guardarEstudiante(Estudiantes2024 estudiante) {
        // Se guarda el estudiante
        estudianteRepositorio.save(estudiante);
    }

    // Método para eleminar estudiante
    @Override
    public void eliminarEstudiante(Estudiantes2024 estudiante) {
        estudianteRepositorio.delete(estudiante);
    }

    /* Con ésto ya hemos implementado la capa de servicio  */
}
