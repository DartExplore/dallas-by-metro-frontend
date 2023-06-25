import './DestinationContainer.scss';
import Destination from '../Destination/Destination';

export interface DestinationInfo {
    image: string,
    name: string,
    station: string
}

interface DestinationContainerProps {
    destinations: DestinationInfo[];
}

function DestinationContainer({destinations}: DestinationContainerProps) {
    // we create an array of destinations in the container
    return (
        <>
            <div className="destination-container">
                {destinations.map((destination, i) =>
                    <Destination image={destination.image}
                                 name={destination.name}
                                 station={destination.station}
                                 index={i}
                    />
                )}
            </div>

        </>
    );
}

export default DestinationContainer;