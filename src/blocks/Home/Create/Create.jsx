import React from 'react';
import {NavLink} from 'react-router-dom';

import {useAuth} from '../../../contexts/AuthContext';
import {rmap} from '../../../router';

import img1 from '../../../img/prof.jpg';

const Create = () => {

	const {currentUser} = useAuth();

	return (
		<div className="create">
			<div>
				<NavLink to={rmap.get("url_ov_home")} className="user">
					<img className="user__icon " src={currentUser.photoURL} alt={img1}/>
				</NavLink>
			</div>
			<div className="create__mid">
				<NavLink to={rmap.get("url_create_post")}>
					<button type="button" className="decor">Что у вас нового?</button>
				</NavLink>
			</div>
			<div className="decor">
				<NavLink to={rmap.get("url_create_post")} className="photo">
					<svg className="svg-icon" viewBox="0 0 32 32">
						<g fill="#2a3345">
							<path
								d="M29.996 4c0.001 0.001 0.003 0.002 0.004 0.004v23.993c-0.001 0.001-0.002 0.003-0.004 0.004h-27.993c-0.001-0.001-0.003-0.002-0.004-0.004v-23.993c0.001-0.001 0.002-0.003 0.004-0.004h27.993zM30 2h-28c-1.1 0-2 0.9-2 2v24c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-24c0-1.1-0.9-2-2-2v0z"
							/>
							<path d="M26 9c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"/>
							<path d="M28 26h-24v-4l7-12 8 10h2l7-6z"/>
						</g>
					</svg>
					<p className="decor">Фото</p>
				</NavLink>
			</div>
		</div>
	);
}

export default Create;
