import './InputForm.scss';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
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
        setWalkDistance(values.walk);
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
  const [types, setTypes] = useState<string[]>([]);
  const [poiList, setPoiList] = useState<PointOfInterest[]>([]);
  const [walkDistance, setWalkDistance] = useState(10);

  useEffect(() => {
    axios.get('http://localhost:8080/api/public/amenities')
      .then(response => {
        setAmenities(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    axios.get('http://localhost:8080/api/public/type')
      .then(response => {
        setTypes(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
      <Form>
        <FormObserver onWalkChange={(newWalk : number)=>setWalkDistance(newWalk)} />
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
              {types.map((type)=>
                <option value={type}>{type.split("_").map((s)=>s.toLowerCase()).join(" ")}</option>
              )}
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

    {Object.entries(groupByStationId(poiList)).map(([stationName, pointOfInterestList])=> // group by station
      <Station stationName={stationName} 
        pointOfInterestList={pointOfInterestList.filter((p)=>p.walkingDistance <= walkDistance)} /> // filter by walk distance
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

interface FormObserverProps {
  onWalkChange : (newState: number) => void
}

function FormObserver({onWalkChange} : FormObserverProps) {
  const { values } = useFormikContext<FormValues>();
  useEffect(() => {
    onWalkChange(values.walk);
  }, [values.walk, onWalkChange]);  
  return null;
}

export default InputForm;