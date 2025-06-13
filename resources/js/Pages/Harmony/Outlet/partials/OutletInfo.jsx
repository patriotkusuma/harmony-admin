import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardHeader, Col, FormGroup, Label, Row } from 'reactstrap'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

function OutletInfo(props) {
    const {outlet} = props

    const MapIcon = new L.icon({
        iconUrl: "https://admin.harmonylaundry.my.id/assets/img/brand/logoku.svg",
        iconSize: [64, 64],
        // iconAnchor: [32, 64]
    })
    return (
        <Card className='shadow'>
            <CardHeader>
                <h4>Informasi Detail Outlet</h4>
            </CardHeader>
            <CardBody className='bg-secondary'>
                <Row>
                    <Col md="4">
                        <img
                            className='img-fluid rounded-lg'
                            src={outlet.logo ?? 'https://admin.harmonylaundry.my.id/assets/img/theme/team-4-800x800.jpg'}
                        />
                    </Col>
                    <Col md="8">
                        <h4>
                            <i className='fa fa-info-circle mr-1'></i>
                            Cabang {outlet.nama}
                        </h4>
                        <a
                            target='_blank'
                            href={`https://wa.me/${outlet.telpon.replace(0,62)}`}
                            className='h4'
                        >
                            <i className='fab fa-whatsapp mr-1'></i>
                            {outlet.telpon}
                        </a>
                        <p className='h5' >
                            <i className="fas fa-map-marker-alt mr-1"></i>
                            {outlet.alamat}</p>
                    </Col>
                    <Col xs="12">
                        <MapContainer
                            className='rounded-lg'
                            style={{height:'150px', width: '100%'}}
                            center={[outlet.latitude, outlet.longitude]} zoom={13} scrollWheelZoom={false}>
                            <TileLayer
                                // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker icon={MapIcon} position={[outlet.latitude, outlet.longitude]} >
                                <Popup>
                                    {`Harmony Laundry ${outlet.nama}`}
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

OutletInfo.propTypes = {
    outlet: PropTypes.object
}

export default OutletInfo
