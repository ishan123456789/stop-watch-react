import React from 'react';
import { message, Row, Col, Button, Tooltip } from 'antd';
import { FastBackwardOutlined, PauseCircleOutlined, PlayCircleOutlined, FastForwardOutlined } from '@ant-design/icons';

interface ActionsProps {
    running: boolean; // true for running false for paused
    pauseCountDown: () => void;
    resumeCountDown: () => void;
    speedChange: (speed: number) => void;
    currentSpeed: number;
}
export const Actions = ({ pauseCountDown, resumeCountDown, running, speedChange, currentSpeed }: ActionsProps) => {
    const speedAllowed = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
    const pushChange = (speed: number) => {
        message.info(`${speed}x`);
        speedChange(speed);
    };
    const updateTimerSpeed = (change: 'up' | 'down') => {
        const index = speedAllowed.indexOf(currentSpeed);
        switch (change) {
            case 'up':
                if (speedAllowed[index + 1]) {
                    pushChange(speedAllowed[index + 1])
                }
                break;
            case 'down':
                if (speedAllowed[index - 1]) {
                    pushChange(speedAllowed[index - 1]);
                }
        }

    }

    const getActionButton = () => {
        if (running) return <Button type="primary" block onClick={pauseCountDown}>
            <PauseCircleOutlined />
        </Button>;
        return <Button type="primary" block onClick={resumeCountDown}>
            <PlayCircleOutlined />
        </Button>;
    }
    return <Row className="timerActions" justify="center" align="middle">

        <Col span={4}>
            <Tooltip title="Speed down">
                <Button type="primary" block onClick={() => updateTimerSpeed('down')}>
                    <FastBackwardOutlined />
                </Button>
            </Tooltip>
        </Col>
        <Col span={4}>
            <Tooltip title={`Pause/Start countdown`}>
                {getActionButton()}
            </Tooltip>
        </Col>
        <Col span={4}>
            <Tooltip title={`Speed up`}>
                <Button type="primary" block onClick={() => updateTimerSpeed('up')}>
                    <FastForwardOutlined />
                </Button>
            </Tooltip>
        </Col>
    </Row>
}