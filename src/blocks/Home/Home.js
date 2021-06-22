import React from 'react';
import Create from './Create/Create';
import News from './News/News';
import FindF from './FindF/FindF';

const Home = () => (
	<div className="full__home">
		<Create/>
		<News/>
		<FindF/>
	</div>
);

export default Home;
