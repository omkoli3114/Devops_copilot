import React, { useState, useEffect } from 'react';
import './App.css';

function TypingHeading({ text, speed = 100 }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <h1 className="text-4xl md:text-5xl font-extrabold text-center animate-fade-in-up leading-tight">
      {displayedText}
      <span className="border-r-2 border-white animate-pulse ml-1"></span>
    </h1>
  );
}

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      {/* Left Pane */}
      <div className="left-pane w-full md:w-1/2 flex flex-col justify-center p-10">
  {!submitted && (
    <>
      <h2 className="text-3xl font-bold mb-4 text-left">Build Infra With Natural Language</h2>
      <p className="text-base mb-6 max-w-md text-left animate-fade-in-up">
        DevOps Copilot converts your infrastructure requests, like “Deploy an EKS cluster with an RDS database and private S3 bucket” into production-ready Terraform, Pulumi, or Helm templates.
        <br /><br />
        Spend less time fighting YAML and more time shipping. Whether you're a solo dev or a large team, Copilot helps automate your cloud provisioning reliably and scalably.
      </p>

            {/* Notify Button */}
            {!showForm && (
              <div className="w-full flex justify-center">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all animate-fade-in-up"
                >
                  Notify Me
                </button>
              </div>
            )}
          </>
        )}

        {/* Thank You */}
        {submitted && (
          <div className="animate-fade-in-up text-left">
            <div className="text-green-600 text-5xl mb-4">✔</div>
            <h2 className="text-2xl font-semibold text-blue-900">Thanks for joining the waitlist!</h2>
          </div>
        )}
      </div>

      {/* Right Pane */}
      <div className="right-pane w-full md:w-1/2 flex flex-col justify-center items-center p-10 text-center">
        <TypingHeading text="Infra-as-Code Copilot" />
        <p className="text-lg mt-4 text-blue-100 animate-fade-in-up">
          🚀 Coming Soon — Join our early access waitlist
        </p>
      </div>

      {/* Modal Form */}
      {showForm && !submitted && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 modal-backdrop backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="bg-white text-black rounded-xl shadow-xl p-6 w-full max-w-md z-10 animate-fade-in-up">
            <h2 className="text-xl font-semibold mb-4 text-center">Join the Waitlist</h2>
            <form
              action="https://formspree.io/f/xvgrnake"
              method="POST"
              onSubmit={() => setSubmitted(true)}
              className="flex flex-col gap-4"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
