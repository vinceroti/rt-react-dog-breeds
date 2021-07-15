import { useEffect } from "react";
import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";
import WebFont from "webfontloader";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Open Sans"],
      },
    });
  }, []);

  return (
    <div className="App container">
      <Header></Header>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
