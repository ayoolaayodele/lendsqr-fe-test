import classNames from 'classnames';
import type { InputHTMLAttributes, ReactNode } from 'react';
import './Input.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
  rightSlot?: ReactNode;
};

export default function Input({
  className,
  hasError = false,
  rightSlot,
  ...rest
}: InputProps) {
  return (
    <div className='ui-input-wrap'>
      <input
        className={classNames(
          'ui-input',
          rightSlot && 'ui-input--with-right-slot',
          hasError && 'ui-input--error',
          className,
        )}
        {...rest}
      />
      {rightSlot ? <div className='ui-input__right-slot'>{rightSlot}</div> : null}
    </div>
  );
}
