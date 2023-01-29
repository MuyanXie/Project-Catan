import { useState } from 'react';
// import React, { Component } from 'react';
import './App.css';
import MainHeader from './components/MainHeader';
import RegistrationForm from './components/RegistractionForm';

function App(){
  const [ModalisVisible, setModalisVisible] = useState(true);


  function showModalHandler(){
    setModalisVisible(true);
  }

  function hideModalHandler(){
    setModalisVisible(false);
  }

  return(
    <>

    <MainHeader onCreatePost={showModalHandler}/>
    <RegistrationForm />
    </>
  );
}

export default App;

// class App extends Component {

// 	constructor(props) {
// 		super(props);
// 		this.state = {players: []};
// 	}

  
//   async componentDidMount() {
//     fetch('http://localhost:8080/player/all')
//       .then(response => response.json())
//       .then(data =>  {
//         this.setState({players : data});
//     })
//   }
  
//   render() {

//     return (

//       <div>
//         <div class= "container">
//           <table id= "table">
//             <tr>
//               <th>Player ID</th>
//               <th>Player Name</th>
//             </tr>
//               {
//                 this.state.players.map((player, index) =>  
//                        <tr key={index}>
//                           <td>{player.id}</td>
//                           <td>{player.name}</td>
//                         </tr>
//                   )
//               }
//         </table>  
              
//         </div>

//       </div>
//     );
//   }
// }

// export default App;