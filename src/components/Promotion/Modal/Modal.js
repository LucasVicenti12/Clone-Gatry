import React, { useEffect, useState } from "react";
import UIModal from "../../UI/Modal/Modal";
import useApi from "../../Utils/useApi";
import PromotionModalCommentsTree from "./CommentsTree/CommentsTree";
import "./Modal.css"

const PromotionModal = ({promotionId, onClickClose}) => {
    const [comment, setComment] = useState('');
    const [load, loadInfo] = useApi({
        url: '/comments',
        params: {
            promotionId,
            _expand: 'user'
        }
    });

    const [sendComment, sendCommentInfo] = useApi({
        url: '/comments',
        method: 'post',
    });

    useEffect(() => {
        load()
        // eslint-disable-next-line
    }, []);

    async function onSubmit(ev){
        ev.preventDefault();
        try {
            await sendComment({
                data: {
                    userId: 1,
                    promotionId,
                    comment,
                }
            })
            setComment('');
            load();
        } catch (error) {
            
        }
    }

    return(
        <UIModal isOpen onClickClose={onClickClose}>
            <form className="promotion-modal__comment-form" onSubmit={onSubmit}>
                <textarea placeholder="Comentar..." onChange={(ev) => setComment(ev.target.value)} value={comment}/>
                <button type="submit" disabled={sendCommentInfo.loading}>
                    {sendCommentInfo.loading ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
            <PromotionModalCommentsTree comments={loadInfo.data}/>
        </UIModal>
    );
}

export default PromotionModal;