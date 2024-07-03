import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useState } from "react";
import './Leaderboard.css'
import LeaderboardRow from './LeaderboardRow/LeaderboardRow';
import homeContext from '../../utilities/homeContext';

const LeaderBoard = () => {

    const isModalOpen = useContext(homeContext).isModalOpen;
    const changeOpen = useContext(homeContext).changeOpen;

    const [bestFive, setBestFive] = useState([]);

    const getBestFive = () => {
        fetch('https://smartbrain-backend-jbvx.onrender.com/leaderboard', {
            method: "get",
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {
                if (data) setBestFive(data);
            });
    }

    useEffect(getBestFive, [isModalOpen]);

    if (!isModalOpen) return null;
    return (
        <div>
            {
                createPortal(
                    <div>
                        <div id='Overlay'></div>
                        <div id='Leaderboard' className='relative shadow-2 flex flex-column pt2'>
                            <div id="exitModule" className='absolute'
                                onClick={changeOpen}>X</div>
                            <div id='LeaderboardHeading' className='f4 f3-ns b mh3 mt3 mb2 center'>Leaderboard</div>
                            <div id='LeaderboardData' className='flex flex-column justify-around items-center mb4'>
                                <LeaderboardRow Rank={`Rank`} Name={`Name`} Entries={`Entries`} />
                                {
                                    bestFive.map((user, i) => {
                                      return <LeaderboardRow Rank={i + 1}
                                                Name={bestFive[i].name}
                                                Entries={bestFive[i].entries}
                                                key={i} />
                                })}
                            </div>
                        </div>
                    </div>,
                    document.body
                )
            }
        </div>
    );
    
    }

export default LeaderBoard;