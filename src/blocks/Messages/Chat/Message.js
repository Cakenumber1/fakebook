import React from "react";

const Message = ({text, profilePicUrl, timestamp, UserId, username}) => {
	console.log(1)
	return (
		<div>
			<div>
				<div>{profilePicUrl}</div>
			</div>
			<div>{text}</div>
			<div>{username}</div>
			<div>{new Date(timestamp?.toDate()).toUTCString()}</div>
		</div>
	);
}
export default Message