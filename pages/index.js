import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const [prompt, setPrompt] = useState('');

  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log('Calling OpenAI...');
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    const { output } = data;
    console.log('OpenAI replied...', output);

    setApiOutput(`${output}`);
    setIsGenerating(false);
  };

  const onUserChangedText = (event) => {
    // console.log(event.target.value);
    setPrompt(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>Expert ChatGPT Prompts</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Unlock the Power of ChatGPT with Expert Prompts</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              Enter your basic idea, and our app will transform it into an
              optimized prompt for high-quality AI-generated content (ex. debate
              pros and cons of space travel, predict future technology trends,
              analyze a popular book).
            </h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="Start typing here to add your prompt..."
            className="prompt-box"
            value={prompt}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? 'generate-button loading' : 'generate-button'
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Generate</p>
                )}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
