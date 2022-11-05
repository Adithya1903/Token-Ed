import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import axios from "axios";

export default function Login() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();

  async function handleAuth() {
    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });

    // api req to request-message
    const userData = { address: account, chain: chain.id, network: "evm" };
    const { data } = await axios.post("/api/auth/request-message", userData, {
      headers: {
        "content-type": "application/json",
      },
    });
    const message = data.message;

    // api req to nextauth
    const signature = await signMessageAsync({ message });
    console.log(signature);
    const { url } = await signIn("credentials", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/",
    });
    // await push(url);
  }

  return <button onClick={handleAuth}>Login</button>;
}
