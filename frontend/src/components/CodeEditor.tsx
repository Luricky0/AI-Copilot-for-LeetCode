import React, { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faLightbulb, faRobot } from '@fortawesome/free-solid-svg-icons'
const CodeLangMap: Record<number, string> = {
  0: 'cpp',
  1: 'java',
  2: 'python',
  3: 'python',
  4: 'c',
  5: 'csharp',
  6: 'javascript',
  7: 'typescript',
}
const CodeLangNum: Record<string, number> = {
  'C++': 0,
  Java: 1,
  Python: 2,
  Python3: 3,
  C: 4,
  'C#': 5,
  JavaScript: 6,
  TypeScript: 7,
}
const CodeEditor = ({
  codeSnippets,
}: {
  codeSnippets: { lang: string; code: string }[]
}) => {
  const [lang, setLang] = useState(0)
  const [code, setCode] = useState(codeSnippets[lang]?.code || '')
  useEffect(() => {
    setCode(codeSnippets[lang]?.code || '')
  }, [lang, codeSnippets])
  return (
    <div className="h-screen rounded-lg px-4 border-2 bg-white h-scrren">
      <h2 className="my-2 font-bold">Code</h2>
      <div className="flex flex-col h-[94vh]">
        <div className="h-16 flex justify-between items-center">
          <select
            id="lang-select"
            value={lang}
            onChange={(e) => {
              console.log(Number(e.target.value))
              setLang(Number(e.target.value))
            }}
            className="border rounded px-2 py-1">
            {Object.entries(CodeLangMap).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          <div className="flex flex-row-reverse gap-2 px-2">
            <FontAwesomeIcon icon={faRobot}  size='2x'/>
            <FontAwesomeIcon icon={faLightbulb}  size='2x'/>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <Editor
            height="100%"
            language={CodeLangMap[lang]}
            value={code}
            onChange={(val) => setCode(val || '')}
            theme="vs-light"
          />
        </div>
      </div>
    </div>
  )
}

export default CodeEditor
