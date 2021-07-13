import React from 'react';
import {NavLink} from 'react-router-dom';
import {rmap} from "../../../router";

function Comment({profilePic, userUid, username, text, likes}) {
	return (
		<div className="top__comment">
			<div className="user">
				<NavLink to={rmap.get("url_ov_home")}>
					<img className="user__icon " src={profilePic} alt=""/>
				</NavLink>
			</div>
			<div className="comment__inner">
				<NavLink to={rmap.get("url_ov_home")}
						 className="comment__name"><b>{username}</b></NavLink>
				<NavLink to={rmap.get("url_ov_home")}
						 className="comment__text"> }{text}</NavLink>
			</div>
		</div>
	)
}

export default Comment