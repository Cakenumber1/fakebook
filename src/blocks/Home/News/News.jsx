import React from 'react';
import img1 from '../../../img/prof.jpg';
import err from '../../../img/error.png';
import npic from '../../../img/npic.jpg';
import like from '../../../img/like.svg';
import {NavLink} from 'react-router-dom';

const News = () => (
	<div className="news__container">
		<div className="news__top">
			<NavLink to="/fakebook/user1" className="user">
				<img className="user__icon " src={img1} alt="{img1}"/>
			</NavLink>
			<div className="info">
				<NavLink to="/fakebook/user1" className="info__name" href=""><b>Имя Фамилия</b></NavLink>
				<div className="info__date">
					<div>
						18 июня, 17:37
					</div>
					<div>·</div>
					<div>
						<img src={err} height="10px" width="12px" alt=""/>
					</div>
				</div>
			</div>
			<div className="news__options">
				<svg className="svg-icon" id="dropdown" viewBox="0 0 32 32">
					<g>
						<path d="M4 12c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zM28 12c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zM16 12c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/>
					</g>
				</svg>
				<div className="news__options__content">
					<a href="#">Опция 1</a>
					<a href="#">Опция 2</a>
					<a href="#">Опция 3</a>
					<a href="#">Опция 4</a>
					<a href="#">Опция 5</a>
					<a href="#">Опция 6</a>
				</div>
			</div>
		</div>
		<div className="news__text">Текст Новости</div>
		<div className="news__img">
			<img src={npic} alt=""/>
		</div>
		<div className="likesncomments">
			<div className="likes__c"><img src={like} height="15" width="15" alt=""/> 0</div>
			<div className="comments__c">Комментарии: 0</div>
		</div>
		<div className="news__actions">
			<div className="add__like">Нравится</div>
			<div className="add__comment">Комментировать</div>
			<div className="add__share">Поделиться</div>
		</div>
		<div className="top__comment">
			<div className="user">
				<img className="user__icon " src={img1} alt=""/>
			</div>
			<div className="comment__inner">
				<div className="comment__name"><b>Имя Фамилия</b></div>
				<div className="comment__text"> кстТекстксткстТексткстТекстксткстТексткстТекстксткстТекст</div>
			</div>
		</div>
	</div>
);

export default News;
