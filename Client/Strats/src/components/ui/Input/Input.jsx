import { forwardRef } from "react";

import './Input.scss';

const Input = forwardRef(function Input({ textarea, id, ...props }, ref) {
    return (
        <>
            {
                textarea ? (
                    <textarea id={id} className="input" {...props} />
                ) : (
                    <input id={id} className="input" type='text' {...props} />
                )
            }
        </>
    );
});

export default Input;