import './PointOfInterestCard.scss';
import PointOfInterest from '../interfaces/PointOfInterest';

interface PointOfInterestCardProps {
    pointOfInterest: PointOfInterest,
    id: number
}

function PointOfInterestCard({ pointOfInterest, id } : PointOfInterestCardProps) {
    return (<>
        <div className={'poi-container poi-border-'+id%2}>
            <h3>{pointOfInterest.name}</h3>
            <p>Walk time: {pointOfInterest.walkingDistance}</p>
        </div>
        
    </>);
}

export default PointOfInterestCard;