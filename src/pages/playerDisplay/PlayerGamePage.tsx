import PlayerCard from '../../components/player/playerCard';
import AnswerOptions from '../../components/player/AnswerOptions';
import { useState } from 'react';
import Loading from '../../components/player/Loading';
import AnswerFeedback from '../../components/player/AnswerFeedback';

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
            { status === "correct" && <AnswerFeedback wasCorrect={true} /> }
            { status === "wrong" && <AnswerFeedback wasCorrect={false} /> }
            <PlayerCard name='יעל' points='777' />
        </>
    )
}

export default PlayerGamePage;