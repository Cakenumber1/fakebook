import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';

import Header from '../Header/Header';
import {rmap} from '../../router';
import {db} from '../../firebase';
import {useAuth} from '../../contexts/AuthContext';
import ChatBlock from './ChatBlock';

const Messages = () => {

	const [chats, setChats] = useState([]);
	const {currentUser} = useAuth();

	useEffect(()=>{
		db.collection("users/"+currentUser.uid+"/chats")
			.onSnapshot(snapshot =>
				setChats(snapshot.docs.map(doc =>({id: doc.id, data: doc.data()})))
			);
	}, []);

	return(
	<div>
		<Header/>
		<div className="mes">
			<div className="mes__top">
				<NavLink to={rmap.get("url_ov_messages")} className="mes__cr">
					<svg viewBox="0 0 32 32">
						<g fill="#2a3345">
							<path
								d="M29.535 20.102c-0.44 0-0.797 0.357-0.797 0.797v7.076c-0.002 1.32-1.071 2.39-2.391 2.391h-22.362c-1.32-0.001-2.389-1.071-2.391-2.391v-20.768c0.002-1.32 1.071-2.389 2.391-2.391h7.076c0.44 0 0.797-0.357 0.797-0.797s-0.357-0.797-0.797-0.797h-7.076c-2.2 0.002-3.982 1.785-3.985 3.985v20.768c0.003 2.2 1.785 3.982 3.985 3.985h22.362c2.2-0.003 3.982-1.785 3.985-3.985v-7.076c0-0.44-0.357-0.797-0.797-0.797z"/>
							<path
								d="M30.016 1.172c-1.401-1.401-3.671-1.401-5.072 0l-14.218 14.218c-0.097 0.097-0.168 0.218-0.205 0.351l-1.87 6.75c-0.077 0.277 0.001 0.573 0.204 0.776s0.5 0.281 0.776 0.205l6.75-1.87c0.133-0.037 0.253-0.107 0.351-0.205l14.218-14.219c1.398-1.402 1.398-3.67 0-5.072zM12.462 15.908l11.637-11.637 3.753 3.753-11.637 11.637zM11.713 17.412l2.998 2.999-4.147 1.149zM29.824 6.052l-0.845 0.845-3.753-3.753 0.846-0.845c0.778-0.778 2.039-0.778 2.817 0l0.936 0.935c0.777 0.779 0.777 2.039 0 2.818z"/>
						</g>
					</svg>
					<div>Новое сообщение</div>
				</NavLink>
				<div className="mes__border"/>
				<NavLink to={rmap.get("url_ov_messages")} className="mes__cr">
					<svg viewBox="0 0 32 32">
						<g fill="#2a3345">
							<path
								d="M19.311 7.157c1.48 0.928 2.517 2.498 2.706 4.32 0.603 0.282 1.273 0.444 1.983 0.444 2.592 0 4.693-2.101 4.693-4.693s-2.101-4.693-4.693-4.693c-2.567 0.001-4.65 2.064-4.689 4.622zM16.236 16.766c2.592 0 4.693-2.101 4.693-4.693s-2.101-4.693-4.693-4.693c-2.592 0-4.694 2.101-4.694 4.693s2.102 4.693 4.694 4.693zM18.227 17.086h-3.982c-3.313 0-6.009 2.696-6.009 6.009v4.87l0.012 0.076 0.335 0.105c3.162 0.988 5.909 1.317 8.17 1.317 4.416 0 6.976-1.259 7.134-1.339l0.314-0.159h0.034v-4.871c0.001-3.313-2.694-6.009-6.008-6.009zM25.991 12.241h-3.952c-0.043 1.581-0.718 3.005-1.785 4.029 2.945 0.876 5.1 3.607 5.1 6.833v1.501c3.902-0.143 6.15-1.249 6.298-1.323l0.314-0.159h0.034v-4.872c0-3.313-2.696-6.009-6.009-6.009zM8.001 11.922c0.918 0 1.772-0.268 2.496-0.724 0.23-1.5 1.034-2.811 2.183-3.704 0.005-0.088 0.013-0.175 0.013-0.264 0-2.592-2.101-4.693-4.692-4.693-2.593 0-4.693 2.101-4.693 4.693 0 2.591 2.101 4.692 4.693 4.692zM12.216 16.27c-1.062-1.019-1.735-2.435-1.784-4.006-0.147-0.011-0.292-0.022-0.441-0.022h-3.982c-3.313 0-6.009 2.696-6.009 6.009v4.871l0.012 0.075 0.335 0.106c2.537 0.792 4.801 1.157 6.767 1.272v-1.471c0.001-3.226 2.155-5.956 5.101-6.833z"/>
						</g>
					</svg>
					<div>Новая группа</div>
				</NavLink>
			</div>
			<div className="mes__search">
				<input type="text" placeholder="Поиск в Messenger"/>
				<button type="button">✕</button>
			</div>
			<div className="chat__list">
				{chats.map(chat =>(
						<ChatBlock
							key={chat.id}
							profilePic={chat.data.profilePic}
							username={chat.data.username}
							text="idk"
							key2={chat.id}
						/>
					))}
			</div>
			<div className="mes__options">
				<ul type="none">
					<li><a href="">Запросы на переписку</a></li>
					<li><a href="">Отфильтрованные сообщения</a></li>
					<li><a href="">Сообщения в архиве</a></li>
					<li><a href="">Спам</a></li>
					<li><a href="">Друзья в сети</a></li>
				</ul>
			</div>
		</div>
	</div>
	)};

export default Messages;
