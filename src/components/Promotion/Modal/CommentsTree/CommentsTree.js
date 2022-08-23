import React, { useMemo, useState } from "react";
import "./CommentsTree.css"

function getTree(list){
    console.log('Executou')
    if(!list){
        return []
    }
    const root = [];
    const childrenByParentId = {};
    list.forEach((item) => {
        if(!item.parentId){
            root.push(item);
            return;
        }
        if(!childrenByParentId[item.parentId]){
            childrenByParentId[item.parentId] = []
        }
        childrenByParentId[item.parentId].push(item)
    });

    function buildNodes(nodes){
        if(!nodes){
            return null;
        }
        return nodes.map((node) => ({
            ...node,
            children: buildNodes(childrenByParentId[node.id])
        }))
    }

    return buildNodes(root);
}

const PromotionModalCommentsTree = ({comments, sendComment}) => {
    const tree = useMemo(() => getTree(comments), [comments])
    const [comment, setComment] = useState('');
    const [activeCommentBox, setActiveCommentBox] = useState(null);

    if(!comments){
        return <div>Carregando...</div>
    }
    
    function renderItem(item){
        return(
            <li className="promotion-modal-comments-tree__item">
                <img className="promotion-modal-comments-tree__item__avatar" src={item.user.avatarUrl} alt={`Foto de ${item.user.name}`}/>
                <div className="promotion-modal-comments-tree__item__info">
                    <span>{item.user.name}</span>
                    <p>{item.comment}</p>
                    <button type="button" className="promotion-modal-comments-tree__answer-button" onClick={() => {
                        setComment('');
                        setActiveCommentBox(activeCommentBox === item.id ? null : item.id);
                        }}>Responder</button>
                    {activeCommentBox === item.id && (
                        <div className="promotion-modal-comments-tree__comment-box">
                            <textarea value={comment} onChange={(ev) => setComment(ev.target.value)}/>
                            <button type="button" className="promotion-modal-comments-tree__send-button" onClick={() => {
                                sendComment(comment, item.id);
                                setComment('');
                                setActiveCommentBox(null)
                            }}>Enviar</button>
                        </div>
                    )}
                    {item.children && renderList(item.children)}
                </div>
            </li>
        )
    }
    function renderList(list){
        return (
            <ul className="promotion-modal-comments-tree">
                {list.map(renderItem)}
            </ul>
        )
    }

    return renderList(tree)
}

PromotionModalCommentsTree.defaultProps = {
    sendComment: () => {
    }
}

export default PromotionModalCommentsTree;