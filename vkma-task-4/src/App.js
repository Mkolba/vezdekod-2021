import React from 'react';
import { View, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';

export default class App extends React.Component {
	render() {
		return (
			<AdaptivityProvider>
				<AppRoot>
					<View activePanel='home'>
						<Home id='home'/>
					</View>
				</AppRoot>
			</AdaptivityProvider>
		)
	}
}
