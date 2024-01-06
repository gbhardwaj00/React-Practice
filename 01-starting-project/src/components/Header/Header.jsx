import reactIconImg from "../../assets/react-core-concepts.png";
import './Header.css'

const reactDefinitions = ["Core", "Fundamental", "Essential", "Crucial"];

function getRandomInt() {
  return Math.floor(Math.random() * reactDefinitions.length)
}

export default function Header() {
  const definition = reactDefinitions[getRandomInt()]
  return (
    <header>
      <img src={reactIconImg} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {definition} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  )
}