import axios from "axios";
import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"

class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      formValue: "",
      welshValue: ""
    };
  }

  handleChange = (event) => {
    this.setState({formValue: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/.netlify/functions/welshify", JSON.stringify({inputText: this.state.formValue}))
      .then(response => {
        console.log(JSON.stringify(response));
        this.setState({welshValue: response.data.welshText});
      });
  }

  render() {
    return (
      <>
      <form onSubmit={this.handleSubmit}>
        <label>
          Input Text:
          <input type="text" value={this.state.formValue} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Welshify!" />
      </form>
      {this.state.welshValue !== "" &&
        <span>Welshified: {this.state.welshValue}</span>}
      </>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <LambdaDemo />
        </header>
      </div>
    )
  }
}

export default App
