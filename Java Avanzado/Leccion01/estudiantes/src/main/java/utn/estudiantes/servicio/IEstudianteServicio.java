package utn.estudiantes.servicio;


import utn.estudiantes.modelo.Estudiantes2024;

import java.util.List;

// La Interface de servicio nos permite hacer un rollback para deshacer cambios en la base de datos
public interface IEstudianteServicio {
    public List<Estudiantes2024> listarEstudiantes();
    public Estudiantes2024 buscarEstudiantePorId(Integer idEstudiante);
    public void guardarEstudiante(Estudiantes2024 estudiante);
    public void eliminarEstudiante(Estudiantes2024 estudiante);
}
