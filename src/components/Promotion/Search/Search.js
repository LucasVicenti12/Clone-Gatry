import React, {useEffect, useState} from "react";
import PromotionCard from "../../../components/Promotion/Card/Card";
import axios from "axios";
import {Link} from 'react-router-dom';
import "./Search.css"
import PromotionList from "../List/List";

const PromotionSearch = () => {
    const [promotions, setPromotions] = useState([])
    const [search, setSearch] = useState('')
// requisição
  useEffect(() => {
    const params = {};
    if (search){
        params.title_like = search;
    }
    axios.get('http://localhost:5000/promotions?_embed=comments&_order=desc&_sort=id', {params}).then((response) => {
      setPromotions(response.data)
    });
  }, [search]);

  return (
    <div className="promotion-search">
        <header className="promotion-search_header">
            <h1>Promo Show</h1>
            <Link to="/create">Nova Promoção</Link>
        </header>
        <input
            type="search"
            className="promotion-search_input"
            placeholder="Buscar"
            // controlled input
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
        />
        <PromotionList promotions={promotions} loading={!promotions.length} />
    </div>
  )
}

export default PromotionSearch;