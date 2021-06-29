import React from 'react';
import {NavLink} from 'react-router-dom';

const Overlay = () => (
	<div>
	<div className="overlay">
		<NavLink to="/fakebook/home" class="overlay__h__top">
			<div className="arrow">🡠</div>
			<div>/fakebook/home</div>
			<div className="arrow invis">🡠</div>
		</NavLink>
	</div>
	</div>
);

export default Overlay;
