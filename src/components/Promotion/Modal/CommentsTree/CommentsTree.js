import React from "react";
import "./CommentsTree.css"

const PromotionModalCommentsTree = ({comments}) => {

    if(!comments){
        return <div>Carregando...</div>
    }

    return(
        <ul className="promotion-modal-comments-tree">
            {comments.map((item) => (
                <li className="promotion-modal-comments-tree__item">
                    <img className="promotion-modal-comments-tree__item__avatar" src={item.user.avatarUrl} alt={`Foto de ${item.user.name}`}/>
                    <div className="promotion-modal-comments-tree__item__info">
                        <span>{item.user.name}</span>
                        <p>{item.comment}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default PromotionModalCommentsTree;