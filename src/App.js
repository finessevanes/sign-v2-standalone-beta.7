import { useState, useEffect } from "react";
import { SignClient } from "@walletconnect/sign-client";
import "./App.css";

function App() {
  const [signClient, setSignClient] = useState();

  async function createClient() {
    try {
      const signClient = await SignClient.init({
        projectId: process.env.REACT_APP_PROJECT_ID,
      });
      setSignClient(signClient);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!signClient) {
      createClient();
    }
  }, [signClient]);

  return (
    <div className="App">
      <h1>Sign v2 Standalone</h1>
    </div>
  );
}

export default App;
