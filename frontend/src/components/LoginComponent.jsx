import { useState } from 'react'
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import MailIconComponent from './Icons/MailIconComponent';
import EyeFilledIconComponent from "./Icons/EyeFilledIconComponent";
import EyeSlashFilledIconComponent from "./Icons/EyeSlashFilledIconComponent";

export default function LoginComponent() {
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState("login");
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nombreError, setNombreError] = useState('');
  const register = () => {
    setEmailError('');
    setPasswordError('');
    setNombreError('');

    let isValid = true;

    // Validación del campo de email
    if (!email || !email.includes('@')) {
      setEmailError('Email no válido');
      isValid = false;
    }

    if (!nombre || nombre.length < 15) {
      setNombreError('El nombre es incorrecto.');
      isValid = false;
    }

    // Validación del campo de contraseña
    if (!password || password.length < 6) {
      setPasswordError('Contraseña no válida');
      isValid = false;
    }

    if (isValid) {
      if (selected != "login") {
        const data = {
          idtipousuario: 1,
          nombre: nombre,
          password: password,
          email: email,
        };

        // Realiza la solicitud POST al servidor
        axios
          .post('http://localhost:7000/api/usuarios', data)
          .then((response) => {

            if (response.data.success) {
              Swal.fire(response.data.msg, '', 'success')
              const navigate = useNavigate()
              navigate('/')
            }
            console.log('Respuesta del servidor:', response.data);
          })
          .catch((error) => {
            // Maneja errores de la solicitud
            console.log(error.response.data.msg);
            Swal.fire(error.response.data.msg, '', 'error')
          });
      }
    } else {
      axios
        .post('http://localhost:7000/api/usuarios/login', data)
        .then((response) => {

          if (response.data.success) {
            Swal.fire(response.data.msg, '', 'success')
            const navigate = useNavigate()
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/')
          }else{
            
          }
        })
        .catch((error) => {
          // Maneja errores de la solicitud
          console.log(error.response.data.msg);
          Swal.fire(error.response.data.msg, '', 'error')
        });
    }
  }
  return (
    <div className="flex justify-center items-center ">
      <Image
        removeWrapper
        alt="Card background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://www.meridadeyucatan.com/wp-content/uploads/2018/10/heade1_opt.jpg"
        isBlurred
      />
      <Card className="flex mt-10 relative w-[380px] h-[500px] mb-5">
        <CardBody className="">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Iniciar sesión">
              <form className="flex flex-col gap-4">
                <Input
                  type="email"
                  label="Email"
                  placeholder="tu@email.com"
                  labelPlacement="outside"
                  startContent={
                    <MailIconComponent className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span style={{ color: 'red' }}>{emailError}</span>
                <Input
                  label="Constraseña"
                  labelPlacement="outside"
                  placeholder="Ingresa tu contraseña"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeSlashFilledIconComponent className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      ) : (
                        <EyeFilledIconComponent className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span style={{ color: 'red' }}>{passwordError}</span>
                <p className="text-center text-small">
                  Nesesitas una cuenta?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Registrarse
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" onClick={register}>
                    Iniciar
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Registrarse">
              <form className="flex flex-col gap-4 h-[300px]">
                <Input isRequired label="Name" placeholder="Enter your name" type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <span style={{ color: 'red' }}>{nombreError}</span>
                <Input isRequired label="Email" placeholder="Enter your email" type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span style={{ color: 'red' }}>{emailError}</span>
                <Input
                  label="Constraseña"
                  labelPlacement="outside"
                  placeholder="Ingresa tu contraseña"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeSlashFilledIconComponent className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      ) : (
                        <EyeFilledIconComponent className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span style={{ color: 'red' }}>{passwordError}</span>
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" onClick={register}>
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}



