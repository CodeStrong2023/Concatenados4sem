
import { pool } from "../db.js";

export const listarTareas = async (req, res) => {
    const resultado = await pool.query('SELECT * FROM tareas');
    console.log(resultado);
    return res.json(resultado.rows);
};

export const listarTarea = async (req, res) => {
    const restultado = await pool.query('SELECT * FROM tareas WHERE ind = $1', [req.params.id]);
    if (restultado.rowCount === 0){
        return res.status(404).json({
            message: 'La tarea no existe'
        });
    }
    return res.json(result.rows[0]);
};
   
export const crearTarea = async (req, res, next) => {
    const {titulo, descripcion} = req.body;
    

    try {   
        const result = await pool.query('INSERT INTO tareas (titulo, descripcion) VALUES ($1, $2) RETURNING *', [titulo, descripcion]);
        res.json(result.rows[0]);
        console.log(result.rows[0]);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({
                message: 'Ya existe una tarea con ese título'
            });
        }
        console.log(error);
        next(error);
    }
};


export const actualizarTarea = async (req, res) => {
    const { titulo, descripcion } = req.body;
    const id = req.params.id; 

    const result = await pool.query('UPDATE tareas SET titulo = $1, descripcion = $2 WHERE id = $3 RETURNING *', [titulo, descripcion, id]);

    if (result.rowCount === 0) {
        return res.status(404).json({
            message: 'No existe una tarea con ese id'
        });
    };
    return res.json(result.rows[0]);
};

export const eliminarTarea = async(req, res) => {
    const resultado = await pool.quert('DELET FROM tareas WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0){
        return res.status(404).json({
            message: 'No existe una tarea con ese ID'
        });
    };
    return res.sendStatus(204);
};
