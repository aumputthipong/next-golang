// app/items/[id]/page.tsx
import { notFound } from 'next/navigation';

async function getItem(id: string) {
  const res = await fetch(`http://localhost:3000/api/items/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function ItemDetailPage({ params }: { params: { id: string } }) {
  const item = await getItem(params.id);
  if (!item) return notFound();

  return (
    <div>
      <h1>{item.name}</h1>
      <p>ID: {params.id}</p>
      <a href={`/items/${params.id}/edit`}>Edit</a>
    </div>
  );
}
