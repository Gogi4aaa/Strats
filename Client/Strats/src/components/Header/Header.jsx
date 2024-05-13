import './Header.scss';

export default function Header({ icon, children, ...props }) {
    return (
        <div {...props}>
            <span><i className={icon}></i>{children}</span>
        </div>
    );
}