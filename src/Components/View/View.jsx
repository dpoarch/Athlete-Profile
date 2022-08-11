import { Fragment, useState, useEffect } from 'react';
import CreateModal from '../Modal/CreateModal/CreateModal';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Moment from 'react-moment';
import axios from 'axios';

const View = () => {
    const [modalShow, setModalShow] = useState(false);
    const [athletes, setAthletes] = useState([]);
    const [createNew, setCreateNew] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState({});
    const [init, setInit] = useState(false);

    useEffect(() => {
        const getAthletes = async () => {
            const res = await axios.get('/api/athletes');
            if (res.status === 200) {
                setAthletes(res.data);
            }
        }
        if (!init) {
            getAthletes();
            setInit(true);
        }
    }, [init]);

    const launchModal = (createNew, selectedProfile=null) => {
        setCreateNew(createNew);
        if (!createNew && selectedProfile !== null) {
            setSelectedProfile(selectedProfile);
        }
        setModalShow(true);
    }

    return(
    <Fragment>
         <Card style={{borderColor: 'transparent'}}>
         <Card.Header as="h4">
            <Row>
                <Col>Athletes Profile</Col>
                <Col style={{textAlign: 'right'}}>
                <Button variant="primary" onClick={() => launchModal(true)}>
                    Add New Profile
                </Button>
                </Col>
            </Row>
            </Card.Header>
         <Card.Body>
        <Row className="mt-5">
        { athletes.map((data, key) => (
        <Col md={4}>
        <Card className="onHover">
            <Card.Img className="rounded-circle mt-4 mb-4" variant="top" src={data.profileImg || 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22366%22%20height%3D%22160%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20366%20160%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_182898e6130%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A18pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_182898e6130%22%3E%3Crect%20width%3D%22366%22%20height%3D%22160%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22138.6484375%22%20y%3D%2289.6%22%3E366x160%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'} style={{width: '200px', height: '200px', margin: '0 auto'}}/>
         
            <Card.Body className="text-center">
            
            <Card.Title>{ data.name }</Card.Title>
            </Card.Body>
            <ListGroup>                                                   
                <ListGroup.Item>
                    <Row>
                        <Col>Date of Birth</Col>
                        <Col><Moment format="YYYY/MM/DD">{data.birthdate}</Moment></Col>
                    </Row>
                </ListGroup.Item>     
                <ListGroup.Item>
                    <Row>
                        <Col>Location</Col>
                        <Col>{data.location}</Col>
                    </Row>
                </ListGroup.Item>  
                <ListGroup.Item>
                    <Row>
                        <Col>Team</Col>
                        <Col>{data.team}</Col>
                    </Row>
                </ListGroup.Item>  
                <ListGroup.Item>
                    <Row>
                        <Col>Gender</Col>
                        <Col>{data.gender}</Col>
                    </Row>
                </ListGroup.Item>        
                <ListGroup.Item>
                    <Row>
                        <Col>Sports</Col>
                        <Col>{data.sports.map((sport, i) => (
                            <Badge className="" bg={'primary'}>{sport}</Badge>
                        ))}
                        </Col>
                    </Row>
                </ListGroup.Item>  
                <ListGroup.Item>
                    <Row>
                        <Col>About</Col>
                        <Col>{data.about}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Interests</Col>
                        <Col>{data.interests}</Col>
                    </Row>
                </ListGroup.Item>                     
            </ListGroup>
            
            <Card.Footer className="text-center">
                <Button variant="secondary" onClick={() => launchModal(false, data)}>Update Profile</Button>
            </Card.Footer>
        </Card>
        </Col>
         ))}
      </Row>
      </Card.Body>
      </Card>
        <CreateModal show={modalShow} onHide={() => setModalShow(false)} createNew={createNew}
                selectedProfile={selectedProfile}
                setAthletes={setAthletes}/>
    </Fragment>
    )
};

export default View;