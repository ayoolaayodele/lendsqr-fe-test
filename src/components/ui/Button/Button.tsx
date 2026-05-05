import classNames from 'classnames';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.scss';

type ButtonVariant = 'primary' | 'text' | 'outline';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

export default function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames(
        'ui-button',
        `ui-button--${variant}`,
        fullWidth && 'ui-button--full-width',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
