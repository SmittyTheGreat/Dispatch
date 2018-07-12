
//import TimeField from '../src';



var TimeEntryWidget = React.createClass({displayName:"TimeEntryWidget",

 getInitialState:function(){

    return{value:'12:34'}

 },
onTimeChange:function(value) {

    const newTime = value.replace(/-/g, ':');

    const nextTime = newTime.substr(0, 5);

 //   const timeSeconds = newTime.padEnd(8, this.state.timeSeconds.substr(5, 3));

   // const timeSecondsCustomColon = timeSeconds.replace(/:/g, '-');



    this.setState({time:nextTime});

  },

 isNumber:function(value) {

  const number = Number(value);

  return !isNaN(number) && String(value) === String(number);

},

formatTimeItem: function(value) {

  return `${value || ''}00`.substr(0, 2);

},

validateTimeAndCursor: function(showSeconds, value, defaultValue, colon = ':', cursorPosition = 0) {
  const [oldH, oldM, oldS] = defaultValue.split(colon);
  let newCursorPosition = Number(cursorPosition);
  let [newH, newM, newS] = value.split(colon);
  newH = this.formatTimeItem(newH);
  if (Number(newH[0]) > 2) {
    newH = oldH;
    newCursorPosition -= 1;
  } else if (Number(newH[0]) === 2) {
    if (Number(oldH[0]) === 2 && Number(newH[1]) > 3) {
      newH = `2${oldH[1]}`;
      newCursorPosition -= 2;
    } else if (Number(newH[1]) > 3) {
      newH = '23';
    }

  }
  newM = this.formatTimeItem(newM);

  if (Number(newM[0]) > 5) {
    newM = oldM;
    newCursorPosition -= 1;
  }
  if (showSeconds) {
    newS = this.formatTimeItem(newS);
    if (Number(newS[0]) > 5) {
      newS = oldS;
      newCursorPosition -= 1;
    }

  }
  const validatedValue = showSeconds ? `${newH}${colon}${newM}${colon}${newS}` : `${newH}${colon}${newM}`;
  return [validatedValue, newCursorPosition];

},

onInputChange:function(event, callback) {
    const oldValue = this.state.value;
    const inputEl = event.target;
    const inputValue = inputEl.value;
    const position = inputEl.selectionEnd;
    const isType = inputValue.length > oldValue.length;
    const addedCharacter = isType ? inputValue[position - 1] : null;
    const removedCharacter = isType ? null : oldValue[position];
    const colon = this._colon;
    let newValue = oldValue;
    let newPosition = position;
    if (addedCharacter !== null) {
      if (position > this._maxLength) {
        newPosition = this._maxLength;
      } else if ((position === 3 || position === 6) && addedCharacter === colon) {
        newValue = `${inputValue.substr(0, position - 1)}${colon}${inputValue.substr(position + 1)}`;
      } else if ((position === 3 || position === 6) && this.isNumber(addedCharacter)) {
        newValue = `${inputValue.substr(0, position - 1)}${colon}${addedCharacter}${inputValue.substr(position + 2)}`;
        newPosition = position + 1;
      } else if (this.isNumber(addedCharacter)) {
        // user typed a numbe
        newValue = inputValue.substr(0, position - 1) + addedCharacter + inputValue.substr(position + 1);
        if (position === 2 || position === 5) {
          newPosition = position + 1;
        }
      } else {
        // if user typed NOT a number, then keep old value & positio
        newPosition = position - 1;
      }
    } else if (removedCharacter !== null) {
      if ((position === 2 || position === 5) && removedCharacter === colon) {
        newValue = `${inputValue.substr(0, position - 1)}0${colon}${inputValue.substr(position)}`;
        newPosition = position - 1;
      } else {
        // user removed a number
        newValue = `${inputValue.substr(0, position)}0${inputValue.substr(position)}`;
      }
    }
    const [validatedTime, validatedCursorPosition] = this.validateTimeAndCursor(
      this._showSeconds,
      newValue,
      oldValue,
      this._colon,
      newPosition
    );
    this.setState({value: validatedTime}, () => {
      inputEl.selectionStart = validatedCursorPosition;
      inputEl.selectionEnd = validatedCursorPosition;
     // callback(validatedTime);
    });
    event.persist();
  },

  render() {

    // const {value} = this.state;

    // const {onChange, style, showSeconds, input, colon, ...props} = this.props; //eslint-disable-line no-unused-vars

    // const onChangeHandler = (event) => this.onInputChange(event, (v) => onChange(v));


return(
   React.createElement('div', {className:''},
                React.createElement('input',{className: 'orderPickupLocationInput',
                    type:'text', 
                    value:this.state.value,
                    onChange:this.onInputChange
                })
            )
   )
  }

});