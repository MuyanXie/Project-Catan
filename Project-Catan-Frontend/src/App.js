
import React, { Component } from 'react';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {players: []};
	}

  
  async componentDidMount() {
    fetch('http://localhost:8080/player/all')
      .then(response => response.json())
      .then(data =>  {
        this.setState({players : data});
    })
  }
  
  render() {

    return (

      <div>
        <div class= "container">
          <table id= "table">
            <tr>
              <th>Student</th>
              <th>Subject</th>
            </tr>
              {
                this.state.players.map((player, index) =>  
                       <tr key={index}>
                          <td>{player.id}</td>
                          <td>{player.name}</td>
                        </tr>
                  )
              }
        </table>  
              
        </div>

      </div>
    );
  }
}

export default App;