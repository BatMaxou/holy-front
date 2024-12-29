import './button.scss';
import cn from '../../../utils/classnames';

const Button = ({ children, className, ...props }) => {
    return <button className={cn('button', className)} {...props}>{children}</button>;
}

export default Button;
