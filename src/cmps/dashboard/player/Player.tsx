import React, {FC} from 'react';
import {IPlayer} from "../../../App";


const Player: FC<{ player: IPlayer, currentPlayer: number, winner: string | number | null }> = ({player, currentPlayer, winner}) => {

    const {name, score} = player
    const smile = () => {
        if (winner && name === winner) return <img width="50" height="50" src="https://img.icons8.com/ios/50/smiling.png" alt="smiling"/>
        else if(winner && name !== winner) return <img width="50" height="50" src="https://img.icons8.com/ios/50/crying--v1.png" alt="crying--v1"/>

        return currentPlayer === name ?
            <img width="50" height="50" src="https://img.icons8.com/ios/50/happy--v1.png" alt="happy--v1"/>
            :
            <img width="50" height="50" src="https://img.icons8.com/ios/50/fat-emoji.png" alt="fat-emoji"/>
    }

    return (
        <div className={`player-wrapper`}>
            <div className={`player ${name === 1 ? 'red' : 'yellow'}`}>
                {smile()}
            </div>
            <div className='wins'>
                <p>{score}</p>
            </div>
        </div>
    );
}

export default Player;
