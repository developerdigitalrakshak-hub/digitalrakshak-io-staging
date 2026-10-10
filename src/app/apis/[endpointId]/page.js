'use client';

import { useState, use } from 'react';
import { useRegisterModal } from '@/context/RegisterModalContext';
import ApiHeader from '../components/ApiHeader';
import SchemaViewer from '../components/SchemaViewer';
import LanguageSelector from '../components/LanguageSelector';
import CodeBlock from '../components/CodeBlock';
import ResponseViewer from '../components/ResponseViewer';
import SandboxModal from '../components/SandboxModal';
import styles from '../styles/apiDocs.module.scss';
import initialApiData from '../data/apiData.json';

export default function ApiEndpointPage({ params }) {
  const resolvedParams = use ? use(params) : params;
  const endpointId = resolvedParams?.endpointId || 'oauth-token';

  const [activeLang, setActiveLang] = useState('curl');
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const { openRegisterModal } = useRegisterModal();

  const currentEndpointData =
    initialApiData.endpoints && initialApiData.endpoints[endpointId]
      ? initialApiData.endpoints[endpointId]
      : initialApiData.endpoints['oauth-token'];

  const currentCodeSnippet =
    currentEndpointData.codeSamples && currentEndpointData.codeSamples[activeLang]
      ? currentEndpointData.codeSamples[activeLang]
      : currentEndpointData.codeSamples?.curl || '';

  return (
    <>
      {/* Header with Title, Method Badge, Endpoint URL & Test in Sandbox button */}
      <ApiHeader
        data={currentEndpointData}
        onOpenSandbox={openRegisterModal}
      />

      {/* Split View: Left = Documentation Schema, Right = Code Samples & Responses */}
      <div className={styles.gridSplit}>
        {/* Left Column: Request & Response Parameter Schemas */}
        <div className={styles.docLeftColumn}>
          <SchemaViewer data={currentEndpointData} />
        </div>

        {/* Right Column: Code Generator & Response Samples */}
        <div className={styles.docRightColumn}>
          {/* Language Switcher Tabs */}
          <LanguageSelector
            languages={currentEndpointData.codeLanguages || []}
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
          <ResponseViewer statusCodes={currentEndpointData.statusCodes || []} />
        </div>
      </div>

      {/* Interactive Sandbox Testing Drawer Modal */}
      <SandboxModal
        data={currentEndpointData}
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />
    </>
  );
}
