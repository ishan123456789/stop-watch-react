import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';

interface ProgressMessageProp {
    currentTime: number;
    totalTime: number;
    finished: boolean;
}
export const ProgressMessage = ({ currentTime, totalTime, finished }: ProgressMessageProp) => {
    const [currentState, setCurrentState] = useState('');
    const [currentMessage, setCurrentMessage] = useState('');

    useEffect(() => {
        if (totalTime && currentTime && currentTime < totalTime / 2) {
            if (currentTime < 20) {
                setCurrentState('alert');
            }
            if (currentTime <= 10) {
                setCurrentState('blink');
            }
            setCurrentMessage('More than half way there!');
        } else {
            if (finished) {
                setCurrentState('');
                setCurrentMessage(`Time's up!`);
                return;
            }
            setCurrentMessage('');
        }

    }, [currentTime, totalTime, finished]);

    return <Row className="progressMessage" justify="center" align="middle">
        <Col>
            <h3 className={`${currentState}`}><i>{currentMessage}</i></h3>
        </Col>
    </Row>
}
