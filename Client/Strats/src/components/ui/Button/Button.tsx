import './Button.scss';

type ButtonProps = {
    type: 'button' | 'submit' | 'reset';
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ type, onClick, children, ...props }) => {
    return (
        <button type={type} className="button" onClick={onClick} {...props}>{children}</button>
    );
};

export default Button;