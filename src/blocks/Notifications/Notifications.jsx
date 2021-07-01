import React from 'react';
import {NavLink} from 'react-router-dom';

import Header from '../Header/Header';
import img1 from '../../img/prof.jpg';
import npic from '../../img/npic.jpg';

import {rmap} from '../../router';

const Notifications = () => (
	<div>
		<Header/>
		<div className="notifications">
			<div className="notifications__top">
				<div><b>Уведомления</b></div>
				<button type="button">Отметить все как прочитанное</button>
			</div>
			<div className="earlier">
				<div>Ранее</div>
			</div>
			<div className="inner">
				<NavLink to={rmap.get("url_ov_notifications")} className="notification">
					<div className="user">
						<NavLink to={rmap.get("url_ov_notifications")}>
							<img className="user__icon " src={img1} alt="{img1}"/>
						</NavLink>
					</div>
					<div className="info">
						<div className="info__name"><NavLink to={rmap.get("url_ov_notifications")}><b>Имя
							Фамилия</b></NavLink> liked your photo
						</div>
						<div className="info__date">18 июня, 17:37</div>
					</div>
					<div className="news__ref">
						<img src={npic} alt=""/>
					</div>
				</NavLink>
			</div>
		</div>
	</div>
);

export default Notifications;
