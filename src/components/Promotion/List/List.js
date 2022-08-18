import React from "react";
import "./List.css";
import PromotionCard from "../../../components/Promotion/Card/Card";

const PromotionList = ({loading, promotions, error}) => {
    if (loading || !promotions){
        return <div>Carregando...</div>
    }
    if(promotions.length === 0){
        return <div>Nenhum resultado encontrado</div>
    }
    if(error){
        return <div>Algo de errado não esta certo</div>
    }
    // buscar os valores da requisição
    return (
        <div className="promotion-list">
           {promotions.map((promotion) => (
                <PromotionCard promotion={promotion}/>
            ))}
        </div>
    )
}

export default PromotionList;