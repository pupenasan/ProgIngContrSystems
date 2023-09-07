

```js
import React, {useState, useEffect} from 'https://cdn.skypack.dev/react';
import { QrReader } from 'https://cdn.skypack.dev/react-qr-reader';
    import ReactDOM from 'https://cdn.skypack.dev/react-dom';
    import { Button, Container } from 'https://cdn.skypack.dev/@material-ui/core';
    const MyCustomComponent = ({data, updateData, trigerParent}) => {
      const [isFrontCamera, setFrontCamera] = useState(true);
             const handleClick = (e) => {
          switch (e.detail) {
            case 1:
              console.log("click");
              break;
            case 2:
              setFrontCamera((prevState) => !prevState);
              break;
      }
   };
      const modeEnvironment = {
       facingMode: 'environment'
      };
      const modeUser = {
       facingMode: 'user'
      };

      
     return (
       <div onClick={handleClick} key={isFrontCamera ? modeEnvironment : modeUser}>
      <QrReader
        constraints={isFrontCamera ? modeEnvironment : modeUser}
        onResult={(result, error) => {
          if (!!result) {
            trigerParent(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}

      />
         </div>
        )
    }

    const ConnectedComponent = Tooljet.connectComponent(MyCustomComponent);
    ReactDOM.render(<ConnectedComponent />, document.body);
```



```js
import React, {useState, useEffect} from 'https://cdn.skypack.dev/react';
import { QrReader } from 'https://cdn.skypack.dev/react-qr-reader';
    import ReactDOM from 'https://cdn.skypack.dev/react-dom';
    import { Button, Container } from 'https://cdn.skypack.dev/@material-ui/core';
    const MyCustomComponent = ({data, updateData, trigerParent}) => {
      const [qrCode, setQrCode] = useState("");
      const [isFrontCamera, setFrontCamera] = useState(true);
      
      useEffect(() => {
        if(qrCode.length !== 0) {
            trigerParent(qrCode);
        }
      }, [qrCode]);
      
         const handleClick = (e) => {
          switch (e.detail) {
            case 1:
              console.log("click");
              break;
            case 2:
              setFrontCamera((prevState) => !prevState);
              break;
      }
   };
      const modeEnvironment = {
       facingMode: 'environment'
      };
      const modeUser = {
       facingMode: 'user'
      };

      
     return (
       <div onClick={handleClick} key={isFrontCamera ? modeEnvironment : modeUser}>
      <QrReader
        constraints={isFrontCamera ? modeEnvironment : modeUser}
        onResult={(result, error) => {
          if (!!result) {
            setQrCode(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}

      />
         </div>
        )
    }

    const ConnectedComponent = Tooljet.connectComponent(MyCustomComponent);
    ReactDOM.render(<ConnectedComponent />, document.body);
```

