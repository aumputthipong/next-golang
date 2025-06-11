// app/items/[id]/edit/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditItemPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [name, setName] = useState('');

  useEffect(() => {
    fetch(`/api/items/${params.id}`)
      .then((res) => res.json())
      .then((data) => setName(data.name));
  }, [params.id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/items/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    router.push(`/items/${params.id}`);
  };

  return (
    <form onSubmit={handleUpdate}>
      <h1>Edit Item</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
}
