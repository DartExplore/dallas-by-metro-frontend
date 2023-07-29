import InputForm from "../InputForm/InputForm.tsx";
import "./Planner.css";

const Planner = () => {
  return (
    <main className="planner">
      <header>
        <h1>Find DARTable places</h1>
      </header>
      <InputForm />
    </main>
  );
};

export default Planner;
