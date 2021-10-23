import React from 'react';
import bridge from "@vkontakte/vk-bridge";

import { Panel, PanelHeader, Div, Button, Group, Placeholder, Snackbar } from '@vkontakte/vkui';
import { Icon24Play, Icon28LightbulbStarOutline, Icon28LightbulbOutline, Icon24Stop } from '@vkontakte/icons';

import './Home.css';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			buttons: [
				false, false, false, false,
				false, false, false, false,
			],
			isRunning: false,
			currentIndex: 0,
			snackbar: null,
			timer: null,
		}
	}

	flashlightTick = () => {
		let index = this.state.currentIndex;
		if (index === this.state.buttons.length) {
			index = 0;
		}

		if (this.state.buttons[index]) {
			bridge.send("VKWebAppFlashSetLevel", {"level": 1});
		} else {
			bridge.send("VKWebAppFlashSetLevel", {"level": 0});
		}

		index += 1;
		this.setState({currentIndex: index});
	}

	start = () => {
		if (!bridge.supports('VKWebAppFlashSetLevel')) {
			this.setState({snackbar:
					<Snackbar onClose={() => this.setState({snackbar: null})}>
						Упс! Ваше устройство не поддерживает управление фонариком.
					</Snackbar>
			});
			return;
		}

		let timer = setInterval(this.flashlightTick, 1000);
		this.setState({isRunning: true, timer: timer}, this.flashlightTick);
	}

	stop = () => {
		if (this.state.timer) {
			clearInterval(this.state.timer);
		}
		bridge.send("VKWebAppFlashSetLevel", {"level": 0});
		this.setState({isRunning: false, timer: null, currentIndex: 0});
	}

	onButtonChange = (i) => {
		if (this.state.isRunning) {
			this.setState({snackbar:
					<Snackbar onClose={() => this.setState({snackbar: null})}>
						Остановите проигрывание, прежде чем изменять композицию.
					</Snackbar>
			});
			return;
		}
		let buttons = this.state.buttons;
		buttons[i] = !buttons[i];

		this.setState({buttons: buttons});
	}

	render() {
		return (
			<Panel id={this.props.id}>
				<PanelHeader>Flashlight DJ</PanelHeader>
				<Placeholder icon={<Icon28LightbulbStarOutline width={96} height={96}/>} header={'Управление фонариком'}>
					Почувствуйте себя светооператором!
				</Placeholder>
				<Group className={'Content'}>
					<Div>Одна кнопка - одна секунда свечения или простоя</Div>
					<Div className={'Buttons'}>
						{
							this.state.buttons.map((isButtonEnabled, i) => {
								let isIndicatorEnabled = this.state.isRunning && (this.state.currentIndex - 1 === i);
								return (
									<div className={'CustomButton'}>
										<Button onClick={() => this.onButtonChange(i)} mode={isButtonEnabled ? 'primary' : 'outline'}>
											{isButtonEnabled ?
												<Icon28LightbulbStarOutline width={20} height={20}/> :
												<Icon28LightbulbOutline width={20} height={20}/>
											}
										</Button>
										<div className={'Indicator ' + `Indicator-${isIndicatorEnabled ? "enabled" : 'disabled'}`}/>
									</div>
								);
							})
						}
					</Div>
					<Div>
						{
							!this.state.isRunning ?
								<Button stretched size={'l'} before={<Icon24Play/>} onClick={this.start}>
									Запустить
								</Button>
								:
								<Button stretched size={'l'} before={<Icon24Stop/>} mode={'destructive'} onClick={this.stop}>
									Остановить
								</Button>
						}

					</Div>
				</Group>

				{this.state.snackbar}
			</Panel>
		)
	}
}