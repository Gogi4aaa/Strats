export default function Header({ icon, children, ...props }) {
    return (
        <div {...props}>
            <span><i className={icon}>{children}</i></span>
        </div>
    );
}