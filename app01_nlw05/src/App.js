import ButtonTest from "./Buttontest";
import ButtonTest2 from "./Buttontest2";


//Componente -> (função que retorna HTML)
function App() {
  return (
    <>
    <h1>Hello Word!</h1>
    <ButtonTest content="Click me by content"/> 
    <br/><br/>
    <ButtonTest2>Click me by children</ButtonTest2>
    </>
  );
}

export default App;
