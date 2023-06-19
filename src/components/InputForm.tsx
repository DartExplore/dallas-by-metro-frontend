import './css/InputForm.css'
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

const InputForm = () => {
  /* formik form */
  const initialValues : FormValues = {
    walk: 10,
    type: '',
    amenity: [],
  };

  const handleSubmit = (values: FormValues) => {
    // Handle form submission here
    console.log(values);
  };

  const validate = (values : FormValues) => {
    const errors = {walk: "", type: "", amenity: ""};

    // Add validation logic for each field here
    if (values.walk <= 0) {
      errors.walk = 'Walk time must be positive.';
    }

    return errors;
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
        <div className='basic-grid'>
          <label htmlFor="walk">Walk (minutes):</label>
          <Field type="number" id="walk" name="walk" />
          <ErrorMessage name="walk" component="div" className="error" />
        </div>

        <div className='basic-grid'>
          <label htmlFor="type">Type:</label>
          <Field as="select" id="type" name="type">
            <option value="">Any</option>
            <option value="option1">Restaurant</option>
            <option value="option2">Bar</option>
            <option value="option3">Coffee Shop</option>
          </Field>
          <ErrorMessage name="type" component="div" className="error" />
        </div>

        <div className='basic-grid'>
          <label>Amenities:</label>
          <div className='amenities-container'>
            {amenities.map((amenity)=>
              <label>
                <Field type="checkbox" name="amenity" value={amenity.amenityId} />
                {amenity.amenity.split("_").map((s)=>s.toLowerCase()).join(" ")}
              </label>
            )}
          </div>
            
          <ErrorMessage name="amenity" component="div" className="error" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default InputForm