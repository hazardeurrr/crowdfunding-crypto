import React, { useRef, useEffect, useState } from "react";
import SunEditor,{buttonList} from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File


function HTMLEditor(props) {
    
    const [text, setText] = useState(null);
    const editorRef = useRef()

    const handleChange = ({onSelectHTML}) => {
        console.log(content)
        setText(content)    
    }

    const handleKeyDown = (content) => {
        console.log(editorRef.current.editor.getContents())
        console.log(editorRef.current.editor.getFilesInfo())
        console.log(editorRef.current.editor.getImagesInfo())
        props.onSelectHTML(editorRef.current.editor.getContents())
        

    }
    return (
        <div>
        <SunEditor
          autoFocus={true}
          onchange={handleChange}
          onKeyUp={handleKeyDown}
          ref={editorRef}
          setOptions={{
            height: 600,
            buttonList: buttonList.complex
            }}      
          />

    </div>
    );
  }
  
  export default HTMLEditor;