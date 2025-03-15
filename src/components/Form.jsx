import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

 
const Form = () => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });  
  const [context, setContext] = useState("");
  const [myResponse, setResponse] = useState("");
  const [geminiResponse, setGeminiResponse] = useState("");
  const [loading,setLoading] = useState(false)
  const handleChange1 = (e) => {
    setContext(e.target.value);
  };
  const handleChange2 = (e) => {
    setResponse(e.target.value);
  };

  const gemRun = async () => {
    try {
      setLoading(true);
      const prompt = `Yo, check this out! Given the context and response, does the response stay on track or is it spilling unnecessary tea?  
    If it's an overshare, just say: 'Woah, that's a bit much.'  
    If it's all good, just say: 'All good, carry on.'  
    Nothing extra, just vibes.  
    Context: ${context}  
    Response: ${myResponse}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setGeminiResponse(text);
      setTimeout(() => {
         setContext("");
         setResponse("");
         setGeminiResponse("");
       }, 3000);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
      
    }
  };

  const handleClick = (e) => {
    // gemini function which handles context + response
    // preventDefault stops the submission of a form so that the page wont reload and the state and api response doesnt get lost
    e.preventDefault();
    gemRun();
  };

  return (
    <div className="border border-3 border-dashed p-8 rounded-md flex flex-col items-center ">
      <form className="flex flex-col gap-5 md:gap-10 m-5 ">
        <textarea
          type="text"
          placeholder="Enter Context"
          rows="4"
          cols="50"
          className="border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          onChange={handleChange1}
          value={context}
        ></textarea>
        <textarea
          type="text"
          placeholder="Enter Your Response"
          rows="4"
          cols="50"
          className="border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          onChange={handleChange2}
          value={myResponse}
        ></textarea>
        <button
          type="submit"
          className="inline-block px-4 py-2 bg-sky-300 rounded-md cursor-pointer"
          onClick={handleClick}
          disabled={loading}
        >
          Submit
        </button>
      </form>
      {loading && context !== "" && myResponse !== "" ? (
        <p>loading....</p>
      ) : (
        <p>{geminiResponse}</p>
      )}
    </div>
  );
};

export default Form;

