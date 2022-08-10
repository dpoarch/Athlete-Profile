import { Fragment, useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import CardGroup from 'react-bootstrap/CardGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

const View = () => {
    const [athletes, setAthletes] = useState([]);
    const [initialDataQuery, setInitialDataQuery] = useState(false);

    useEffect(() => {
        const getAthletes = async () => {
            const res = await axios.get('/api/athletes');
            console.log(res);
            if (res.status === 200) {
                setAthletes(res.data);
            }
        }
        if (!initialDataQuery) {
            getAthletes();
            setInitialDataQuery(true);
        }
    }, [initialDataQuery]);

    return(
    <Fragment>
         <Card>
         <Card.Header as="h5">
            <Row>
                <Col>Athletes Profile</Col>
                <Col style={{textAlign: 'right'}}><Button variant="primary">Create Profile</Button></Col>
            </Row></Card.Header>
         <Card.Body>
        <Row>
        { athletes.map((data, key) => (
        <Col className="col-md-3">
        <Card>
            <Card.Img className="rounded-circle mt-5 mb-4" variant="top" src={data.profileImg || 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22366%22%20height%3D%22160%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20366%20160%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_182898e6130%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A18pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_182898e6130%22%3E%3Crect%20width%3D%22366%22%20height%3D%22160%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22138.6484375%22%20y%3D%2289.6%22%3E366x160%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'} style={{width: '200px', height: '200px', margin: '0 auto'}}/>
            <ListGroup variant="flush">
                <ListGroup.Item> <Card.Title>{ data.name }</Card.Title>{data.sports.map((sport, i) => (
                    <Badge className="mx-1" bg="primary">
                        {sport}
                    </Badge>
                ))}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            
            <Card.Text>
                <strong>About:</strong> {data.about}
            </Card.Text>
            </Card.Body>
            
            <Card.Footer className="text-center">
                <Button variant="primary">View Profile</Button>
            </Card.Footer>
        </Card>
        </Col>
         ))}
      </Row>
      </Card.Body>
      </Card>
    
    </Fragment>
    )
};

export default View;