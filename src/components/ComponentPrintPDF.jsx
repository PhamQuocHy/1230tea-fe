import "moment/locale/vi";
import React from "react";
import parse from 'html-react-parser';
import '../App.css'
class ComponentPrintPDF extends React.PureComponent {
  render() {
    const html = this.props.html;
    return (
      typeof html === 'string' ?
        parse(`<body>
          ${html}
        </body>`)
        :
        <body>
          {html.map((item) => {
            return (
              <div className="pagebreak">
                {parse(
                  `<body>
                 ${item}
               </body>`)
                }
              </div>
            )
          })}
        </body>
    );
  }
}
export default ComponentPrintPDF;
