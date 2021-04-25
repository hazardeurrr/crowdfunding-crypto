import React, { useRef, useEffect, useState } from "react";
import SunEditor,{buttonList} from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File


function HTMLEditor() {
    const [text, setText] = useState(null);
    const editorRef = useRef();


    const handleChange = (content) => {
        console.log(content)
        setText(content)    
    }
    const handleKeyDown = (content) => {
        console.log(content)
    }
    return (
        <div>
        <SunEditor
          onchange={handleChange}
          onKeyDown={handleKeyDown}
        />
    </div>
    );
  }
  
  export default HTMLEditor;