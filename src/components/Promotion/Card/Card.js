import React from "react";
import './Card.css';

const PromotionCard = ({promotion}) => {
    return(
        <div className="promotion-card">
            <img src={promotion.imageUrl} className="promotion-card_image" alt={promotion.title} />
            <div className="promotion-card_info">
                <h1 className="promotion-card_title">{promotion.title}</h1>
                <span className="promotion-card_price">R$ {promotion.price}</span>
                <footer className="promotion-card_footer">
                    {/* expressão javaScript sempre dentro de chaves */}
                    {promotion.comments.length > 0 && (
                        <div className="promotion-card_comment">"{promotion.comments[1].comment}"</div>
                    )}
                    <div className="promotion-card_comments-count">
                        {promotion.comments.length}{' '}{promotion.comments.length > 1 ? 'comentários' : 'comentário'}
                    </div>
                    <a href={promotion.url} target="_blank" rel="noreferrer" className="promotion-card_link">Ir para o Site</a>
                </footer>
            </div> 
        </div>
    )
}

export default PromotionCard;