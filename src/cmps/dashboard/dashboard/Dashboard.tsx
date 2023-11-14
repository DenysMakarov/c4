import React, {FC} from 'react';
import "../index.scss";
import {IPlayer} from "../../../App";
import Player from "../player/Player";

interface IDashboardPros {
    winner: string | number | null,
    currentPlayer: number,
    players: IPlayer[]
}

const Dashboard: FC<IDashboardPros> = ({winner, currentPlayer, players}) => {

    const playerName = (player: number | string | null) => player === 1 ? "Red" : "Yellow";

    return (
        <div className='dashboard'>
            <Player player={players[0]} currentPlayer={currentPlayer} winner={winner}/>
            <div className='info'>
                <p>{winner && winner !=='Draw' ? `${playerName(winner)} win` : (winner && winner ==='Draw') ? winner : `${playerName(currentPlayer)}'s turn`}   </p>
            </div>
            <Player player={players[1]} currentPlayer={currentPlayer} winner={winner}/>
        </div>
    );
}

export default Dashboard;
