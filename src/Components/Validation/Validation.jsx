import { useEffect, useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import * as yup from "yup";
import Forms from "../Forms/Forms";
import Summary from "../Summary/Summary";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";

const profileSchema = yup.object().shape({
  name: yup.string().required("Name field is required"),
  birthdate: yup.string().required("Date of birth field is required"),
  location: yup.string().required("Location field is required"),
  team: yup.string().required("Team field is required"),
  gender: yup.string().required("Gender filed is required"),
  sports: yup.array().min(1, "Please Add at least 1 sports").required(),
  about: yup.string().required("About field is required"),
  interests: yup.string().required("Interests field is required"),
  profileImg: yup.string().notRequired().nullable(),
});

const Validation = ({ onHide, createNew, selectedProfile, setProfiles }) => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    birthdate: "",
    location: "",
    team: "",
    gender: "",
    sports: [],
    about: "",
    interests: "",
    profileImg: "",
  });

  const [sportsMap, setSportsMap] = useState({
    Golf: false,
    Tennis: false,
    Cricket: false,
    Basketball: false,
    Baseball: false,
    "American Football": false,
    Aquatics: false,
    Archery: false,
    "Automobile Racing": false,
    Badminton: false,
    "Beach Volleyball": false,
    Bobsleigh: false,
    "Body Building": false,
    Boxing: false,
    "Cross Country Running": false,
    "Cross Country Skiing": false,
    Curling: false,
    Cycling: false,
    Darts: false,
    Decathlon: false,
    "Down Hill Skiing": false,
    Equestrianism: false,
    eSports: false,
    Fencing: false,
    "Field Hockey": false,
    "Figure Skating": false,
    Gymnastics: false,
    "Ice Hockey": false,
    "Martial Arts": false,
    "Mixed Martial Arts": false,
    "Modern Pentathlon": false,
    "Motorcycle Racing": false,
    Netball: false,
    Polo: false,
    Racquetball: false,
    Rowing: false,
    Rugby: false,
    Sailing: false,
    Softball: false,
    Shooting: false,
    Skateboarding: false,
    "Skeet Shooting": false,
    Skeleton: false,
    "Snow Boarding": false,
    "Soccer (Football)": false,
    Squash: false,
    Surfing: false,
    Swimming: false,
    "Track and Field": false,
  });
  console.log(initialValues);

  useEffect(() => {
    if (!createNew && selectedProfile !== null) {
      const valuesCopy = { ...initialValues };
      for (let key in selectedProfile) {
        let value = selectedProfile[key];
        if (key === "birthdate") {
          const d = new Date(value);
          value = moment(d).format("YYYY-MM-DD");
        }
        valuesCopy[key] = value;
      }
      setInitialValues(valuesCopy);
      const { sports } = selectedProfile;
      const sportsMapCopy = { ...sportsMap };
      for (let i = 0; i < sports.length; i++) {
        sportsMapCopy[sports[i]] = true;
      }
      setSportsMap(sportsMapCopy);
    }
  }, [createNew, selectedProfile]);

  const itemSports = (key) => {
    setSportsMap((prev) => {
      const mapCopy = { ...prev };
      mapCopy[key] = !mapCopy[key];
      return mapCopy;
    });
  };

  const [viewSummary, setViewSummary] = useState(false);

  const createUpdateProfile = async (values) => {
    const body = values;

    let res;
    if (createNew) {
      res = await axios.post("/api/createProfile", body);
    } else {
      res = await axios.put("/api/athletesProfile", body);
    }
    if (res.status === 200) {
      setProfiles(res.data);
      onHide();
    }
  };

  return (
    <Row>
      <Col md={12}>
        <h5 className="mb-5">{createNew ? "New" : "Update"} Profile</h5>

        <Formik
          initialValues={initialValues}
          validationSchema={profileSchema}
          enableReinitialize={true}
          validateOnMount={true}
        >
          {({ values, isValid, errors, setFieldValue }) => (
            <>
              {!viewSummary ? (
                <Forms
                  values={values}
                  setFieldValue={setFieldValue}
                  isValid={isValid}
                  errors={errors}
                  sportsMap={sportsMap}
                  itemSports={itemSports}
                  setViewSummary={setViewSummary}
                />
              ) : (
                <Summary
                  values={values}
                  setViewSummary={setViewSummary}
                  createUpdateProfile={createUpdateProfile}
                />
              )}
            </>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default Validation;
