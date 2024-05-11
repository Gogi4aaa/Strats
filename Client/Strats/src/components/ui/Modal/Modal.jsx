import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import Button from '../Button/Button';

import './Modal.scss';

const Modal = forwardRef(function Modal({ header, buttonCaption, children }, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });

    return createPortal(
        <dialog ref={dialog} className='modal'>
            <h2 className='modal-header'>{header}</h2>
            {children}
            <form method='dialog'>
                <Button className='modal-button'>{buttonCaption}</Button>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    );
});

export default Modal;