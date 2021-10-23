import React from 'react';
import { Panel, Group, Card, Div, Avatar, Tappable, Header } from '@vkontakte/vkui';
import './Home.scss'

const MemberCard = ({avatar, name, skills, link}) => {
	function openLink(link) {
		let a = document.createElement('a');
		a.target = '_blank';
		a.href = link;
		a.click();
	}

	return (
		<Card className={'MemberCard'} mode={'shadow'}>
			<Tappable className={'Content__Wrapper'} onClick={() => openLink(link)}>
				<Div className={'Content'}>
					<Avatar src={avatar} size={96}/>
					<div className={'Name'}>{name}</div>
					<div className={'Skills'}>
						{skills.map(item => (
							<div>{item}</div>
						))}
					</div>
				</Div>
			</Tappable>
		</Card>
	)
}

const Home = (props) => (
	<Panel id={props.id}>
		<div className={'Header'}>
			« IT Band »
			<div className={'Subheader'}>
				Вездекод 2021
			</div>
		</div>

		<div className={'Members__Wrapper'}>
			<Header mode={'secondary'}>Наша команда</Header>
			<div className={'Members'}>
				{props.members.map(item => (
					<MemberCard {...item}/>
				))}
			</div>
		</div>
	</Panel>
);

export default Home;
