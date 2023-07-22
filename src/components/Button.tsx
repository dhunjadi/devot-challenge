import {HTMLProps} from 'react';

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  icon?: string;
  type?: 'button' | 'submit' | 'reset';
  variant: 'primary' | 'secondary';
}
const Button = ({children, icon, type = 'button', variant, ...rest}: ButtonProps) => {
  return (
    <button className={`c-button ${variant === 'primary' ? 'is-primary' : 'is-secondary'}`} type={type} {...rest}>
      <img src={icon} alt="button icon" />
      {children}
    </button>
  );
};

export default Button;
