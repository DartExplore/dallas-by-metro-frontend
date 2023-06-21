import PointOfInterest from '../interfaces/PointOfInterest';

interface PointOfInterestCardProps {
    pointOfInterest: PointOfInterest
}

function PointOfInterestCard({ pointOfInterest } : PointOfInterestCardProps) {
    return (<>
        <p>{pointOfInterest.name}</p>
    </>);
}

export default PointOfInterestCard;