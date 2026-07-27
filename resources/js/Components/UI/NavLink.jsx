import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 ease-out focus:outline-none relative group ' +
                (active
                    ? 'bg-primary-700/10 text-primary-700 font-extrabold border-b-2 border-primary-600 shadow-lg'
                    : 'text-neutral-600 hover:text-primary-700 hover:bg-neutral-200/60') +
                ' ' +
                className
            }
        >
            {children}
        </Link>
    );
}
