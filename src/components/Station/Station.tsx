import './Station.scss';
import PointOfInterest from '../interfaces/PointOfInterest';
import PointOfInterestCard from '../PointOfInterestCard/PointOfInterestCard';

interface StationProps {
    stationName : string,
    pointOfInterestList : PointOfInterest[]
}

function Station({stationName, pointOfInterestList} : StationProps){
    return (<>
        <div className='station-container'>
            <h2>{stationName}</h2>
            {pointOfInterestList.map((p=>
                <PointOfInterestCard pointOfInterest={p} />
            ))}
        </div>
        
    </>);
}

export default Station;