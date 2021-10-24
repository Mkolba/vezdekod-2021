import React from "react";
import './App.scss';
import './PianoRoll.scss';


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
                {key: ']', type: 'default', note: 'G4'},
                {key: '◯', type: 'upper', note: 'Ab4'},
                {key: '◯', type: 'default', note: 'A4'},
                {key: '◯', type: 'upper', note: 'Bb4'},
                {key: '◯', type: 'default', note: 'B4'}
            ],
            notes: [],
            scroll: 0,
            timer: null,
        };
    }

    componentDidMount() {
        window.onkeydown = (event) => this.handleKeyboard(event, true);
        window.onkeyup = (event) => this.handleKeyboard(event, false);
        this.state.keys.forEach(item => {
            new Audio(`https://host.adawhite.ru/static/notes/Piano.ff.${item.note}.mp3`);
        })
    }

    handleButton = (index, onDown) => {
        if (index > -1) {
            let keys = this.state.keys;
            if (onDown && !keys[index]['pressed']) {
                let audio = new Audio(`https://host.adawhite.ru/static/notes/Piano.ff.${keys[index]['note']}.mp3`);

                audio.addEventListener('loadeddata', function() {
                    audio.play();
                }, false);

                keys[index]['pressed'] = true;
            } else if (!onDown && keys[index]['pressed']) {
                keys[index]['pressed'] = false;
            }
            this.setState({keys: keys});
        }
    }

    handleKeyboard = (event, onDown) => {
        const keyCodes = [81, 50, 87, 51, 69, 82, 53, 84, 54, 89, 55, 85, 73, 57, 79, 48, 80, 219, 187, 221];
        if (!event.repeat && keyCodes.includes(event.keyCode)) {
            this.handleButton(keyCodes.indexOf(event.keyCode), onDown);
        }
    }

    prepareNote = (note) => {
        let replaces = [['C#', 'Db'], ["D#", "Eb"], ["F#", "Gb"], ['G#', 'Ab'], ['A#', 'Bb']];
        replaces.forEach(([pattern, newString]) => {
            note = note.replace(pattern, newString);
        })
        return note;
    }

    handleXML = (file) => {
        let fileReader = new FileReader();
        fileReader.onload = (event) => {
            const notes = this.state.keys.map(item => item.note);
            const parser = new DOMParser();
            let text = event.target.result;

            let xml = parser.parseFromString(text, "text/xml");
            let items = xml.getElementsByTagName('note');

            let latency = 20;
            let roll = [];
            for (let item of items) {
                let duration = item.getElementsByTagName('duration')[0].innerHTML;
                let octave = item.getElementsByTagName('octave')[0].innerHTML;
                let step = item.getElementsByTagName('step')[0].innerHTML;
                let alt = item.getElementsByTagName('alter').length;

                let note = this.prepareNote(`${step}${alt ? "#" : ""}${octave}`);
                note = JSON.parse(JSON.stringify(this.state.keys[notes.indexOf(note)]));

                note.height = duration / 8;
                note.bottom = latency;
                latency += note.height + 6;
                roll.push(note);
            }

            this.setState({notes: roll});
            let timer = setInterval(() => {
                if (this.state.scroll < latency) {
                    this.setState({scroll: this.state.scroll + 1})
                } else if (this.state.timer) {
                    clearInterval(this.state.timer);
                    this.setState({notes: [], scroll: 0, timer: null})
                }
            }, 28);
            this.setState({timer: timer});

        }
        fileReader.readAsText(file);
    }

    uploadXML = () => {
        let input = document.createElement('input');
        input.onchange = (event) => {
            this.handleXML(event.target.files[0]);
        };
        input.accept = 'text/xml';
        input.type = 'file';
        input.click();
    }

    stop = () => {
        if (this.state.timer) {
            clearTimeout(this.state.timer);
            this.setState({timer: null, notes: [], scroll: 0});
        }
    }

    render() {
        return (
            <div className={'App'}>
                <div className={'PianoRoll__Wrapper'}>
                    <div className={'PianoRoll'} style={{top: this.state.scroll}}>
                        {
                            this.state.notes.map((item, i) => (
                                <div className={'Note ' + item.note + ' Note-' + item.type} key={i} style={{height: item.height, bottom: item.bottom}}/>
                            ))
                        }
                    </div>
                </div>

                <div className={'Piano'}>
                    {this.state.keys.map((item, i) => (
                        <div className={`Key Key-${item.type}` + (item.pressed ? ' Key-pressed  ' : '')} key={i}
                         onMouseLeave={() => this.handleButton(i, false)}
                         onMouseDown={() => this.handleButton(i, true)}
                         onMouseUp={() => this.handleButton(i, false)}
                        >
                            <span className={'Letter'}>{item.key}</span>
                        </div>
                    ))}
                </div>

                <div className={'Buttons'}>
                    <div className={'Button'} onClick={this.uploadXML}>
                        Загрузить MusicXML
                    </div>
                    <div className={'Button Button-destructive'} onClick={this.state.timer ? this.stop : () => {}}>
                        Стоп
                    </div>
                </div>

            </div>
        )
    }
}
