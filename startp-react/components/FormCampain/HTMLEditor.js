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
            height: 1000,
            buttonList:// You can specify the arrangement of buttons according to the screen size in advance.
            // Responsive settings start with a percent sign.("%").
            // %510(Number based on "px")
            [
              // Default
              ['undo', 'redo'],
              ['font', 'fontSize', 'formatBlock'],
              ['blockquote'],
              ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
              ['fontColor', 'hiliteColor', 'textStyle'],
              ['outdent', 'indent'],
              ['align', 'horizontalRule', 'list', 'lineHeight'],
              ['table', 'link', 'image', 'video'],
              // (min-width:992px)
              ['%992', [
                  ['undo', 'redo'],
                  [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'blockquote'],
                  ['bold', 'underline', 'italic', 'strike'],
                  [':t-More Text-default.more_text', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
                  ['outdent', 'indent'],
                  ['align', 'horizontalRule', 'list', 'lineHeight'],
                  ['-right', ':r-More Insert-default.more_plus', 'table', 'link', 'image', 'video']
              ]],
              // (min-width:768px)
              ['%768', [
                  ['undo', 'redo'],
                  [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'blockquote'],
                  [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
                  [':e-More Line-default.more_horizontal', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'lineHeight'],
                  [':r-More Insert-default.more_plus', 'table', 'link', 'image', 'video'],
              ]]
            ],
            }}      
          />

    </div>
    );
  }
  
  export default HTMLEditor;