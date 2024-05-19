import React, { forwardRef } from 'react';

import { FieldError } from '../Input/Input';
import { TextError } from '../TextError/TextError';
import styles from './CheckBox.module.css';

interface CheckBoxProps {
    isChecked: boolean;
    onClick: () => void;
    label: string;
    fieldError?: FieldError;
}

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
    ({ isChecked, onClick, label, fieldError }: CheckBoxProps, ref) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="checkbox"
                    id={'checkbox' + label}
                    name={'checkbox' + label}
                    checked={isChecked}
                    onChange={onClick}
                    ref={ref}
                />
                <label
                    htmlFor={'checkbox' + label}
                    className={styles.checkBox}
                >
                    {label}
                </label>
                <TextError
                    label={fieldError}
                    size={'0.8rem'}
                />
            </div>
        );
    }
);

CheckBox.displayName = 'CheckBox';
