import React from "react";
import './App.scss';


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keys: [
                {key: 'Q', type: 'default'},
                {key: '2', type: 'upper'},
                {key: 'W', type: 'default'},
                {key: '3', type: 'upper'},
                {key: 'E', type: 'default'},
                {key: 'R', type: 'default'},
                {key: '5', type: 'upper'},
                {key: 'T', type: 'default'},
                {key: '6', type: 'upper'},
                {key: 'Y', type: 'default'},
                {key: '7', type: 'upper'},
                {key: 'U', type: 'default'},
                {key: 'I', type: 'default'},
                {key: '9', type: 'upper'},
                {key: 'O', type: 'default'},
                {key: '0', type: 'upper'},
                {key: 'P', type: 'default'},
                {key: '[', type: 'default'},
                {key: '=', type: 'upper'},
                {key: ']', type: 'default'}
            ]
        }
    }

    componentDidMount() {
        window.onkeydown = (event) => this.handleKeyboard(event, true);
        window.onkeyup = (event) => this.handleKeyboard(event, false);
    }

    handleButton = (index, onDown) => {
        let keys = this.state.keys;
        if (onDown && !keys[index]['pressed']) {
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
