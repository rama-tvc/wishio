"use client"
import { useParams } from 'next/navigation';
import React from 'react';
function ListPage() {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <h1>Страница для ID: {id}</h1>
    </div>
  );
}
export default ListPage;
