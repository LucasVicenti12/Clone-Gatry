import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const initialValue = {
    title: '',
    url: '',
    imageUrl: '',
    price: 0,
}

const Form = ({id}) => {
    const [values, setValues] = useState(initialValue)
    const navigate = useNavigate();

    useEffect(() => {
        if (id){
            axios.get(`http://localhost:5000/promotions/${id}`)
            .then((response) => {
                setValues(response.data);
            })
        }
    }, []);

    function onChange(ev){
        const {name, value} = ev.target;
        setValues({...values, [name]: value});
    }

    function onSubmit(ev){
        ev.preventDefault();

        const method = id ? 'put' : 'post';
        const url = id
            ? `http://localhost:5000/promotions/${id}`
            : 'http://localhost:5000/promotions'

        axios[method](url, values)
        .then((response) => {
            navigate('/')
        });
    }
    
    return (
        <div>
            <h1>Promo Show</h1>
            <h2>Nova Promoção</h2>
            <form onSubmit={onSubmit}>
                <div className="promotion-form_group">
                    <label htmlFor="title">Título</label>
                    <input id="title" name="title" type="text" onChange={onChange} value={values.title}/>
                </div>
                <div className="promotion-form_group">
                    <label htmlFor="url">Link</label>
                    <input id="url" name="url" type="text" onChange={onChange} value={values.url}/>
                </div>
                <div className="promotion-form_group">
                    <label htmlFor="imageUrl">Imagem (Url)</label>
                    <input id="imageUrl" name="imageUrl" type="text" onChange={onChange} value={values.imageUrl}/>
                </div>
                <div className="promotion-form_group">
                    <label htmlFor="price">Preço</label>
                    <input id="price" name="price" type="number" onChange={onChange} value={values.price}/>
                </div>
                <div>
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    )
};

export default Form;