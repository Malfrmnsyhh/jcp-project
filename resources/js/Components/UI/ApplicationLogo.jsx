import logo from '../../../../storage/app/public/images/logo.jpg';

export default function ApplicationLogo(props) {
    return (
        <img src={logo} alt="Application Logo" {...props} />
    );
}
