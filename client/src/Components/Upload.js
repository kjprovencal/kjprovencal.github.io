import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './Spinner';
import axios from 'axios';

export default function Upload() {
    const [input, setInput] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = e => {
        setInput({...input, [e.target.name]: e.target.value})
    }
    const handleFileChange = e => {
        setInput({...input, image: e.target.files[0]})
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!input.name || !input.desc || !input.image){
            return;
        }
        setIsLoading(true);
        // When a post request is sent to the create url, we'll add a new record to the database.
        const newImage = new FormData();
        newImage.append('image', input.image)
        newImage.append('name', input.name)
        newImage.append('desc', input.desc)
        axios.post("http://localhost:5000/upload", newImage)
        .then(res => {
            setInput({ name: "", desc: "", image: ""}); 
            setIsLoading(true);
            return;
        })
        .catch(error => {
            setIsLoading(false);
            window.alert(error);
            setInput({...input});
            return;
        });
    }
    return (
        <div>
            <h3>Upload Image</h3>
            {isLoading && <LoadingSpinner/>}
            <div>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div>
                        <label htmlFor="name">Image Title</label>
                        <input type="text" id="name" placeholder="Name" 
                            name="name" onChange={handleChange} value={input.name || ''} required/>
                    </div>
                    <div>
                        <label htmlFor="desc">Image Description</label>
                        <textarea id="desc" name="desc" onChange={handleChange} rows="2" 
                                placeholder="Description" value={input.desc || ''} required>
                        </textarea>
                    </div>
                    <div>
                        <label htmlFor="image">Upload Image</label>
                        <input type="file" id="image" 
                            name="image" onChange = {handleFileChange}  required/>
                    </div>
                    <div>
                        <button type="submit" disabled={isLoading}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}