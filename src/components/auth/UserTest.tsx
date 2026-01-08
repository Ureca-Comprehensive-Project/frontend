'use client';
import api from '@/lib/axios';
import { useState } from 'react';

const UserTest = () => {
  const [adata, setDate] = useState(null);
  const click = async () => {
    const data = await api.get('/api/v1/users/1');
    setDate(data.data);
  };

  return (
    <div>
      <button onClick={click}>User</button>
      <br />
      <span>{JSON.stringify(adata)}</span>
    </div>
  );
};

export default UserTest;
