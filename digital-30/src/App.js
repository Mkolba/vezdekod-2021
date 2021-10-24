import React from "react";
import './App.scss';


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keys: [
                {key: 'Q', type: 'default', note: 'C3'},
                {key: '2', type: 'upper', note: 'Db3'},
                {key: 'W', type: 'default', note: 'D3'},
                {key: '3', type: 'upper', note: 'Eb3'},
                {key: 'E', type: 'default', note: 'E3'},
                {key: 'R', type: 'default', note: 'F3'},
                {key: '5', type: 'upper', note: 'Gb3'},
                {key: 'T', type: 'default', note: 'G3'},
                {key: '6', type: 'upper', note: 'Ab3'},
                {key: 'Y', type: 'default', note: 'A3'},
                {key: '7', type: 'upper', note: 'Bb3'},
                {key: 'U', type: 'default', note: 'B3'},
                {key: 'I', type: 'default', note: 'C4'},
                {key: '9', type: 'upper', note: 'Db4'},
                {key: 'O', type: 'default', note: 'D4'},
                {key: '0', type: 'upper', note: 'Eb4'},
                {key: 'P', type: 'default', note: 'E4'},
                {key: '[', type: 'default', note: 'F4'},
                {key: '=', type: 'upper', note: 'Gb4'},
                {key: ']', type: 'default', note: 'G4'}
            ]
        }
    }

    componentDidMount() {
        window.onkeydown = (event) => this.handleKeyboard(event, true);
        window.onkeyup = (event) => this.handleKeyboard(event, false);
        this.state.keys.forEach(item => {
            new Audio(`https://host.adawhite.ru/static/notes/Piano.ff.${item.note}.mp3`);
        })
    }

    handleButton = (index, onDown) => {
        let keys = this.state.keys;
        if (onDown && !keys[index]['pressed']) {
            let audio = new Audio(`https://host.adawhite.ru/digital-3/notes/Piano.ff.${keys[index]['note']}.mp3`);

            audio.addEventListener('loadeddata', function() {
                audio.play();
            }, false);

            keys[index]['pressed'] = true;
        } else if (!onDown && keys[index]['pressed']) {
            keys[index]['pressed'] = false;
        }
        this.setState({keys: keys});
    }

    handleKeyboard = (event, onDown) => {
        const keyCodes = [81, 50, 87, 51, 69, 82, 53, 84, 54, 89, 55, 85, 73, 57, 79, 48, 80, 219, 187, 221];
        if (!event.repeat && keyCodes.includes(event.keyCode)) {
            this.handleButton(keyCodes.indexOf(event.keyCode), onDown);
        }
    }


    render() {
        return (
            <div className={'App'}>
                <div className={'Piano'}>
                    {this.state.keys.map((item, i) => (
                        <div className={`Key Key-${item.type}` + (item.pressed ? ' Key-pressed  ' : '')} key={item.key}
                         onMouseLeave={() => this.handleButton(i, false)}
                         onMouseDown={() => this.handleButton(i, true)}
                         onMouseUp={() => this.handleButton(i, false)}
                        >
                            <span className={'Letter'}>{item.key}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
