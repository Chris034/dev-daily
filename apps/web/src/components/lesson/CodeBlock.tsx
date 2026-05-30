import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { json } from '@codemirror/lang-json';

type CodeBlockProps = {
  code: string;
  editable?: boolean;
  language?: 'json' | 'javascript' | 'typescript';
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, editable = false, language = 'javascript' }) => {
  const extensions = [EditorView.lineWrapping];

  if (language === 'json') {
    extensions.push(json());
  }

  return (
    <div className="code-block">
      <CodeMirror
        value={code}
        height="auto"
        editable={editable}
        extensions={extensions}
      />
    </div>
  );
};

export default CodeBlock;