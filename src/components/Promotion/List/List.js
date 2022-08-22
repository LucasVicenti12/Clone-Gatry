import React, { useState } from "react";
import "./List.css";
import PromotionCard from "../../../components/Promotion/Card/Card";
import PromotionModal from "../Modal/Modal";

const PromotionList = ({loading, promotions, error}) => {
    const [promotionId, setPromotionId] = useState(null);
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
                <PromotionCard promotion={promotion} onClickComments={() => setPromotionId(promotion.id)}/>
            ))}
            {
                promotionId &&(
                <PromotionModal promotionId={promotionId} onClickClose={() => setPromotionId(null)} />)
            }
        </div>
    )
}

export default PromotionList;