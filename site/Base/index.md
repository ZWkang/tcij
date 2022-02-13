## Base

Demo:

```tsx
import React, { useCallback, useState } from 'react';
import styled from 'tcij';

const Container = styled.div`
  width: 300px;
  height: 300px;
  background-color: red;
  ${(props: { userName: string }) => {
    if (props.userName === 'zwkang') {
      return `background-color: yellow`;
    }
    return ``;
  }}
`;

export default () => {
  const [state, setState] = useState('zwkang');

  const handleUserChange = useCallback((e) => {
    setState(e.target.value);
  }, []);
  return (
    <Container userName={state}>
      <input
        onChange={handleUserChange}
        value={state}
        placeholder="请输入用户名字"
      />
      <h1>{state}</h1>
    </Container>
  );
};
```
