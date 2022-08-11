import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { Field } from "formik";

const FormError = ({ message }) => {
  return <span className={"ml-2 text-danger"}>{message}</span>;
};

const Forms = ({
  values,
  setFieldValue,
  sportsMap,
  itemSports,
  isValid,
  errors,
  setViewSummary,
}) => {
  const [sports, setSports] = useState("");

  const fieldName = (e) => {
    setFieldValue("name", e.target.value);
  };
  const fieldDateOfBirth = (e) => {
    setFieldValue("birthdate", e.target.value);
  };
  const fieldLocation = (e) => {
    setFieldValue("location", e.target.value);
  };
  const fieldTeam = (e) => {
    setFieldValue("team", e.target.value);
  };
  const fieldSports = (e) => {
    setSports(e.target.value);
  };
  const AddSports = () => {
    if (sports.length > 0) {
      itemSports(sports);
      setSports("");
    }
  };
  const fieldAbout = (e) => {
    setFieldValue("about", e.target.value);
  };

  const fieldInterests = (e) => {
    setFieldValue("interests", e.target.value);
  };
  const fieldProfileImg = (e) => {
    setFieldValue("profileImg", e.target.value);
  };

  useEffect(() => {
    const selectedSports = [];
    for (let key in sportsMap) {
      if (sportsMap[key]) {
        selectedSports.push(key);
      }
    }
    setFieldValue("sports", selectedSports);
  }, [sportsMap]);

  return (
    <Row>
      <Col md={12}>
        <Row>
          <Form.Group>
            <Form.Label className={"d-block"}>Name *</Form.Label>
            <Form.Control
              name={"name"}
              value={values.name}
              onChange={fieldName}
              errors={errors}
            />
            <small>
              <FormError message={errors.name} />
            </small>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className={"d-block"}>Date of Birth *</Form.Label>
            <Form.Control
              name={"birthdate"}
              type={"date"}
              value={values.birthdate}
              onChange={fieldDateOfBirth}
            />
            <small>
              <FormError message={errors.birthdate} />
            </small>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className={"d-block"}>Location *</Form.Label>
            <Form.Control
              label={""}
              name={"location"}
              value={values.location}
              onChange={fieldLocation}
            />
            <small>
              <FormError message={errors.location} />
            </small>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className={"d-block"}>Team *</Form.Label>
            <Form.Control
              name={"team"}
              value={values.team}
              onChange={fieldTeam}
            />
            <small>
              <FormError message={errors.team} />
            </small>
          </Form.Group>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3 mt-3">
              <Row>
                <Col>
                  <Form.Label className={"d-block"}>
                    Sports *{" "}
                    <small>
                      <FormError message={errors.sports} />
                    </small>
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={fieldSports}
                  >
                    <option value={""}>Select Sports Event to Add</option>
                    {Object.keys(sportsMap).map((key, i) => {
                      if (!values.sports.includes(key)) {
                        return <option value={key}>{key}</option>;
                      }
                    })}
                  </Form.Select>
                  <small>Add multiple sports event.</small>
                  <br />
                  <Button className="mt-2" onClick={() => AddSports()}>
                    Add Sports
                  </Button>
                </Col>
                <Col className="mx-2">
                  <Form.Label className={"d-block mt-3"}>
                    My Added Sports
                  </Form.Label>
                  <Row>
                    <Col md={12}>
                      <ListGroup>
                        {values.sports.map((key, i) => (
                          <ListGroup.Item>
                            <Row>
                              <Col>
                                <Badge className="mx-1" bg="primary">
                                  {key}
                                </Badge>
                              </Col>
                              <Col>
                                <a
                                  href="#"
                                  className="text-danger"
                                  style={{ textDecoration: "none" }}
                                  onClick={() => itemSports(key)}
                                >
                                  Remove
                                </a>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group>
              <Form.Label className={"d-block"}>Gender *</Form.Label>
              <Form.Label className="mx-3">
                <span className="mx-2">Male</span>
                <Field type={"radio"} name={"gender"} value={"male"} />
              </Form.Label>
              <Form.Label>
                <span className="mx-2">Female</span>
                <Field type={"radio"} name={"gender"} value={"female"} />
              </Form.Label>
            </Form.Group>
          </Col>
          <Col md={12}>
            <small>
              <FormError message={errors.gender} />
            </small>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label className={"d-block"}>About</Form.Label>
          <Form.Control
            name={"about"}
            value={values.about}
            onChange={fieldAbout}
          />
          <small>
            <FormError message={errors.about} />
          </small>
        </Form.Group>
        <Form.Group>
          <Form.Label className={"d-block"}>Interests</Form.Label>
          <Form.Control
            name={"interests"}
            value={values.interests}
            onChange={fieldInterests}
          />
          <small>
            <FormError message={errors.interests} />
          </small>
        </Form.Group>
        <Form.Group>
          <Form.Label className={"d-block"}>Profile Image</Form.Label>
          <Form.Control
            name={"profileImg"}
            value={values.profileImg}
            onChange={fieldProfileImg}
          />
        </Form.Group>
      </Col>
      <Col md={12} className={"text-center mt-5"}>
        <Button
          onClick={() => setViewSummary(true)}
          className={"text-right"}
          disabled={!isValid}
        >
          Proceed
        </Button>
      </Col>
    </Row>
  );
};

export default Forms;
