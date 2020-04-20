import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

ReactDOM.render(<App />, document.getElementById("root"));
