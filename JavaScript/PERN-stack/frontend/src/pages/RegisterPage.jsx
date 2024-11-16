
import {Button, Card, Input, Label} from '../components/ui'
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

function RegisterPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const {signup, errors: setUserErrors} = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async(data) => {
      const user = await signup(data);
      if (user) {
        navigate("/perfil");
      }
      
  }); 

  return (
    <div className='h-[calc(100vh-64px)] flex items-center justify-center'>
      
      <Card>
        {
          // Si existe el error
          setUserErrors && setUserErrors.map((error) => (
            // Se muestra mensaje de error en rojo
            <p className="bg-red-500 text-white text-center p-2">{error}</p>
          )) 
        }
      <h3 className='text-4xl font-bold my-2'>Registro</h3>
        <form onSubmit={onSubmit}>
          <Label htmlFor="name">Nombre</Label>
          <Input placeholder="Ingrese su nombre"
          {...register("name", {required: true})}></Input>

        {
          errors.name && <p className="text-red-500">Este campo es requerido</p>
        }
          <Label htmlFor="email">Email</Label>
          <Input type="email" placeholder="Ingrese su email"
          {...register("email", {required: true})}></Input>

        {
          errors.email && <p className="text-red-500">Este campo es requerido</p>
        }
          <Label htmlFor="password">Contraseña</Label>
          <Input type="password" placeholder="Ingrese su contraseña"
          {...register("password", {required: true})}></Input>

        {
          errors.password && <p className="text-red-500">Este campo es requerido</p>
        }
        
          <Button>Registrarse</Button>
        </form>
        <div className="flex justify-between my-4">
          <p>¿Ya tienes cuenta?</p>
          <Link to="/login" className="hover:text-sky-400">Iniciar Sesión</Link>
        </div>
      </Card>
    </div>
  )
}

export default RegisterPage