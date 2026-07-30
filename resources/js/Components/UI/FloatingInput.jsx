import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function FloatingInput(
    { id, label, error, type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div className={`relative z-0 w-full group ${className}`}>
            <input
                id={id}
                name={props.name ?? id}
                type={type}
                ref={localRef}
                placeholder=" "
                {...props}
                className={[
                    'block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer transition-colors',
                    error
                        ? 'text-rose-700 border-rose-400 focus:border-rose-600'
                        : 'text-neutral-900 border-neutral-400 focus:border-primary-700',
                    props.disabled ? 'opacity-50 cursor-not-allowed' : '',
                ].join(' ')}
            />
            {label && (
                <label
                    htmlFor={id}
                    className={[
                        'absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]',
                        'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0',
                        'peer-focus:scale-75 peer-focus:-translate-y-6',
                        error
                            ? 'text-rose-500 peer-focus:text-rose-600'
                            : 'text-neutral-500 peer-focus:text-primary-700',
                    ].join(' ')}
                >
                    {label}
                </label>
            )}
            {error && (
                <p className="mt-1.5 text-xs text-rose-500">{error}</p>
            )}
        </div>
    );
});
