//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract Lottery {
    address manager;
    address payable[] public players;
    address payable public winner;

    constructor() {
        manager = msg.sender;
    }

    modifier onlyOwner() {
        require(manager == msg.sender, "You are not the Manager");
        _;
    }

    receive() external payable {}

    function transfer() external payable {
        require(
            manager != msg.sender,
            "You cannot send Money because Yor are the MAnager"
        );
        require(msg.value == 1 ether, "Please Pay 1 Ether only");
        players.push(payable(msg.sender));
    }

    function getBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    function random() internal view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        players.length
                    )
                )
            );
    }

    function pickwinner() public onlyOwner {
        require(players.length >= 3, "Players are less than 3");
        uint r = random();
        uint index = r % players.length;
        winner = players[index];
        uint balance = getBalance();
        uint commision = 1 ether;
        uint playerWinner = balance - commision;
        winner.transfer(playerWinner);
        payable(manager).transfer(commision);
        players = new address payable[](0);
    }

    function allPlayers() public view returns (address payable[] memory) {
        return players;
    }
}
