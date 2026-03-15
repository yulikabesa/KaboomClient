import PlayerCard from '../../components/player/playerCard';
import AnswerOptions from '../../components/player/AnswerOptions';
import { useState } from 'react';
import Loading from '../../components/player/Loading';

const PlayerGamePage = () => {
    const [status, setStatus] = useState("answering");
    const handleAnswerClick = (answerIndex: number) => {
        setStatus("loading");
        // todo send through socket the answer
    }
    return (
        <>
            { status === "answering" && <AnswerOptions answersCount={4} onAnswerClick={handleAnswerClick} /> } 
            {/* to change answersCount number to receive from server later */}
            { status === "loading" && <Loading /> }
            { status === "correct" && <Loading /> }
            { status === "wrong" && <Loading /> }
            <PlayerCard name='יעל' points='777' />
        </>
    )
}

export default PlayerGamePage;