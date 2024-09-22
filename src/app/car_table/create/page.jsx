'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Swal from 'sweetalert2';


export default function CreateCarPage () {
    const [carField, setCarField] = useState({
        c_name: '',
        c_img: '',
        c_detail: '',
        c_engine_id: '',
        c_brand_id: '',
    });

    const [carImage, setCarImage] = useState(null);

    const [error, setError] = useState([]);
    const router = useRouter();
    
    const changeCarFieldHandler = (e) => {
        setCarField({
            ...carField,
            [e.target.name]: e.target.value
        });
    }
    console.log(carField.c_name)
    console.log(carField.c_img)
    console.log(carField.c_detail)
    console.log(carField.c_engine_id)
    console.log(carField.c_brand_id)
    console.log(carImage)
    
    const ImageUpload = () => {
      document.getElementById('image').click();
    };
    
    const onfilechangeimage = (e) => {
      const file = e.target.files[0];
      setCarField(prev => (
        { ...prev,
          c_img: file,
         }
      ));
    }

    const onSubmitChange = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append('c_name', carField.c_name);
      formData.append('c_img', carField.c_img); // รูปภาพจะถูกส่งใน FormData
      formData.append('c_detail', carField.c_detail);
      formData.append('c_engine_id', carField.c_engine_id);
      formData.append('c_brand_id', carField.c_brand_id);
    
      try {
        const response = await fetch(`http://localhost:8000/api/cars`,{
          method: 'POST',
          body: formData, 
        });
    
        const data = await response.json(); 
        if (response.ok) {
          Swal.fire({
            icon: "success",
            text: data.message, 
          });
          router.push('/car_table/index');
        } else if (data.status === 422) {
          setError(data.errors);
          console.log(data.errors);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "Something went wrong!" 
        });
      }
    }
   
  return (
    <div>
       <div className="max-w-md mx-auto mt-5">
        <h1 className="text-2xl text-center mb-2">Add New Car</h1>
        <div>
        <form>
        <div className="mb-5">
          <label htmlFor="c_name" className="block text-sm font-medium text-white">
            Car Name
          </label>
          <input
            type="text"
            name="c_name"
            id="c_name"
            className="input input-bordered input-primary w-full max-w-xs text-black p-2"
            placeholder="Car Name..."
            onChange={e => changeCarFieldHandler(e)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="c_img" className="block text-sm font-medium text-white">
            Car Image
          </label>
          <div className='overflow-hidden w-1/3 h-1/2' onClick={ImageUpload}>
          {carField.c_img ? (
               <img className=' w-full h-full object-cover' src={URL.createObjectURL(carField.c_img)} alt="" />
              ) : (
                <img src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg' alt='No Image'/> 
              )}
          </div>
          <button type="button" onClick={ImageUpload}>Upload Image</button>
          <input
          name='c_img'
          id='image'
          hidden
            type="file"
            className="input input-bordered input-primary w-full max-w- text-black p-2"
            placeholder="Car Image"
            onChange={onfilechangeimage}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="c_detail" className="block text-sm font-medium text-white">
            Car detail
          </label>
          <input
            type="text"
            name="c_detail"
            id="c_detail"
            className="input input-bordered input-primary w-full max-w-xs text-black p-2"
            placeholder="Car detail"
            onChange={e => changeCarFieldHandler(e)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="c_engine_id" className="block text-sm font-medium text-white">
            Car Engine Id
          </label>
          <input
            type="number"
            name="c_engine_id"
            id="c_engine_id"
            className="input input-bordered input-primary w-full max-w-xs text-black p-2"
            placeholder="Car Engine"
            onChange={e => changeCarFieldHandler(e)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="c_brand_id" className="block text-sm font-medium text-white">
            Car Brand Id
          </label>
          <input
            type="number"
            name="c_brand_id"
            id="c_brand_id"
            className="input input-bordered input-primary w-full max-w-xs text-black p-2"
            placeholder="Car Brand"
            onChange={e => changeCarFieldHandler(e)}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={e => onSubmitChange(e)}>Add Car</button> 
      </form>
    </div>
    </div>
    </div>
  );
};


