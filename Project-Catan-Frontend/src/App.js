import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterForm from './components/RegistractionForm';
import HomePage from './components/HomePage';
import PlayerDisplay from './components/PlayerDisplay';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/players" element={<PlayerDisplay />}></Route>
      </Routes>
    </Router>
  )
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