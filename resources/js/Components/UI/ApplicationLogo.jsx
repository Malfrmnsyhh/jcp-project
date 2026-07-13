export default function ApplicationLogo(props) {
    return (
        <img
            src="/storage/images/logo.jpeg"
            alt="Application Logo"
            {...props}
            className={`object-contain ${props.className || ''}`}
        />
    );
}
