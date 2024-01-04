import Rank from "../Rank/Rank"
import LeaderBoard from "../Leaderboard/Leaderboard"
import PictureScanner from "../PictureScanner/PictureScanner"

export function Home() {
    return (
        <div>
            <Rank />
            <LeaderBoard />
            <PictureScanner />
        </div>
    );
}