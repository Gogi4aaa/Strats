import { useEffect, useRef } from 'react';

import Header from '../Header/Header.jsx';
import Modal from '../ui/Modal/Modal.jsx';

import './DefaultPage.scss';

export default function DefaultPage({ icon, title, children, modalButtonText, modalHeader, modalContent }) {
    const modal = useRef();

    useEffect(() => {
        if (modalContent) {
            modal.current.open();
        }
    }, [modalContent]);

    return (
        <>
            <Modal
                ref={modal}
                header={modalHeader}
                buttonCaption={modalButtonText}
            >
                {modalContent}
            </Modal>
            <div className='defaultPage'>
                {/* <Header icon={icon} className='defaultPage-header'>{title}</Header> */}
                <section>
                    <div className='defaultPage-children'>{children}</div>
                </section>
            </div>
        </>
    )
}