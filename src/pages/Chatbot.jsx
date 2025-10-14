import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const responses = {
    headache: "You can try paracetamol or ibuprofen. Drink water and rest well.",
    fever: "Paracetamol is commonly used. Please consult a doctor if the fever is persistent.",
    cold: "Antihistamines or paracetamol can help. Stay hydrated!",
    cough: "Cough syrups like Benadryl or expectorants are used. Honey and warm water also help.",
    diarrhea: "ORS, probiotics, and staying hydrated are key. Avoid spicy food.",
    allergy: "Cetirizine or loratadine are common antihistamines. See a doctor if severe.",
    pain: "Paracetamol, ibuprofen, or naproxen are usual pain relievers.",
    antibiotic: "Please consult a doctor before taking antibiotics. Self-medication can be harmful.",
    vomiting: "Domperidone or ondansetron is used, but see a doctor for persistent symptoms.",
    "period pain": "Mefenamic acid or ibuprofen helps with menstrual cramps. Hot water bags also help.",
    hi: " Hi..! how are you! how can I help you",
  
    asthma: "Inhalers like salbutamol or corticosteroids are commonly used. Avoid allergens and consult a doctor.",
    acidity: "Antacids like omeprazole or ranitidine can help. Avoid spicy foods and eat small meals.",
    hypertension: "Amlodipine, atenolol, or losartan are commonly used. Regular BP monitoring is essential.",
    diabetes: "Metformin is commonly prescribed. Maintain diet, exercise, and check blood sugar regularly.",
    constipation: "Laxatives like lactulose or isabgol help. Increase fiber and water intake.",
    depression: "SSRIs like fluoxetine or sertraline are prescribed. Please seek professional mental health support.",
    anxiety: "Medications like alprazolam or buspirone may help. Breathing exercises and therapy are also useful.",
    skinrash: "Topical creams like hydrocortisone or calamine lotion can help. Avoid irritants.",
    eyeinfection: "Antibiotic eye drops like ciprofloxacin are used. Maintain eye hygiene and consult a doctor.",
    earpain: "Analgesics like paracetamol or ear drops such as ciprofloxacin are prescribed. Seek medical help if severe.",
    cancer: "Symptoms include weight loss, fatigue, lumps, or unusual bleeding. Treatment may involve chemotherapy (cisplatin, doxorubicin), immunotherapy (nivolumab), or targeted therapy (imatinib). Early diagnosis is crucial—consult an oncologist."
  };
  

  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    for (const keyword in responses) {
      if (lowerInput.includes(keyword)) {
        return responses[keyword];
      }
    }
    return "Sorry, I don’t have information about that. Please consult a healthcare provider.";
  };

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, from: "user" };
      const botReply = { text: getBotResponse(input), from: "bot" };

      setMessages([...messages, userMessage, botReply]);
      setInput("");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto", textAlign: "center" }}>
      <h2>Welcome to Medibot</h2>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "10px",
          height: "300px",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.from === "user" ? "right" : "left" }}>
            <p
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "10px",
                backgroundColor: msg.from === "user" ? "#007bff" : "#f0f0f0",
                color: msg.from === "user" ? "white" : "black",
                margin: "5px",
              }}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about a medicine..."
        style={{
          width: "75%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={handleSend}
        style={{
          marginLeft: "10px",
          padding: "10px 15px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
};

export default Chatbot;
