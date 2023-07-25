import {HTMLProps} from 'react';

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  label?: string;
  icon?: string;
  type?: 'button' | 'submit' | 'reset';
  variant: 'primary' | 'secondary';
}
const Button = ({label, icon, type = 'button', variant, ...rest}: ButtonProps) => {
  return (
    <button className={`c-button ${variant === 'primary' ? 'is-primary' : 'is-secondary'} cursor-pointer`} type={type} {...rest}>
      <img src={icon} alt="button icon" />
      {label}
    </button>
  );
};

export default Button;
