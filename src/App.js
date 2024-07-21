import './App.css';
import React, {Component} from 'react'
import { MyStylesheet } from './styles';
import { SendMessage } from './svg';
const socket = new WebSocket(`ws://localhost:8081/chat/people`);

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {message:'', messages:[], render:''}
    
  }

  componentDidMount() {
  

   
   
    socket.onmessage = (evt) => {
      console.log("NEW MESSAGE", evt.data);
      let msg = JSON.parse(evt.data);
      const messages = this.state.messages;
      if(msg.type === "chat") {
      messages.push(msg)
      this.setState({render:'render', messages})
      }
      // if (msg.type === "note") {
      //   const item = document.createElement("li");
      //   const text = document.createElement("i");
      //   text.textContent = msg.text;
      //   item.appendChild(text);
      //   document.querySelector("#messages").appendChild(item);
      // } else if (msg.type === "chat") {
      //   const item = document.createElement("li");
      //   item.innerHTML = `<b>${msg.name}:</b> ${msg.text}`;
      //   document.querySelector("#messages").appendChild(item);
      // }
    };
    console.log("I am a JS File")

    socket.onopen = (evt) => {
      console.log("WEB SOCKET OPENED!!!");
      // const data = { type: "join", name: username };
      // socket.send(JSON.stringify(data));
    };

    socket.onerror = (evt) => {
      console.log("SOMETHING WENT WRONG!");
      console.log(evt);
    };

    socket.onclose = (evt) => {
      console.log("WEB SOCKET HAS BEEN CLOSED!!!!");
    };

   

  }

  showMessages() {
    const messages = this.state.messages;
 
    const getmessages = [];
    messages.map(message=> {
      getmessages.push(this.showMessage(message))
    })

    return getmessages
  }
  

  showMessage(message) {
    const styles = MyStylesheet();
    return(<div style={{...styles.generalFlex}}>
      <div style={{...styles.flex1, ...styles.addMargin}}>
      <span style={{...styles.generalFont, ...styles.font30}}> {message.username}</span>
      </div>
      <div style={{...styles.flex6, ...styles.addMargin}}>
      <span style={{...styles.generalFont, ...styles.font30}}> {message.message} </span>
      </div>
    </div>)
  }

  sendMessage() {
    let message = this.state.message;
    let username = this.state.username;
    const payload = JSON.stringify({ type:'chat',username, message });
    socket.send(payload)
   

  }
  render () {
    const styles = MyStylesheet();
    const message = {username:'mazen', message:'chat app'}
  return (
    <div style={{...styles.generalContainer, ...styles.addMargin, ...styles.generalPadding}}>
      <div style={{...styles.generalContainer, ...styles.border5, ...styles.height1600}}>
            <div style={{...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter}}>
                <span style={{...styles.generalFont, ...styles.font36, ...styles.boldFont}}>ChatApp</span>
            </div>
            <div style={{...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter}}>
                <input type="text" style={{...styles.generalFont, ...styles.font30}} value={this.state.username} onChange={event=>{this.setState({username:event.target.value})}} />
            </div>

            {this.showMessages()}
      </div>
      <div style={{...styles.generalContainer, ...styles.addMargin, ...styles.generalPadding, ...styles.alignRight}}>
          <button style={{...styles.generalButton, ...styles.width120}} onClick={()=>{this.sendMessage()}}>{SendMessage()}</button>
      </div>
      <div style={{...styles.generalContainer,  ...styles.height200, ...styles.addMargin, ...styles.generalPadding}}>
          <textarea
          value={this.state.message}
          onChange={event=>{this.setState({message:event.target.value})}} 
          style={{...styles.generalField, ...styles.font30, ...styles.height120, ...styles.generalFont}}></textarea>
      </div>


    
    </div>
  );

   }
}

export default App;
