import React from 'react';
import img1 from '../../img/prof.jpg';
import npic from '../../img/npic.jpg';

const Notifications = () => (
	<div className="notifications">
		<div className="notifications__top">
			<div><b>Уведомления</b></div>
			<button type="button">Отметить все как прочитанное</button>
		</div>
		<div className="earlier">
			<div>Ранее</div>
		</div>
		<div className="inner">
			<div className="notification">
				<div className="user">
					<img className="user__icon " src={img1} alt="{img1}"/>
				</div>
				<div className="info">
					<a className="info__name" href=""><b>Имя Фамилия</b> liked your photo</a>
					<div className="info__date">18 июня, 17:37</div>
				</div>
				<div className="news__ref">
					<img src={npic} alt=""/>
				</div>
			</div>
		</div>

	</div>
);

export default Notifications;
