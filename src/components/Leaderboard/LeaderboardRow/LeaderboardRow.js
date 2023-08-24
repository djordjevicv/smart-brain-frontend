import React from "react";
import './LeaderboardRow.css';

class LeaderboardRow extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const { Rank, Name, Entries } = this.props;
        if (Rank === 'Rank') {
            return (
                <div id="LeaderboardRow" className="flex justify-around shadow-2 f4 w-80 pa3 mv2 b">
                    <div id="rank" className="center">{`${Rank}`}</div>
                    <div id="name" className="center">{`${Name}`}</div>
                    <div id="entries" className="center">{`${Entries}`}</div>
                </div>
            );
        }
        return (
            <div id="LeaderboardRow" className="flex justify-around shadow-2 f5 w-80 pa3 mv2 b">
                <div id="rank" className="center">{`${Rank}`}</div>
                <div id="name" className="center">{`${Name}`}</div>
                <div id="entries" className="center">{`${Entries}`}</div>
            </div>
        );
    }
}

export default LeaderboardRow;

