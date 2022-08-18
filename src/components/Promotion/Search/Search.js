import React, {useEffect, useState} from "react";
import useApi from "../../Utils/useApi";
import {Link} from 'react-router-dom';
import "./Search.css"
import PromotionList from "../List/List";

const PromotionSearch = () => {
    const [search, setSearch] = useState('');
    const [load, loadinfo] = useApi({
      url: '/promotions',
      method: 'get',
      params: {
        _embed: 'comments',
        _order: 'desc',
        _sort: 'id',
        title_like: search || undefined,
      }
    });
  useEffect(() => {
    load()
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
        <PromotionList promotions={loadinfo.data} loading={loadinfo.loading} error={loadinfo.error}/>
    </div>
  )
}

export default PromotionSearch;