import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
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
        <input
            {...props}
            type={type}
            className={
                'rounded-xl border-neutral-300 bg-neutral-100 px-4 py-2.5 text-sm transition-all hover:bg-neutral-200/70 focus:bg-white focus:border-primary-500 focus:ring-primary-500 ' +
                className
            }
            ref={localRef}
        />
    );
});
