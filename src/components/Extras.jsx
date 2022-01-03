import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Input, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

const listOfTitles = [
    {id: 1, title: 'Dr.'},
    {id: 2, title: 'Mr.'},
    {id: 3, title: 'Mrs.'},
    {id: 4, title: 'Ms.'},
]

const listOfDegrees = [
    'Matriculation',
    'Intermediate',
    'B.Tech.',
    'B.Sc.',
    'B.Com.',
    'B.Arts.',
    'B.Arch.',
    'B.B.A.',
    'M.B.A.',
    'M.Tech.',
    'M.Sc.',
    'M.Com.',
    'M.Arts.',
    'M.Arch.',
    'M.B.B.S.',
    'M.Phil.',
    'Ph.D.',
    'Others',
]

function ApprovedBadge({ value }) {
    return (
        <>
        {
            (!value) ?
            <Badge color="danger" pill>Error</Badge>
            :
            (value.toLowerCase() === 'approved') ?
            <Badge color="success" pill>Approved</Badge>
            :
            (value.toLowerCase() === 'pending') ?
            <Badge color="warning" pill>Pending</Badge>
            :
            <Badge color="danger" pill>Rejected</Badge>
        }
        </>
    )
}

function RejectionModal({ modalOpen, setModalOpen, onReject, title, id, className=""}) {
    const [reason, setReason] = useState("");
    const toggle = () => setModalOpen(!modalOpen)

    return (
        <Modal isOpen={modalOpen} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>
                {id}. {title}
            </ModalHeader>
            <ModalBody>
                <Input type="textarea"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    name="reason"
                    placeholder="Enter reason for rejection"
                    className="w-100 px-2"
                        />
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={() => {
                    onReject(reason)
                    toggle()
                }}>
                    Reject
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

function RenderUser({ user }) {
    if(!user)
        return (<></>)

    return (
        <Link to={`/profile/${user.id ? user.id : user.user}`}>
        <Button outline color="primary" className="rounded-pill">
            {user.first_name + ' ' + user.last_name}
        </Button>
        </Link>
    );
}

function RenderEducation({ institution, degree, year }) {
    return(
        <p>
        {`${degree} ⁃ ${institution} ⁃ (${year})`}
        </p>
    )
}

export { ApprovedBadge, RejectionModal, RenderUser, RenderEducation, listOfTitles, listOfDegrees };