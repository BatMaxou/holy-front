import style from './Button.module.scss';
import cn from '../../../utils/classnames';

const Button = ({ children, className, ...props }) => {
    return <button className={cn(style.btn, className)} {...props}>{children}</button>;
}

export default Button;
