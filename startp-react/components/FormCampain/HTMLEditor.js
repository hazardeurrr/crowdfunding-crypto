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
            videoResizing: false,
            videoHeightShow: false,
            videoRatioShow: false,
            height: 500,
            imageWidth: "50%",
            videoWidth:"50%",
            buttonList:// You can specify the arrangement of buttons according to the screen size in advance.
            // Responsive settings start with a percent sign.("%").
            // %510(Number based on "px")
            [
              // Default
              ['undo', 'redo', 'fullScreen'],
              ['font', 'fontSize', 'formatBlock'],
              ['blockquote'],
              ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
              ['fontColor', 'hiliteColor'],
              ['outdent', 'indent'],
              ['align', 'list'],
              ['table', 'link', 'image', 'video'],
              // (min-width:992px)
              ['%992', [
                  ['undo', 'redo', 'fullScreen'],
                  [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'blockquote'],
                  ['bold', 'underline', 'italic', 'strike'],
                  [':t-More Text-default.more_text', 'subscript', 'superscript', 'fontColor', 'hiliteColor'],
                  ['outdent', 'indent'],
                  ['align', 'list'],
                  ['-right', ':r-More Insert-default.more_plus', 'table', 'link', 'image', 'video']
              ]],
              // (min-width:768px)
              ['%768', [
                  ['undo', 'redo', 'fullScreen'],
                  [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'blockquote'],
                  [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor'],
                  [':e-More Line-default.more_horizontal', 'outdent', 'indent', 'align', 'list'],
                  [':r-More Insert-default.more_plus', 'table', 'link', 'image', 'video'],
              ]]
            ],
            }}      
          />

    </div>
    );
  }
  
  export default HTMLEditor;