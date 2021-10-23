import React from 'react';
import { View, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';

const App = () => {

	const members = [
		{'name': 'Горошкин Егор', 'link': 'https://vk.com/idmkolba', 'skills': ['Разработчик', 'React JS', 'Python'], 'avatar': 'https://sun3-12.userapi.com/s/v1/if1/24DIjRegdo8jPKsv49HR0blwK6OHKyjzoCYjVeXdTB0i4la8LCXK1h-po54AIcrzytCTeOFz.jpg?size=200x200&quality=96&crop=49,49,389,389&ava=1'},
		{'name': 'Владислав Мильхин', 'link': 'https://vk.com/id284525028', 'skills': ['3D-моделлер', 'Tinkedcad', '3Ds Max'], 'avatar': 'https://sun3-10.userapi.com/s/v1/if1/gtjwqm8cND57apOn-_Nuuq4o_29MINJPuhZtcH461D0J-AgS-NaFS_L_lY55SkCAryyK-62E.jpg?size=200x200&quality=96&crop=0,0,200,200&ava=1'},
		{'name': 'Зверев Илья', 'link': 'https://vk.com/id367876191', 'skills': ['Разработчик', 'Android', 'Java'], 'avatar': 'https://sun3-8.userapi.com/s/v1/ig1/3NjG4rKm5eFbHQluGdF8ErKUUEjiHQBLxu5v0pPNNXoV1NSb3UyhivJc9WL66CDU4g0tSwuA.jpg?size=200x200&quality=96&crop=81,77,287,287&ava=1'},
		{'name': 'Уфимская Василиса', 'link': 'https://vk.com/id328236146', 'skills': ['Дизайнер', '3Ds Max', 'Figma'], 'avatar': 'https://sun3-16.userapi.com/s/v1/ig2/3ejgJfDItH0UbIWKQoc8pQVBtlT7VRL6zqPipeJdfOUFfngKHkmnPp1Kar2O14nN2El0QPjvnXMarm6HASL6Gl--.jpg?size=200x200&quality=96&crop=81,81,648,648&ava=1'}
	]

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel='home'>
					<Home id='home' members={members}/>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
