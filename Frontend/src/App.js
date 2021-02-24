import './App.css';
import UseToken from './hooks/useToken';
import Login from './pages/login/login';


function App() {

  const {token,settoken}= UseToken();

  if(!token){
    return <Login settoken={settoken}/>
  }

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
