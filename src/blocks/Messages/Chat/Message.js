import React from 'react';

import {useAuth} from '../../../contexts/AuthContext';

const Message = ({text, profilePicUrl, timestamp, userId, username}) => {

	const {currentUser} = useAuth();

	let mcl = "d-flex justify-content-between bg-secondary text-white m-1"
	let inner_mcl = "d-flex"

	if (userId === currentUser.uid){
		mcl = "d-flex flex-row-reverse justify-content-between bg-info text-white m-1"
		inner_mcl = "d-flex flex-row-reverse"

	}
	return (
		<div className="d-flex flex-column">
			<div className={mcl}>
				<div className={inner_mcl}>
					<img src={profilePicUrl} className="w-10px rounded-circle"/>
					<div className="d-flex flex-column justify-content-around">
						<div><b>{username}</b></div>
						<div>{text}</div>
					</div>
				</div>
			</div>
			<div>{new Date(timestamp?.toDate()).toUTCString()}</div>
		</div>
	);
}
export default Message