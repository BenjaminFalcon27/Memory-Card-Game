import "../css/App.css";

import Grid from "./Grid";

function App() {
  return (
    <div className="App">
      <link
        href="https://fonts.cdnfonts.com/css/new-super-mario-font-u"
        rel="stylesheet"
      ></link>
      <style>
        @import url('https://fonts.cdnfonts.com/css/new-super-mario-font-u');
      </style>
      <header className="App-header">
        <h1 className="game-title">Mario Memory Card Game</h1>
      </header>
      <Grid />
    </div>
  );
}

export default App;
