import React from 'react'
import { Table, Button } from 'reactstrap';
import { baseUrl } from '../../shared/baseUrl';

const deleteBannerFromServer = (key, bannerId, deleteFromList) => {
    fetch(baseUrl + 'main/api/banner/' + bannerId + '/', {
        method: 'DELETE',
        headers: {
            'Authorization': 'Token ' + key
        }
    })
    .then(response => {
        if(!response.ok)
            throw Error('Error!')
        return response
    })
    .then(() => {
        deleteFromList()
    })
    .catch((err) => {
        console.log(err.message)
    })
}

function RenderBanners({key, banners, deleteBanner}) {
    return (
        <Table hover responsive className="rounded-2">
            <thead>
                <tr>
                <th className="text-color-main h5">#</th>
                <th className="text-color-main h5">Image</th>
                <th className="text-color-main h5">Title</th>
                <th className="text-color-main h5">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    (banners) ?
                    banners.map((banner) => {
                        return (
                            <tr>
                            <td>{banner.id}</td>
                            <td>
                                <img style={{maxWidth: '25vw'}} src={banner.image} alt={banner.Image} />
                            </td>
                            <td>{banner.title}</td>
                            <td>
                                <Button color='danger'
                                    className='w-100'
                                    disabled={banner.deleting}
                                    onClick={() => {
                                        banner.deleting = true
                                        deleteBannerFromServer(key, banner.id, () => deleteBanner(banner))
                                    }}
                                >
                                    Delete
                                </Button>
                            </td>
                            </tr>
                        )
                    })
                    :
                    <></>
                }
            </tbody>
        </Table>
    )
}

export default RenderBanners;