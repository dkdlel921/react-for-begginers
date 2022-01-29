import Button from "./Button";
import styles from "./App.module.css";
import {useState, useEffect} from "react";


function App() {
  const [loading, setloading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const onChange = (event) => setMoney(event.target.value);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then(json => {
        setCoins(json);
        setloading(false);
      });
  }, [])
  useEffect(() => {
    console.log(money);
  },[money]);

  return (
    <div>
      
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>    
       {loading ? <strong>Loading...</strong> : <select>
         {coins.map((coin) => (
          <option>
            {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
          </option>
          ))}
       </select>
       
       }
       <hr />
       <input onChange={onChange} type="text" placeholder="Your money" />
       <h1>You can buy {money / coins[0].quotes.USD.price} BTC</h1>
    </div>
  );
}

export default App;
