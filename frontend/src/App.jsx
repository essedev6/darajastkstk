import React, { useState } from "react";

function App() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("UMESKIA PAY");
  const [response, setResponse] = useState("");

  const API_BASE = "http://localhost:5000"; // your backend address

  // Test Home API (optional)
  const testHome = async () => {
    try {
      const res = await fetch(`${API_BASE}/`);
      const data = await res.text();
      setResponse(data);
    } catch (err) {
      setResponse("❌ Error: " + err.message);
    }
  };

  // Get Access Token
  const getAccessToken = async () => {
    try {
      await fetch(`${API_BASE}/stkpush`); // No /api prefix anymore
      await fetch(`${API_BASE}/stkpush`); // optional, only if your backend exposes /api/access_token
      setResponse("STK Push endpoint ready. Use the STK Push form below.");
    } catch (err) {
      setResponse("❌ Error: " + err.message);
    }
  };

  // Send STK Push
  const sendStkPush = async () => {
    try {
      const res = await fetch(`${API_BASE}/stkpush`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount, accountNumber }),
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse("❌ Error: " + err.message);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 600, margin: "2rem auto" }}>
      <h1>🌍 Mpesa Daraja API Frontend Tester</h1>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={testHome}>Test Home API</button>{" "}
        <button onClick={getAccessToken}>Get Access Token</button>
      </div>

      <h2>STK Push Test</h2>
      <input
        type="text"
        placeholder="Phone Number (07...)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Account Reference"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      <br />
      <button onClick={sendStkPush}>Send STK Push</button>

      <h3>📜 Response:</h3>
      <pre style={{ background: "#f4f4f4", padding: "1rem" }}>
        {response || "No response yet"}
      </pre>
    </div>
  );
}

export default App;

