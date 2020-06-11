import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { TimeInput } from './TimeInput';
import { ProgressMessage } from './ProgressMessage';
import { TimeLeft } from './TimeLeft';
import { Actions } from './Actions';

const { Header, Footer } = Layout;

export const Timer = () => {
    let interval: any;
    const [inputTime, setInputTime] = useState(1);
    const [totalTime, setTotalTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [runningState, setRunningState] = useState(false);
    const [timerSpeed, setTimerSpeed] = useState(1);
    const [finished, setFinished] = useState(false);

    /**
     * current state not set in sync so passing for the first time
     */
    const resumeCountDown = (inputTime?: number) => {
        let time = currentTime || inputTime;
        if (time) {
            setFinished(false);
            setRunningState(true);
        }
    }

    useEffect(() => {
        const timer = runningState && setInterval(() => {
            setCurrentTime(currentTime - 1);
            if (currentTime <= 0) {
                exitTimer();
            }
        }, 1000 / timerSpeed);
        if (timer)
            return () => clearInterval(timer);
    });

    const pauseCountDown = () => {
        setRunningState(false);
        clearInterval(interval);
    }
    const startNewTimer = () => {
        setCurrentTime(inputTime * 60);
        setTotalTime(inputTime * 60);
        resumeCountDown(inputTime * 60);
    }
    const exitTimer = () => {
        setFinished(true);
        setRunningState(false);
        clearInterval(interval);
        setCurrentTime(0);
    }
    return (
        <Layout className="timer">
            <Header className="main-title">
                <h1> Countdown Timer</h1>
            </Header>
            <Layout>
                {/* Main input for time with submit button */}
                <TimeInput value={inputTime} onChange={(v) => setInputTime(v)} onSubmit={startNewTimer} />
                {/* Messages showing state of timer */}
                <ProgressMessage currentTime={currentTime} totalTime={totalTime} finished={finished} />
                {/* The main mm:ss timer */}
                <TimeLeft currentTime={currentTime} totalTime={totalTime} />
            </Layout>
            <Footer>
                {/* Start/Pause/FastForward/ */}
                <Actions pauseCountDown={pauseCountDown} resumeCountDown={resumeCountDown} running={runningState} currentSpeed={timerSpeed} speedChange={setTimerSpeed} />
            </Footer>
        </Layout>
    );
}