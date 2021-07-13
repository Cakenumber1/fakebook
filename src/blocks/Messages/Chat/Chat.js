/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {useAuth} from '../../../contexts/AuthContext';
import React, {useEffect, useRef, useState} from "react";
import Overlay from '../../Overlay/Overlay';
import {db} from '../../../firebase'
import Message from './Message';


const Chat = () => {

	const {currentUser} = useAuth();
	const [mess, setMess] = useState([]);
	const result = /[^/]*$/.exec(window.location.href)[0];
	console.log(result)

	useEffect(()=>{
		db.collection("users/"+currentUser.uid+"/chats/"+result+"/messages")
			.orderBy('timestamp', 'desc')
			.onSnapshot(snapshot =>
				setMess(snapshot.docs.map(doc =>({id: doc.id, data: doc.data()})))
			);
	}, []);

	return (
		<div>
			<Overlay/>
			<div>
				{mess.map(one =>(
					<Message
						key={one.id}
						text={one.data.text}
						profilePicUrl={one.data.profilePic}
						timestamp={one.data.timestamp}
						userId={one.data.userId}
						username={one.data.username}
					/>
				))}
			</div>
		</div>
	);
}

export default Chat



