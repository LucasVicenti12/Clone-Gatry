import React from "react";
import "./List.css";
import PromotionCard from "../../../components/Promotion/Card/Card";

const PromotionList = ({loading, promotions}) => {
    if (loading){
        return <div>Carregando...</div>
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