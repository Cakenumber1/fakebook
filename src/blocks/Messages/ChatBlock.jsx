import React from 'react';
import {NavLink} from 'react-router-dom';

import {rmap} from '../../router';

const ChatBlock = ({key2, username, text, timestamp, chatPic, withname}) => {
	return (
		<NavLink to={rmap.get("url_chat")+key2} className="chat">
			<div className="user">
				<img className="user__icon " src={chatPic}/>
			</div>
			<div className="info">
				<div className="chat__name">{withname}</div>
				<div className="chat__ls">{username}: {text}</div>
			</div>
			<div>{new Date(timestamp?.toDate()).toUTCString()}</div>
		</NavLink>
	)
}

export default ChatBlock