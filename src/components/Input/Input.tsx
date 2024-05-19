import React, { CSSProperties, forwardRef } from 'react';
import type { Message, MultipleFieldErrors, Ref } from 'react-hook-form';

import { TextError } from '../TextError/TextError';
import styles from './Input.module.css';

export type FieldError = {
    type: string;
    ref?: Ref;
    types?: MultipleFieldErrors;
    message?: Message;
};

interface InputProps {
    label: string;
    password?: boolean;
    maxLength?: number;
    fieldError?: FieldError;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        { label, fieldError, password = false, maxLength = 50, ...props },
        ref
    ) => {
        const defaultInputStyle: CSSProperties = {
            width: password ? '90%' : '100%'
        };

        return (
            <div>
                <label
                    className={styles.defaultLabel}
                    htmlFor={'input' + label}
                >
                    {label}
                </label>
                <div className={styles.defaultBorderInputStyle}>
                    <input
                        ref={ref}
                        id={'input' + label}
                        maxLength={maxLength}
                        type={password ? 'password' : 'text'}
                        className={styles.defaultInputStyle}
                        style={{ ...defaultInputStyle }}
                        {...props}
                    />
                </div>
                <TextError
                    label={fieldError}
                    size={'0.8rem'}
                />
            </div>
        );
    }
);

Input.displayName = 'Input';
