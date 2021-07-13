import React from 'react';
import {NavLink} from 'react-router-dom';
import {rmap} from '../../router';
import img1 from "../../img/prof.jpg";

const ChatBlock = ({key2, target}) => {
	return (
		<NavLink to={rmap.get("url_chat")+key2} className="chat">
			<div className="user">
				<img className="user__icon " src={img1} alt="{img1}"/>
			</div>
			<div className="info">
				<div className="chat__name">{key2}</div>
				<div className="chat__ls">Текст сообщения</div>
			</div>
			<div>[Date]</div>
		</NavLink>
	)
}

export default ChatBlock