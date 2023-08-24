import React from 'react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useState } from "react";
import './Leaderboard.css'
import LeaderboardRow from './LeaderboardRow/LeaderboardRow';
// Server returns an array of objects, sorted by entry count.
// Object consists of Rank, Name and Entry-count.

async function topFive() {
    const arrayOfRows = [];
    const response = await fetch('http://localhost:3001/leaderboard', {
        method: "get",
        headers: { 'Content-Type': 'application/json' },
    });
    const users = await response.json();
    return users;   
}


const LeaderBoard = ({ isModalOpen, changeOpen, populateTopFive, topFive }) => {
    
    let arrayOfData = [];
    const arrayOfRows = [];

    const getTopFive = () => {
        const usersArray = [];
        fetch('http://localhost:3001/leaderboard', {
            method: "get",
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    populateTopFive(data);
                }
            });
    }

    useEffect(() => {
        getTopFive();
    }, [isModalOpen]);

        for (let i = 0; i < 5; i++) {
            arrayOfRows.push(<LeaderboardRow Rank={i + 1}
                Name={topFive[i].name}
                Entries={topFive[i].entries}
                key={i} />)
        }

    if (isModalOpen === false) return null;
    return (
        <div>
            {
                createPortal(
                    <div>
                        <div id='Overlay'></div>
                        <div id='Leaderboard' className='relative shadow-2'>
                            <div id="exitModule" className='absolute'
                                onClick={changeOpen}>Exit</div>
                            <div id='LeaderboardHeading' className='f3 b mh3 mt3 mb2'>Leaderboard</div>
                            <div id='LeaderboardData' className='flex flex-column justify-around items-center mb4'>
                                <LeaderboardRow Rank={`Rank`} Name={`Name`} Entries={`Entries`} />
                                {arrayOfRows}
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