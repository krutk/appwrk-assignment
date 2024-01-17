import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TransactionTable from './components/Table.js';
import AddTransaction from './components/addTransaction.js';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <h1>Office Transactions</h1>
        <ul>
          <li>
            <Link to='transactions'>Transactions</Link>

          </li>
          <li><Link to='add'>Add Transactions</Link></li>
        </ul>
      </div>
      <Routes>
        <Route path="/transactions" Component={TransactionTable} />
        <Route path="/add" Component={AddTransaction} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
