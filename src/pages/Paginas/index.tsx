// src/pages/Paginas/index.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';

export default function Paginas() {
  const [isRegistering, setIsRegistering] = useState(true);
  const [formData, setFormData] = useState({
    userName: '',
    correo: '',
    contrasena: '',
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      try {
        const response = await axios.post('/api/inicio-sesionUsuario/register', formData);
        toast.success('Registro exitoso');
        console.log('Registration successful:', response.data);
      } catch (error) {
        console.error('No se pudo registrar:', error);
        toast.error('Error en el registro');
      }
    } else {
      try {
        const response = await axios.post('/api/inicio-sesionUsuario/auth', {
          identificador: formData.correo,
          contrasena: formData.contrasena,
        });
        const { token } = response.data;
        Cookies.set('token', token); // Guarda el token en las cookies

        toast.success('Inicio de sesión exitoso');
        console.log('Login successful:', response.data);

        // Redirige al usuario según su rol
        const userResponse = await axios.get('/api/inicio-sesionUsuario/auth', {
          headers: { Authorization: `Bearer ${token}` },
        });
        Cookies.set('id', userResponse.data.id);
        Cookies.set('userName', userResponse.data.userName);
        Cookies.set('correo', userResponse.data.correo);
        Cookies.set('contrasena', userResponse.data.contrasena);
        Cookies.set('rol', userResponse.data.rol);
        const { rol } = userResponse.data;

        if (rol === 'Estudiante') {
          router.push('/Paginas/Estudiante');
        } else if (rol === 'Profesor') {
          router.push('/Paginas/Profesor');
        } else {
          toast.error('Rol de usuario desconocido');
        }
      } catch (error) {
        console.error('No se pudo iniciar sesión:', error);
        toast.error('Error en el inicio de sesión');
      }
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex min-h-full flex-col justify-center px-6 py-8 lg:px-8 block w-full rounded-md border-0 py-1.5 bg-sky-50 shadow-2xl'>
      <h1 className='sm:mx-auto sm:w-full sm:max-w-sm text-black mb-5 not-italic text-2xl text-center'>{isRegistering ? 'Registro' : 'Inicio de Sesión'}</h1>
      <form onSubmit={handleSubmit} method="POST" className='space-y-6'>
        {isRegistering && (
          <input
            className='block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-left'
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Nombre de usuario"
            required
          />
        )}
        <input
          className='block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          type="text"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder={isRegistering ? "Correo" : "Correo o User Name"}
          required
        />
        <input
          className='block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          type="password"
          name="contrasena"
          value={formData.contrasena}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        <div className='flex justify-center'>
          <button type="submit" className='text-center text-black bg-indigo-300 p-2 py-2 px-5 rounded-lg'>{isRegistering ? 'Registrar' : 'Iniciar'}</button>
        </div>
      </form>
      <button onClick={toggleMode} className='text-center text-black underline p-3'>
        {isRegistering ? 'Inicio de Sesión' : 'Registro'}
      </button>
      <Toaster />
    </div>
  );
}
