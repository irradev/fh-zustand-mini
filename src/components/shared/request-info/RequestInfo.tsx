import React, { useEffect, useState } from 'react';
import { tesloApi } from '../../../api/tesloApi';

export const RequestInfo = () => {
  const [Info, setInfo] = useState<unknown>();

  useEffect(() => {
    tesloApi
      .get('/auth/private')
      .then((resp) => setInfo(resp.data))
      .catch(() => setInfo('Error'));
  }, []);

  return (
    <>
      <h2>Información</h2>
      <pre>{JSON.stringify(Info, null, 2)}</pre>
    </>
  );
};
