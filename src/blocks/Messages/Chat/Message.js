import React from "react";

export default function Message({arr}){
	if (arr[3]===undefined) {
		return (
			<div className="message-container" id={arr[0]}>
				<div className="spacing">
					<div className="pic">{arr[4]}</div>
				</div>
				<div className="message">{arr[3]}</div>
				<div className="name">{arr[2]}</div>
			</div>
		);
	} else {
		return (
			<div className="message-container" id={arr[0]}>
				<div className="spacing">
					<div className="pic">{arr[4]}</div>
				</div>
				<div className="message">
					<img src={arr[5] + '&' + new Date().getTime()} alt=""/>
				</div>
				<div className="name">{arr[2]}</div>
			</div>
		);
	}
}