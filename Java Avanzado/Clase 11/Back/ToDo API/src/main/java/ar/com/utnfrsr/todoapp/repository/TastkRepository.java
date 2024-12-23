package ar.com.utnfrsr.todoapp.repository;

import ar.com.utnfrsr.todoapp.model.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TastkRepository extends JpaRepository<Task, Long> { //<Nombre de la entidad, tipo del identificador que marcamos con @id>

    /**
     * Update task to status (true or false)
     *
     * @param id Recibe el ide para pasarlo a la query nativa
     * @param finished Recibe el estado para pasarlo a la query nativa
     */
    @Modifying //Demuestra que la query es de actualización
    @Query(value = "UPDATE TASK SET FINISHED=:finished WHERE ID=:id", nativeQuery = true)
    void markTaskAsFinished(@Param("id") Long id, @Param("finished") boolean finished);
}