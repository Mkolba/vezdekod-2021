import React from "react";
import './App.scss';

export default class App extends React.Component {
    render() {
        const keys = [
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
        return (
            <div className={'App'}>
                <div className={'Piano'}>
                    {keys.map(item => (
                        <div className={'Key Key-' + item.type} key={item.key}>
                            <span className={'Letter'}>{item.key}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
