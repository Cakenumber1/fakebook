import React from 'react';
import {NavLink} from 'react-router-dom';

const User = () => (
	<div className="user__homepage">
		<NavLink to="/fakebook/home" class="user__h__top">
			<div className="arrow">🡠</div>
			<div>Имя Фамилия</div>
			<div className="arrow invis">🡠</div>
		</NavLink>
	</div>

);

export default User;
