## Attrs

Demo:

```tsx
import React, { useCallback, useState } from 'react';
import styled from 'tcij';

const Container = styled.div.attrs((props: { name: string }) => {
  return {
    dataSet: props.name,
  };
})`
  color: yellow;
`;

export default () => {
  const [state, setState] = useState('zwkang');

  const handleUserChange = useCallback((e) => {
    setState(e.target.value);
  }, []);
  return (
    <Container name={state}>
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
