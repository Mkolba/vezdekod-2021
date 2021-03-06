import React from 'react';
import bridge from "@vkontakte/vk-bridge";
import { Panel, Snackbar, Header } from '@vkontakte/vkui';

import './Maze.css';


class Maze extends React.Component {
	render() {
		return (
			<table className={'Maze'} ref={this.props.ref_}>
				{this.props.maze.map(row => (
					<tr>
						{row.map(item => (
							item < 2 ?
								<td className={'item ' + (item ? 'item-barrier' : 'item-empty')}/>
								:
								<td className={'item item-endpoint'}/>
						))}
					</tr>
				))}
			</table>
		)
	}
}


export default class MazePanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ballRef: React.createRef(),
			mazeRef: React.createRef(),
		}
	}

	handleGyroscope = (x, y) => {
		x = Math.floor(Math.round(x * 100) / 6);
		y = Math.floor(Math.round(y * 100) / 6);
		this.tick(x, y);
	}

	isCollide = (x, y, a, b) => {
		return !(
			((y + a.height) < (b.y)) ||
			(y > (b.y + b.height)) ||
			((x + a.width) < b.x) ||
			(x > (b.x + b.width))
		);
	}

	// Я обязательно высплюсь
	checkCollisions = (newX, newY, rect, limit) => {

		if (!this.isCollide(newX, newY, rect, limit)) {
			return {'x': newX, 'y': newY};
		} else {
			let x = newX - rect.x;
			for (x; x >= 1; --x) {
				if (!this.isCollide(rect.x + x, newY, rect, limit)) {
					newX = rect.x + x;
					break;
				}
			}

			let y = newY - rect.y;
			for (y; y >= 1; --y) {
				if (!this.isCollide(newX, rect.y + y, rect, limit)) {
					newY = rect.y + y;
					break;
				}
			}

			if (!(rect.y + rect.height < limit.y || rect.y > limit.y + limit.height) && ((newX > limit.x - limit.width))) {
				newX = rect.x;
			}
			if (!(rect.x + rect.width < limit.x || rect.x > limit.x + limit.width) && (newY + rect.height > limit.y)) {
				newY = rect.y;
			}
			return {'x': newX, 'y': newY};
		}

	}

	tick = (x, y) => {

		const ball = this.state.ballRef.current;
		const maze = this.state.mazeRef.current;
		if (ball && maze) {
			let limit = maze.getBoundingClientRect();
			let rect = ball.getBoundingClientRect();

			let newX = rect.x + x;
			let newY = rect.y - y;

			let barriers = document.getElementsByClassName('item-barrier');
			for (let i=0; i < barriers.length; i++) {
				let item = barriers[i].getBoundingClientRect();
				let values = this.checkCollisions(newX, newY, rect, item);
				newX = values['x'];
				newY = values['y'];
			}

			let endpoint = document.getElementsByClassName('item-endpoint')[0];
			if (this.isCollide(newX, newY, rect, endpoint.getBoundingClientRect()) && !this.state.snackbar) {
				this.setState({snackbar:
					<Snackbar onClose={() => this.setState({snackbar: null})}>
						Вы победили!
					</Snackbar>
				})
			}

			if (newY < limit.y + 2) {
				newY = limit.y + 2;
			} else if (newY > limit.y + limit.height - rect.height - 2) {
				newY = limit.y + limit.height - rect.height - 2;
			}

			if (newX < limit.x + 2) {
				newX = limit.x + 2;
			} else if (newX > limit.x + limit.width - rect.width - 2) {
				newX = limit.x + limit.width - rect.width - 2;
			}

			ball.style.left = (newX) + "px";
			ball.style.top = (newY) + "px";
		}
	}

	componentDidMount() {
		bridge.send('VKWebAppDeviceMotionStart', {'refresh_rate': 20});
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppDeviceMotionChanged') {
				this.handleGyroscope(data['gamma'], data['beta']);
			}
		});
	}

	render() {
		const maze = [
			[0, 1, 0, 0, 0, 0, 1],
			[0, 1, 0, 1, 0, 1, 1],
			[0, 1, 0, 1, 0, 0, 1],
			[0, 0, 0, 1, 1, 0, 1],
			[1, 1, 0, 0, 1, 0, 0],
			[2, 1, 1, 1, 1, 0, 1],
			[0, 0, 0, 0, 0, 0, 1],
		]

		return (
			<Panel id={this.props.id}>
				<div className={'ball'} ref={this.state.ballRef}/>
				<div className={'Wrapper'}>
					<Header>Лабиринт «Бессоная ночь»</Header>
					<Maze maze={maze} ref_={this.state.mazeRef}/>
					{!bridge.supports("VKWebAppDeviceMotionStart") &&
						<div style={{color: 'red'}}>Гироскоп не поддерживается!</div>
					}
				</div>

				{this.state.snackbar}
			</Panel>
		)
	}
}