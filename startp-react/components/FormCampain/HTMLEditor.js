import React, { useRef, useEffect, useState } from "react";
import SunEditor,{buttonList} from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File


function HTMLEditor(props) {
    
    const editorRef = useRef()



    const handleChange = (content) => {
        props.onSelectHTML(editorRef.current.editor.getContents())
        

    }
    return (
        <div>
        <SunEditor
          onKeyUp={handleChange}
          ref={editorRef}
          setOptions={{
            height: 600,
            buttonList: buttonList.complex,
            }}      
          />

    </div>
    );
  }
  
  export default HTMLEditor;