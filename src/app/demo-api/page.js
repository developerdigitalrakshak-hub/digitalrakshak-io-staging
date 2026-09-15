'use client';

import { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Sidebar from './components/Sidebar';
import ApiHeader from './components/ApiHeader';
import SchemaViewer from './components/SchemaViewer';
import LanguageSelector from './components/LanguageSelector';
import CodeBlock from './components/CodeBlock';
import ResponseViewer from './components/ResponseViewer';
import SandboxModal from './components/SandboxModal';
import styles from './styles/demoApi.module.scss';

// Import static API documentation data from JSON file
// In the future, this static import can easily be replaced by an API fetch call:
// const res = await fetch('/api/v1/docs/geo-fencing'); const apiData = await res.json();
import initialApiData from './data/apiData.json';

export default function DemoApiPage() {
  // State for API documentation data (prepared for future API fetch replacement)
  const [apiData, setApiData] = useState(initialApiData);
  const [activeEndpoint, setActiveEndpoint] = useState('geo-fencing-s');
  const [activeLang, setActiveLang] = useState('curl');
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);

  // Future API fetch hook placeholder:
  /*
  useEffect(() => {
    async function fetchApiDocs() {
      try {
        const res = await fetch('/api/endpoint-doc-url');
        const data = await res.json();
        setApiData(data);
      } catch (err) {
        console.error('Failed to fetch API docs data:', err);
      }
    }
    fetchApiDocs();
  }, []);
  */

  if (!apiData) return null;

  const currentCodeSnippet =
    apiData.codeSamples && apiData.codeSamples[activeLang]
      ? apiData.codeSamples[activeLang]
      : apiData.codeSamples?.curl || '';

  return (
    <div className={styles.pageContainer}>
      {/* Ambient Particle Starfield Background */}
      <ParticleBackground />

      <div className={styles.mainLayout}>
        {/* Left Sidebar Navigation */}
        <Sidebar
          data={apiData}
          activeEndpoint={activeEndpoint}
          onSelectEndpoint={(id) => setActiveEndpoint(id)}
        />

        {/* Center/Right Documentation Area */}
        <main className={styles.contentArea}>
          {/* Header with Title, Method Badge, Endpoint URL & Test in Sandbox button */}
          <ApiHeader
            data={apiData}
            onOpenSandbox={() => setIsSandboxOpen(true)}
          />

          {/* Split View: Left = Documentation Schema, Right = Code Samples & Responses */}
          <div className={styles.gridSplit}>
            {/* Left Column: Request & Response Parameter Schemas */}
            <div className={styles.docLeftColumn}>
              <SchemaViewer data={apiData} />
            </div>

            {/* Right Column: Code Generator & Response Samples */}
            <div className={styles.docRightColumn}>
              {/* Language Switcher Tabs */}
              <LanguageSelector
                languages={apiData.codeLanguages}
                activeLang={activeLang}
                onSelectLang={(langId) => setActiveLang(langId)}
              />

              {/* Dynamic Code Sample Card */}
              <CodeBlock
                title="Request Sample"
                code={currentCodeSnippet}
                language={activeLang}
              />

              {/* Interactive Response Sample & Status Selector */}
              <ResponseViewer statusCodes={apiData.statusCodes} />
            </div>
          </div>
        </main>
      </div>

      {/* Interactive Sandbox Testing Drawer Modal */}
      <SandboxModal
        data={apiData}
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />
    </div>
  );
}
