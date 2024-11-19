import { useEffect, useState } from 'react';
import { listarTareasRequest } from '../api/tareas.api';
import { CardTareas } from '../components/tareas/CardTareas';

function TareasPage() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    listarTareasRequest()
      .then((response) => {
        setTareas(response.data);
      });
  }, []);

  return (
    <div className='grid grid-cols-3 gap-2'>{
      tareas.map((tarea) => (
        <CardTareas tarea={tarea} key={tarea.id}/>
      )
      )
    }
    </div>
  );
}

export default TareasPage;