'use client';

import React from 'react';

import { Button } from '../Button/Button';
import './AlertCard.module.css';

interface AlertCardBoxProps {
    text?: string;
    labelAgree?: string;
    labelRecuse?: string;
    onClickAgree?: () => void;
    onClickRecuse?: () => void;
}

export const AlertCard = ({
    onClickAgree,
    onClickRecuse,
    labelRecuse,
    labelAgree = 'Sim',
    text = undefined
}: AlertCardBoxProps) => {
    if (!text) return null;

    return (
        <div className="container">
            <div className="card">
                <div className="text">{text}</div>
                <div className="button">
                    {labelRecuse && (
                        <Button
                            label={labelRecuse}
                            onClick={onClickRecuse}
                        />
                    )}
                    <Button
                        label={labelAgree}
                        type={'submit'}
                        onClick={onClickAgree}
                    />
                </div>
            </div>
        </div>
    );
};
