import { useEffect, useState } from "react";

function App() {
  // https://api.adviceslip.com/advice(api)
  const [advice, setAdvice] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

  async function handleGetAdvice() {
    const res = await fetch(` https://api.adviceslip.com/advice`);
    const data = await res.json();
    setAdvice(data.slip);
  }

  useEffect(() => {
    async function getAdvice() {
      handleGetAdvice();
    }
    getAdvice();
  }, []);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 576);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app">
      <p className="title">
        ADVICE <span>#{advice?.id}</span>
      </p>
      <h2 className="advice">{advice?.advice}</h2>
      <img
        src={
          isMobile
            ? "/images/pattern-divider-mobile.svg"
            : "/images/pattern-divider-desktop.svg"
        }
        alt="divider"
      />
      <button className="dice-btn" onClick={handleGetAdvice}>
        <img src="/images/icon-dice.svg" alt="dice" />
      </button>
    </div>
  );
}

export default App;
