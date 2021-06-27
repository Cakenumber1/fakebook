import React from 'react';
import {NavLink} from 'react-router-dom';

const Overlay = data => (
	<div className="overlay">
		<NavLink to={data.prev} class="overlay__h__top">
			<div className="arrow">🡠</div>
			<div>{data.prev}</div>
			<div className="arrow invis">🡠</div>
		</NavLink>
	</div>
);

export default Overlay;
