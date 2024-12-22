import React from 'react'
import { Modal } from 'react-bootstrap'
import AnnoceForm from './const/AnnoceForm'

export default function Modals({ label, view, handleHide, handleShow, show }) {

    return (
        <Modal show={show} onHide={handleHide}>
            <Modal.Header>
                <Modal.Title>{label}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {view === 'annonce' && <AnnoceForm handleHide={handleHide} />}
            </Modal.Body>
        </Modal>
    )
}
