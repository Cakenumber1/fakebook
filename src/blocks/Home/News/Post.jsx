import React, {useEffect, useRef, useState} from 'react';
import {NavLink} from 'react-router-dom';

import like_img from '../../../img/like.svg';
import err from '../../../img/error.png';

import {rmap} from '../../../router';
import {useAuth} from '../../../contexts/AuthContext';
import Comment from './Comment';
import {db, fieldValue} from '../../../firebase';

function Post({key2, profilePic, image, username, timestamp, message, likes}) {

	const {currentUser} = useAuth();
	const n_o_c = useRef();
	const [comments, setComments] = useState([]);

	function dropdown() {
		if (n_o_c.current.style.display === 'none') {
			n_o_c.current.style.display = 'block';
		} else {
			n_o_c.current.style.display = 'none';
		}
	}

	useEffect(async () => {
		db.collection("news/" + key2 + "/comments/")
			.orderBy("likeCount", "desc")
			.onSnapshot(snapshot =>
				setComments(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
			);
	}, []);

	function like() {
		let path = db.collection('news').doc(key2);
		if (likes.indexOf(currentUser.uid) === -1) {
			// Add a new uid to the "likes" array field.
			path.update({
				likes: fieldValue.arrayUnion(currentUser.uid)
			});
		} else {
			// Remove uid to the "likes" array field.
			path.update({
				likes: fieldValue.arrayRemove(currentUser.uid)
			});
		}
	}

	return (
		<div className="news__container">
			<div className="news__top">
				<NavLink to={rmap.get("url_ov_home")} className="user">
					<img className="user__icon " src={profilePic}/>
				</NavLink>
				<div className="info">
					<NavLink to={rmap.get("url_ov_home")} className="info__name"><b>{username}</b></NavLink>
					<div className="info__date">
						<div>
							{new Date(timestamp?.toDate()).toUTCString()}
						</div>
						<div>·</div>
						<div>
							<img src={err} height="10px" width="12px" alt=""/>
						</div>
					</div>
				</div>
				<div className="news__options" onClick={dropdown}>
					<svg className="svg-icon" viewBox="0 0 32 32">
						<g>
							<path
								d="M4 12c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zM28 12c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zM16 12c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/>
						</g>
					</svg>
					<div className="news__options__content" ref={n_o_c}>
						<a href="#">Опция 1</a>
						<a href="#">Опция 2</a>
						<a href="#">Опция 3</a>
						<a href="#">Опция 4</a>
						<a href="#">Опция 5</a>
						<a href="#">Опция 6</a>
					</div>
				</div>
			</div>
			<div className="news__text">
				<NavLink to={rmap.get("url_post") + key2}>{message}</NavLink>
			</div>
			{
				image &&
				<NavLink to={rmap.get("url_post") + key2} className="news__img">
					<img src={image} height="360" width="360" alt=""/>
				</NavLink>
			}
			<div className="likesncomments">
				<div className="likes__c" onClick={like}><img src={like_img} height="15" width="15"
				/>{likes.length}</div>
				<div className="comments__c">Комментарии:{}</div>
			</div>
			<div className="news__actions">
				<div className="add__like" onClick={like}>Нравится</div>
				<div className="add__comment">
					<NavLink to={rmap.get("url_post") + key2}>
						Комментировать
					</NavLink>
				</div>
				<div className="add__share">Поделиться</div>
			</div>
			<div>
				{comments.map(comment => (
					<Comment
						post={key2}
						data={comment.data}
						id={comment.id}
					/>
				))}
			</div>
		</div>
	);
};

export default Post;
