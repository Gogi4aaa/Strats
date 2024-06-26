import './Button.scss';

export default function Button({ type, onClick, children, ...props }) {
    return (
        <button type={type} className="btn" onClick={onClick} {...props}>{children}</button>
    );
};