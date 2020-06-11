import React from 'react';
import { Row, Col } from 'antd';


interface ProgressMessageProp {
    currentTime: number;
    totalTime: number;
}

export const TimeLeft = ({ currentTime, totalTime }: ProgressMessageProp) => {
    const prepareTimeLeft = (): string => {
        if (currentTime && totalTime) {
            const minutes = Math.floor(currentTime / 60);
            const seconds = currentTime - (minutes * 60);
            return `${`${minutes}`.padStart(2, '0')}:${`${seconds}`.padStart(2, '0')}`;
        }
        return '00:00';
    }
    return <Row className="timeLeft" justify="center" align="middle">
        <Col>
            <h1>{prepareTimeLeft()}</h1>
        </Col>
    </Row>
}
