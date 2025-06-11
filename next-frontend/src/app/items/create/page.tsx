// app/items/new/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateItemPage() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    router.push('/items');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create New Item</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Item name" />
      <button type="submit">Create</button>
    </form>
  );
}
