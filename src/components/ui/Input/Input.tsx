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
  const hasRightSlot = Boolean(rightSlot);

  return (
    <div className='ui-input-wrap'>
      <input
        className={classNames(
          'ui-input',
          hasRightSlot && 'ui-input--with-right-slot',
          hasError && 'ui-input--error',
          className,
        )}
        {...rest}
      />
      {hasRightSlot ? <div className='ui-input__right-slot'>{rightSlot}</div> : null}
    </div>
  );
}
