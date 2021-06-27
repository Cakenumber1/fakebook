import React from 'react';
import {NavLink} from 'react-router-dom';

const Friends = () => (
	<div className="friends">
		<div className="friends__top">
			<NavLink to="/fakebook/overlay__friends/"><button type="button"><b>Рекомендации</b></button></NavLink>
			<NavLink to="/fakebook/overlay__friends/"><button type="button"><b>Друзья</b></button></NavLink>
		</div>
		<div className="friends__req inner">
			<h3>Запросы на добавление в друзья</h3>
			<div className="no__req no__text">Нет запросов</div>
		</div>
		<div className="friends__sug">
			<h3>Вы можете их знать</h3>
			<div className="no__sug inner">
				<img src="" alt=""/>
				<div className="no__text">Нет рекомендаций</div>
				<button className="find__button" type="button">Поиск друзей</button>
			</div>
		</div>
	</div>
);

export default Friends;
