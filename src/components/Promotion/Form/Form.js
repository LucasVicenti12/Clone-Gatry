import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import useApi from "../../Utils/useApi";

const initialValue = {
    title: '',
    url: '',
    imageUrl: '',
    price: 0,
}

const Form = ({id}) => {
    const [values, setValues] = useState(initialValue)
    const navigate = useNavigate();
    const [load] = useApi({
        url: `/promotions/${id}`,
        methos: 'get',
        onCompleted: (response) => {
            setValues(response.data);
        }
    })

    const [save, saveInfo] = useApi({
        url: id
        ? `/promotions/${id}` : '/promotions',
        method: id ? 'put' : 'post',
        onCompleted: (response)  => {
            if(!response.error){
                navigate('/');
            }
        }
    })

    useEffect(() => {
        if (id){
            load();
        }
    }, [id]);

    function onChange(ev){
        const {name, value} = ev.target;
        setValues({...values, [name]: value});
    }

    function onSubmit(ev){
        ev.preventDefault();
        save({
            data: values
        });
    }
    
    return (
        <div>
            <h1>Promo Show</h1>
            <h2>Nova Promoção</h2>
            <form onSubmit={onSubmit}>
                {saveInfo.loading && <span>Salvando dados...</span>}
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