import './InputForm.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import axios from 'axios';

type FormValues = {
  walk: number;
  type: string;
  amenity: number[];
};

type Amenity = {
  amenityId : number,
  amenity : string
}

type PointOfInterest = {
  poiId: number,
  name: string,
  location: string,
  walkingDistance: number,
  picUrl: string,
  type: string
  amenities: Amenity[],
  stationId: number,
  stationName: string
}

const InputForm = () => {
  /* formik form */
  const initialValues : FormValues = {
    walk: 10,
    type: '',
    amenity: [],
  };

  const handleSubmit = (values: FormValues) => {
    // Handle form submission here
    axios.get('http://localhost:8080/api/public/poi/amenity', {
      params: {
        amenityIdList: values.amenity.map((a)=>a.toString().substring(1)).join(",")
      }
    })
      .then(response => {
        const pointOfInterestList : PointOfInterest[] = response.data;
        pointOfInterestList.sort((a, b) => a.stationName.localeCompare(b.stationName));
        console.log(pointOfInterestList.map((p)=>p.name+" at "+p.stationName));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const validate = (values : FormValues) => {
    return (values.walk <= 0) ? {walk: "Walking time must be positive."} : {};
  };

  /* fetch amenity data */
  const [amenities, setAmenities] = useState<Amenity[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/public/amenities')
      .then(response => {
        setAmenities(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
      <Form>
        <div className='form-container'>
          <div className='basic-grid form-element'>
            <label htmlFor="walk">Walk (minutes):</label>
            <Field type="number" id="walk" name="walk" />
            <ErrorMessage name="walk" component="div" className="error" />
          </div>

          <div className='basic-grid form-element'>
            <label htmlFor="type">Type:</label>
            <Field as="select" id="type" name="type">
              <option value="">Any</option>
              <option value="option1">Restaurant</option>
              <option value="option2">Bar</option>
              <option value="option3">Coffee Shop</option>
            </Field>
          </div>

          <div className='basic-grid form-element'>
            <label>Amenities:</label>
            <div className='amenities-container'>
              {amenities.map((amenity)=>
                <label>
                  <Field type="checkbox" name="amenity" value={"A"+amenity.amenityId} />
                  {amenity.amenity.split("_").map((s)=>s.toLowerCase()).join(" ")}
                </label>
              )}
            </div>
          </div>

          <button type="submit">Submit</button>
        </div>
      </Form>
    </Formik>
  );
};

export default InputForm;