"use client";
import { UserContext } from '@/app/context/UserContext';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';

export default function ViewCarPage() {
  const { user, setUser,} = useContext(UserContext);
  const { id } = useParams();
  console.log(id);

  const [car, setCar,] = useState({}); // เปลี่ยนจาก [] เป็น {}

  useEffect(() => {
    fetchCar();
  }, [id]);

  const fetchCar = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/cars/${id}`);
      const data = await response.json();
      if (response.ok) {
        console.log(data.cars);
        setCar(data.cars);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Something Wrong!"
      });
    }
  }
  
  const Like = async (car_id,) => {
    console.log('car_id', car_id);
    console.log('user_id', user?.id);
    try {
      const response = await fetch(`http://localhost:8000/api/likes/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // เพิ่มการตั้งค่า Content-Type
        },
        body: JSON.stringify({ car_id })
      });
      const data = await response.json();
      console.log(user);
      console.log(response);
      console.log(data);
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          text: data.message,
        })
      } else if (response.status === 400) {
        Swal.fire({
          icon: 'warning',
          text: data.message,
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error,
      })
    }
  }
  const deleteLike = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/likes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // เพิ่มการตั้งค่า Content-Type
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error,
      })
    }
  }

  return (
    <div>
      <div>
        <a href="/car">back</a>
      </div>

      <div className='flex justify-center gap-[5rem] border-2 border-white p-8'>
        <div className='w-[35rem] overflow-hidden border-2 border-white p-5'>
          <h1 className='flex gap-2 items-center text-2xl'><p className=' font-bold'>Car ID :</p> {car?.id}</h1>
        
          <h1 className='mt-2 text-4xl'>{car?.c_name}</h1>

          <div className='mt-4 '>
          <h1 className='text-3xl font-bold'>Car Detail </h1>
          <p className="mt-6 text-xl">{car?.c_detail} {car?.brand?.b_name} {car?.brand?.b_location} {car?.brand?.founded_year}</p>
          </div>
          <div>
          <h1>{car?.engine?.e_type}</h1>
      <h1>{car?.engine?.e_detail}</h1>
      <h1>{car?.engine?.e_hp}</h1>
          </div>
          <button onClick={() => Like(car?.id)} >like</button>

        </div>
        <div className='w-1/2'>
          <img className="w-full " src={`http://localhost:8000/images/car/${car.c_img}`} alt="" />
        </div>
      </div>
    </div>
  );
}
