import './InputForm.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Amenity from '../interfaces/Amenity';
import PointOfInterest from '../interfaces/PointOfInterest';
import Station from '../Station/Station';

type FormValues = {
  walk: number;
  type: string;
  amenity: number[];
};

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
        pointOfInterestList.sort((a, b)=>a.stationName.localeCompare(b.stationName));
        setPoiList(pointOfInterestList);
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
  const [poiList, setPoiList] = useState<PointOfInterest[]>([]);

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
    <>
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

    {Object.entries(groupByStationId(poiList)).map(([stationName, pointOfInterestList])=>
      <Station stationName={stationName} pointOfInterestList={pointOfInterestList} />
    )}
    </>
  );
};

/* helper function to group poiList by stations */
function groupByStationId(pointOfInterestArray: PointOfInterest[]) {
  return pointOfInterestArray.reduce((groups: { [key: string]: PointOfInterest[] }, pointOfInterest) => {
    const { stationName } = pointOfInterest;
    if (groups[stationName]) {
      groups[stationName].push(pointOfInterest);
    } else {
      groups[stationName] = [pointOfInterest];
    }
    return groups;
  }, {});
}

export default InputForm;