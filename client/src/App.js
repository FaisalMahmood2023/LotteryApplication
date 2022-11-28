import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import Lottery from "./contracts/Lottery.json";
import "./App.css";
import Manager from "./components/Manager.js";
import Player from "./components/Player.js";

import { Route, Link } from "react-router-dom";
import Home from "./components/Home.js";

const App = () => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  const [address, setAddress] = useState("Not Avaialble");
  const [account, setAccount] = useState("Not Account Conected");

  const [transfer, setTransfer] = useState("Please Pay 1 Ether Only");

  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => setAccount(accounts[0]));
  };
  const [reload, setReload] = useState(false);

  const reloadEffect = () => {
    setReload(!reload);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();

        const deployedNetwork = Lottery.networks[networkId];
        console.log("Contract Address:", deployedNetwork.address);
        const instance = new web3.eth.Contract(
          Lottery.abi,
          deployedNetwork && deployedNetwork.address
        );
        setAddress(deployedNetwork.address);
        setState({ web3, contract: instance });
      } catch (error) {
        alert("Falied to load web3 or contract.");
        console.log(error);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      const { web3 } = state;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      setAccountListener(web3.givenProvider);
      console.log(accounts);
    };
    state.web3 && getAccount();
  }, [state, state.web3]);

  const transferAmount = async () => {
    const { contract, web3 } = state;
    try {
      await contract.methods.transfer().send({
        from: account,
        value: web3.utils.toWei("1", "ether"),
      });
      setTransfer("Transcation Successful");
    } catch (error) {
      if (
        error.message.includes(
          "You cannot send Money because Yor are the MAnager"
        )
      ) {
        setTransfer("You are the Manager");
        // alert("You are the Manager");
      } else {
        setTransfer("Transcation Failed");
        // alert("Transcation Failed");
      }
    }
    reloadEffect();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item ">
                <Link
                  to="/"
                  className="nav-link navtext active-link"
                  aria-current="page"
                >
                  <b>
                    <b>
                      <b>Lottery System</b>
                    </b>
                  </b>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/manager"
                  className="nav-link navtext active-link"
                  aria-current="page"
                >
                  <b>
                    <b>
                      <b>Manager</b>
                    </b>
                  </b>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/players" className="nav-link navtext active-link">
                  <b>
                    <b>
                      <b>Player</b>
                    </b>
                  </b>
                </Link>
              </li>
            </ul>
            <button type="button" className="btn btn-success mx-5">
              {account}
            </button>
          </div>
        </div>
      </nav>

      <Route exact path="/">
        <Home transferAmount={transferAmount} />
      </Route>
      <Route exact path="/manager">
        <Manager state={state} account={account} />
      </Route>
      <Route exact path="/players">
        <Player
          state={state}
          address={address}
          transferAmount={transferAmount}
        />
      </Route>
    </>
  );
};
export default App;
