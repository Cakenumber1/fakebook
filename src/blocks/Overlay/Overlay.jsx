import React from 'react';
import {NavLink} from 'react-router-dom';
import {rmap} from '../../router';

const Overlay = () => (
	<div>
		<div className="overlay">
			<NavLink to={rmap.get("url_home")}class="overlay__h__top">
				<div className="arrow">🡠</div>
				<div>/fakebook</div>
				<div className="arrow invis">🡠</div>
			</NavLink>
		</div>
	</div>
);

export default Overlay;
