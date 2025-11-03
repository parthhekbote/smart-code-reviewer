import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [ count, setCount ] = useState(0)
  const [code, setCode] = useState('');
  const [review, setReview] = useState(``);
  const [isReviewing, setIsReviewing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setIsReviewing(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code });
      setReview(response.data);
    } catch (err) {
      setError(err.message);
      setReview('Failed to get review. Please try again.');
    } finally {
      setIsReviewing(false);
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            {(!code || code.trim() === '') && (
              <div className="placeholder">paste/type your code here</div>
            )}
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <button
            onClick={reviewCode}
            className="review"
            disabled={isReviewing}>
            {isReviewing ? 'Reviewing...' : 'Review'}
          </button>
        </div>
        <div className="right">
          {error && <div className="error">{error}</div>}
          <Markdown
            rehypePlugins={[rehypeHighlight]}
          >{isReviewing ? 'Your code review appears here' : (review || 'Your code review appears here')}</Markdown>
        </div>
      </main>
    </>
  )
}



export default App