import React from 'react';
import {NavLink} from 'react-router-dom';
import {rmap} from '../../../router';
import like_img from '../../../img/like.svg';
import {db, fieldValue} from '../../../firebase';
import {useAuth} from '../../../contexts/AuthContext';

function Comment({post, data, id}) {

	const {currentUser} = useAuth();

	function like() {
		let path = db.collection("news/" +post+"/comments/").doc(id);
		let c = data.likeCount

		if (data.likes.indexOf(currentUser.uid) === -1) {
			// Add a new uid to the "likes" array field.
			path.update({
				likes: fieldValue.arrayUnion(currentUser.uid),
				likeCount: ++c
			});
		} else {
			// Remove uid to the "likes" array field.
			path.update({
				likes: fieldValue.arrayRemove(currentUser.uid),
				likeCount: --c
			});
		}
	}

	return (
		<div className="top__comment">
			<div className="user">
				<NavLink to={rmap.get("url_ov_home")}>
					<img className="user__icon " src={data.profilePic} alt=""/>
				</NavLink>
			</div>
			<div className="comment__inner">
				<div>
					<NavLink to={rmap.get("url_ov_home")}
							 className="comment__name"><b>{data.username}</b></NavLink>
					<NavLink to={rmap.get("url_ov_home")}
							 className="comment__text"> {data.text}</NavLink>
				</div>
				<div className="likes__c" onClick={like}><img src={like_img} height="15" width="15"/>{data.likeCount}</div>
			</div>
		</div>
	)
}

export default Comment