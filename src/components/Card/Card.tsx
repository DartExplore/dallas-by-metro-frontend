import "./Card.scss";

interface CardProps {
  headerText: string;
  description: string;
  buttonText: string;
}

function Card({ headerText, description, buttonText }: CardProps) {
  return (
    <>
      <div className="card">
        <h2>{headerText}</h2>
        <p>{description}</p>
        {buttonText.length ? <button type="submit">{buttonText}</button> : null}
      </div>
    </>
  );
}

export default Card;
