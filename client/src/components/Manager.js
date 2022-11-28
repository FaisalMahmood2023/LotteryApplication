import React, { useState, useEffect } from "react";

const Manager = ({ state, account }) => {
  const [cBalance, setCBalance] = useState("0 ETH");
  const [lWinner, setlWinner] = useState("No Winner Yet");

  const [reload, setReload] = useState(false);

  const reloadEffect = () => {
    setReload(!reload);
  };

  const getBalance = async () => {
    const { contract, web3 } = state;
    try {
      const balance = await contract.methods
        .getBalance()
        .call({ from: account });
      setCBalance(balance);
      setCBalance(web3.utils.fromWei(balance, "ether"));
      console.log(balance);
    } catch (error) {
      setCBalance("You aren't the Manager");
    }
    reloadEffect(reload);
  };

  const winner = async () => {
    const { contract } = state;
    try {
      await contract.methods.pickwinner().send({ from: account });
      const winner = await contract.methods.winner().call();
      setlWinner(winner);
    } catch (error) {
      if (error.message.includes("You are not the Manager")) {
        setlWinner("You are not the Manager");
      } else if (error.message.includes("Players are less than 2")) {
        setlWinner("Players are less than 3");
      } else {
        setlWinner("No Winner");
      }
    }
  };

  return (
    <>
      <div className="container text-center list-group">
        <div className="card text-center">
          <div className="card-header">Lottery System</div>
          <div className="row">
            <div className="center my-2">
              <li className="list-group-item">
                <b>Connected Account : </b> {account}
              </li>
            </div>

            <div className="center my-2">
              <li className="list-group-item">
                <b>Winner : </b> {lWinner}
              </li>
            </div>

            <div className="center my-2">
              <li className="list-group-item">
                <b>Contract Balance : </b> {cBalance}
              </li>
            </div>
          </div>
          <div className="card-body">
            <button className="btn btn-primary" onClick={winner}>
              Click for Winner
            </button>
            &nbsp;
            <button className="btn btn-success" onClick={getBalance}>
              Click for Balance
            </button>
          </div>

          <div className="card-footer text-muted">
            Decentralized Application Lottery System
          </div>
        </div>
      </div>
    </>
  );
};
export default Manager;
