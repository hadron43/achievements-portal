import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Input, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { postInstitution } from '../redux/ActionCreators';

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

function captializeFirstWord(string) {
    return string.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

function AddInstitutionModal({ token, isModalOpen, setIsModalOpen }) {
    const [institution, setInstitution] = useState('')
    const [city, setCity] = useState('')

    const [saving, setSaving] = useState(false)
    const [savingError, setSavingError] = useState(false)
    const [savingMsg, setSavingMsg] = useState(false)

    const getString = () => captializeFirstWord(institution) + ', ' + captializeFirstWord(city)
    const clear = () => { setCity(''); setInstitution('') }

    return (
        <Modal isOpen={isModalOpen} centered toggle={() => setIsModalOpen(!isModalOpen)}>
            <ModalHeader>
                Add Institute
            </ModalHeader>
            <ModalBody>
                <span className="text-danger font-weight-bold">
                    NOTE: Go through these instructions before adding new institute.
                </span>
                <ul className='text-danger'>
                    <li>Make sure the institute that you are adding is not already present.</li>
                    <li>Enter full name of city and institute.</li>
                    <li>Refresh page after adding new institute.</li>
                </ul>
                <Input placeholder="Institute Name" value={institution}
                    onChange={e => setInstitution(e.target.value)}
                    className='mb-2'
                     />
                <Input placeholder="City Name" value={city}
                    onChange={e => setCity(e.target.value)}
                    className='mb-2'
                     />
                <p className={`${savingError ? 'text-danger' : 'text-success'}`}>{savingMsg}</p>
            </ModalBody>
            <ModalFooter>
                <Button color='danger'
                    disabled={!institution || !city || saving}
                    onClick={() => postInstitution(token, getString(), setSaving, setSavingError, setSavingMsg, clear)}
                    >
                    Add New Institute
                </Button>
                <Button color='success' onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export { ApprovedBadge, RejectionModal, RenderUser, RenderEducation, AddInstitutionModal, listOfTitles, listOfDegrees };