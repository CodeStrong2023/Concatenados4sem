import { Link, useNavigate } from "react-router-dom";
import {Card, Input, Button, Label, Container} from "../components/ui";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { register, handleSubmit} = useForm();
  const { signin, errors } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async(data) => {
    const user = await signin(data);
    if (user) {
      navigate("/perfil");
    } 
  });

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        {
          // Si existe el error
          errors && errors.map((error) => (
            // Se muestra mensaje de error en rojo
            <p className="bg-red-500 text-white text-center p-2">{error}</p>
          )) 
        }
        <h1 className="text-4xl font-bold my-2 text-center">Iniciar sesión</h1>

        <form onSubmit={onSubmit}>
          <Label htmlFor="email" >Email</Label>
          <Input type="email" placeholder="Ingrese su email" {...register("email",{
            required: true,
          })}></Input>
          <Label htmlFor="password" >Contraseña</Label>
          <Input type="password" placeholder="Ingrese su contraseña"{...register("password", {
            required: true,
          })}></Input>
          <Button>Ingresar</Button>
        </form>
        <div className="flex justify-between my-4">
          <p>¿No tienes cuenta?</p>
          <Link to="/register" className="hover:text-sky-400">Registrate</Link>
        </div>
      </Card>
    </Container>
  )
}

export default LoginPage