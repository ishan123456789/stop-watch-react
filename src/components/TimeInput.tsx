import React from 'react';
import { Row, Col, InputNumber, Button } from 'antd';

interface TimeInput {
    value: number;
    onSubmit: () => void;
    onChange: (v: any) => void;
}
export const TimeInput = ({ value, onSubmit, onChange }: TimeInput) => {
    return <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <Row className="timerInput" justify="center" align="middle">
            <Col span={8} className="text">Countdown</Col>
            <Col span={8} className="input">
                <InputNumber
                    placeholder="(Min)"
                    parser={value => value?.replace(/\D/g, '') || ''}
                    min={1}
                    value={value}
                    onChange={onChange} />
            </Col>
            <Col span={8} className="action">
                <Button type="primary" onClick={onSubmit}>Start</Button>
            </Col>
        </Row>
    </form>;
}