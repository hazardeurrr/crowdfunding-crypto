import React, { useRef, useEffect } from "react";
import SunEditor,{buttonList} from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const HTMLEditor = props => {

    return (
        <div>
            <SunEditor setOptions={{
              height: 600,
              buttonList: buttonList.complex
              }}
            />
        </div>
    );
};
export default HTMLEditor;
