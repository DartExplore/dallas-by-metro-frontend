import './PointOfInterestCard.scss';
import PointOfInterest from '../interfaces/PointOfInterest';

interface PointOfInterestCardProps {
    pointOfInterest: PointOfInterest
}

function PointOfInterestCard({ pointOfInterest } : PointOfInterestCardProps) {
    return (<>
        <div className='poi-container'>
            <p>{pointOfInterest.name}</p>
        </div>
        
    </>);
}

export default PointOfInterestCard;