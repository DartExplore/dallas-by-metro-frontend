import './css/InputForm.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';

type FormValues = {
  walk: number;
  type: string;
  amenity: number[];
};

const InputForm = () => {
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
            <label>
              <Field type="checkbox" name="amenity" value="1" />
              Option 1
            </label>
            <label>
              <Field type="checkbox" name="amenity" value="2" />
              Option 2
            </label>
            <label>
              <Field type="checkbox" name="amenity" value="3" />
              Option 3
            </label>
            <label>
              <Field type="checkbox" name="amenity" value="4" />
              Option 4
            </label>
          </div>
            
          <ErrorMessage name="amenity" component="div" className="error" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default InputForm