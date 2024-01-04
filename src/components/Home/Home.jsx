import Rank from "../Rank/Rank"
import LeaderBoard from "../Leaderboard/Leaderboard"
import PictureScanner from "../PictureScanner/PictureScanner"

export function Home({ user, changeOpen, isModalOpen, updateUserCount }) {
    return (
        <div>
            <Rank
                name={user.name}
                entries={user.entries}
            />
            <LeaderBoard changeOpen={changeOpen}
                isModalOpen={isModalOpen}
            />
            <PictureScanner updateUserCount={updateUserCount}
                user={user}
            />
        </div>
    );
}