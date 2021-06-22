import React from 'react';

const Search = () => (
	<div className="search">
		<div className="search__top">
			<div className="search__main">
				<div className="lens">🔍</div>
				<input type="text" placeholder="Поиск"/>
				<button type="button">×</button>
			</div>
			<button className="cans" type="button">Отмена</button>
		</div>
	</div>

);

export default Search;
