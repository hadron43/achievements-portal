import React from 'react'
import { Badge } from 'reactstrap'

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

export { ApprovedBadge };