import React, { useState, useContext, useEffect, useRef } from "react";
import DashboardLayout from "./DashboardLayout";
import "./testarea.scss";
import axios from "axios";
import ScrollToBottom from "react-scroll-to-bottom";
import TestContext from '../../context/testcontext/TestContext'



const Testarea = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesEndRef = useRef(null);
  const [testTaken, setTestTaken] = useState(false); // Initialize testTaken state
  const { score, updateScore ,updateTestTaken} = useContext(TestContext);

  useEffect(() => {
    console.log("Score is: ", score);
  }, [score]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/skills/fetch/questions",
          {
            withCredentials: true,
          }
        );
        setQuestions(response.data.questions);
        if (response.data.questions.length > 0) {
          setMessages([
            { sender: "ChatGPT", message: response.data.questions[0] },
          ]);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "You", message: inputText },
    ]);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/skills/analyze-answer",
        {
          answer: inputText,
          question: questions[currentQuestionIndex],
        },
        {
          withCredentials: true,
        }
      );
      const feedback = response.data.feedback;

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ChatGPT", message: feedback },
      ]);
      if (
        feedback.toLowerCase().includes("correct") &&
        !feedback.toLowerCase().includes("incorrect")
      ) {
        // setScore((prevScore) => prevScore + 1);
        updateScore(score + 1);
      }

      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

      if (currentQuestionIndex + 1 < questions.length) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "ChatGPT", message: questions[currentQuestionIndex + 1] },
        ]);
      } else {
        // All questions have been answered, display "Thank you" message
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "ChatGPT", message: "Thank you!" },
        ]);
        updateTestTaken(true);
      }
    } catch (error) {
      console.error("Error analyzing answer:", error);
    }

    setInputText("");
    scrollToBottom(); // Scroll to bottom after adding ChatGPT message
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <DashboardLayout>
      <div className="chat-container">
        {currentQuestionIndex < questions.length ? ( // Render conversation window if all questions are not displayed
          <ScrollToBottom
            className="conversation"
            style={{ overflow: "hidden", width: "100%" }}
          >
            <div className="conversationwindow">
              {messages.map((msg, index) => (
                <div className="message" key={index}>
                  <strong>{msg.sender}:</strong>{" "}
                  <pre className="formatted-message">{msg.message}</pre>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollToBottom>
        ) : null}{" "}
        {/* Close the ternary operator */}
        <div className="input-container">
          <textarea
            className="input-box"
            placeholder="Type your answer..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button className="send-button" onClick={sendMessage}>
            Submit
          </button>
        </div>
        {currentQuestionIndex >= questions.length && (
          <div className="thank-you-banner">
            <h1>Thank You!</h1>
            <h1>You will hear from us!</h1>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Testarea;
