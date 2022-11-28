import React, { useState, useEffect } from "react";

const Players = ({ state, address, transferAmount }) => {
  const [registeredPlayers, setRegisteredPlayers] = useState([]);
  const [reload, setReload] = useState(false);

  const reloadEffect = () => {
    setReload(!reload);
  };

  useEffect(() => {
    const getPlayers = async () => {
      const { contract } = state;
      const player = await contract.methods.allPlayers().call();
      //   console.log(player);
      const registeredPlayers = await Promise.all(
        player.map((player) => {
          return player;
        })
      );
      setRegisteredPlayers(registeredPlayers);
      reloadEffect();
    };
    state.contract && getPlayers();
  }, [state, state.contract, reload]);
  return (
    <>
      <div className="container text-center list-group">
        <div className="card text-center">
          <div className="card-header">Lottery System</div>
          <div className="row">
            <div className="center my-2">
              <li className="list-group-item">
                <b>Contract Address : </b> {address}
              </li>
            </div>

            <div className="center my-2">
              <li className="list-group-item">
                <b>Note : </b> Please Transfer 01 Ether to the above Contract
                Address for a part of the Lottery System.
              </li>
            </div>
          </div>
          <div className="card-body">
            <button className="btn btn-success" onClick={transferAmount}>
              Transfer
            </button>
          </div>

          <div className="center my-1">
            <li className="list-group-item">
              <b>Registerd Players : </b>
              {registeredPlayers.length}
              {registeredPlayers.length !== 0 &&
                registeredPlayers.map((name) => <p key={name}>{name}</p>)}
            </li>
          </div>

          <div className="card-footer text-muted">
            Decentralized Application Lottery System
          </div>
        </div>
      </div>
    </>
  );
};
export default Players;
