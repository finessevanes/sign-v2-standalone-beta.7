import { useState, useEffect } from "react";
import { SignClient } from "@walletconnect/sign-client";
import { Web3Modal } from "@web3modal/standalone";
import "./App.css";

const web3Modal = new Web3Modal({
  projectId: process.env.REACT_APP_PROJECT_ID,
  standaloneChains: ["eip155:5"],
});

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

  async function handleConnect() {
    if (!signClient) throw Error("Client is not set");
    try {
      const proposalNamespace = {
        eip155: {
          methods: ["eth_sendTransaction"],
          chains: ["eip155:5"],
          events: ["connect", "disconnect"],
        },
      };

      const { uri } = await signClient.connect({
        requiredNamespaces: proposalNamespace,
      });

      if (uri) {
        web3Modal.openModal({ uri });
      }
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
      <button onClick={handleConnect} disabled={!signClient}>
        Connect
      </button>
    </div>
  );
}

export default App;
