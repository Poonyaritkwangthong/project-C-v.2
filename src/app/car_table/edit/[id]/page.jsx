
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';



export default function EditCarPage() {
    const { id } = useParams();
    console.log(id);

    const router = useRouter();
    const [carField, setCarField] = useState({
        c_name: "",
        c_img: "",
        c_detail: "",
        c_engine_id: "",
        c_brand_id: "",
    });
    console.log(id)
    console.log(carField.c_name)
    console.log(carField.c_img)
    console.log(carField.c_detail)
    console.log(carField.c_engine_id)
    console.log(carField.c_brand_id)

    useEffect(() => {
        fetchCar();
    }, [id]);

    const fetchCar = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/cars/${id}`);
            const data = await response.json();
            if (response.ok) {
                console.log(data.cars);
                setCarField(data.cars);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Something Wrong!"
            });
        }
    }

    const [newImage, setNewImage] = useState(null);

    const changeCarFieldHandler = (e) => {
        setCarField({
            ...carField,
            [e.target.name]: e.target.value
        });
    }

    const ImageUpload = () => {
        document.getElementById('image').click();
      };
      
      const onfilechangeimage = (e) => {
        const file = e.target.files[0];
        setNewImage(file);
        setCarField(prev => (
          { ...prev,
            c_img: file,
           }
        ));
      }

    const onSubmitChange = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('c_name', carField.c_name);
        formData.append('c_img', carField.c_img); // รูปภาพจะถูกส่งใน FormData
        formData.append('c_detail', carField.c_detail);
        formData.append('c_engine_id', carField.c_engine_id);
        formData.append('c_brand_id', carField.c_brand_id);

        try {
            const response = await fetch(`http://localhost:8000/api/cars/${id}`, {
                method: 'POST',
                body: formData // แปลงข้อมูล roleField ให้เป็น JSON
            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    text: data.message,
                }, 200);
                router.push('/car_table/index')
            } else if (data.stetus === 422) {
                setError(data.errors);
                console.log(data.errors)
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Something Wrong!"
            }, 500);
        }
    }

    return (
        <div>
            <div className="max-w-md mx-auto mt-5">
                <h1 className="text-2xl text-center mb-2">Edit Car</h1>
                <form>
                    <div className="mb-3 mt-3">
                        <label className="block text-sm font-medium text-white"> ID:</label>
                        <input className='text-white' type="text" id="id" name="id" value={id} disabled />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="block text-sm font-medium textext-white"> Car Name:</label>
                        <input type="text" className="input input-bordered input-primary w-full max-w-xs text-black p-2" placeholder="Enter Car Name" name="c_name"
                            value={carField.c_name} onChange={e => changeCarFieldHandler(e)} />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="c_img" className="block text-sm font-medium text-white">
                            Car Image
                        </label>
                        <div className='overflow-hidden w-1/3 h-1/2' onClick={ImageUpload}>
                            {newImage ? ( 
                                <img className=' w-full h-full object-cover' src={URL.createObjectURL(carField.c_img)} alt="" />
                            ) : carField.c_img ? (
                                <img className="w-full " src={`http://localhost:8000/images/car/${carField.c_img}`} alt="" />
                            ) : (
                                <img src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg' alt='No Image' />
                            )}
                        </div>
                        <button type="button" onClick={ImageUpload}>Upload Image</button>
                        <input
                            name='c_img'
                            id='image'
                            hidden
                            type="file"
                            className="input input-bordered input-primary w-full max-w- text-white p-2"
                            placeholder="Car Image"
                            onChange={onfilechangeimage}
                        />
                    </div>

                    <div className="mb-3 mt-3">
                        <label className="block text-sm font-medium text-white">Car Detail:</label>
                        <input type="text" className="input input-bordered input-primary w-full max-w-xs text-black p-2"
                            id="c_detail" placeholder="Enter Car Detail" name="c_detail"
                            value={carField.c_detail} onChange={e => changeCarFieldHandler(e)} />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="block text-sm font-medium text-white">Car Engine Id:</label>
                        <input type="number" className="input input-bordered input-primary w-full max-w-xs text-black p-2"
                            id="c_engine_id" placeholder="Enter Car Engine Id" name="c_engine_id"
                            value={carField.c_engine_id} onChange={e => changeCarFieldHandler(e)} />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="block text-sm font-medium text-white">Car Brand Id:</label>
                        <input type="number" className="input input-bordered input-primary w-full max-w-xs text-black p-2"
                            id="c_brand_id" placeholder="Enter Car Brand Id" name="c_brand_id"
                            value={carField.c_brand_id} onChange={e => changeCarFieldHandler(e)} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={e => onSubmitChange(e)}>Update</button>
                </form>
            </div>
        </div>
    );
}
