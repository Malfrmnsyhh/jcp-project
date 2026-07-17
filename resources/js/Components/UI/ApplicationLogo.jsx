export default function ApplicationLogo({ className = '', ...props }) {
    return (
        <div className={`aspect-square overflow-hidden rounded-xl shrink-0 ${className}`}>
            <img
                src="/storage/images/logo/logo48.ico"
                alt="JCP Logo"
                className="w-full h-full object-fill"
                {...props}
            />
        </div>
    );
}
