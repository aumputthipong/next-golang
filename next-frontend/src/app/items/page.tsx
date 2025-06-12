'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

type Item = {
  id: number;
  name: string;
};

const Page = () => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [timeLeft, setTimeLeft] =useState<number | null>(null);;
  const [active, setActive] =  useState(false);

  const startDeal = () => {
    setTimeLeft(5 * 60); // 5 นาที (300 วินาที)
    setActive(true);
  };
  
  useEffect(() => {
    if (!active || timeLeft === null) return;

    if (timeLeft <= 0) {
      setActive(false);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(interval);
  }, [active, timeLeft]);


  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    fetch('/api/items')
      .then((res) => res.json())
      .then(setItems);
  }, []);

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Item List
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        href="/items/new" 
        sx={{ marginBottom: 2 }}
        component={Link} // ใช้ Next.js Link
      >
        Create New Item
      </Button>
      <List>
        {items.map((item) => (
          <ListItem 
            key={item.id} 
            divider 
            component={Link} 
            href={`/items/${item.id}`}
            sx={{ borderRadius: 1 }}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      <div>
               {active && timeLeft !== null && (
        <h2>⏳ Time left: {formatTime(timeLeft)}</h2>
      )}

      {!active && timeLeft === 0 && <h2>❌ Deal expired</h2>}
        <Button
          variant="outlined" onClick={startDeal} disabled={active}>
            Deal
          </Button>
       
      </div>
    </Box>
  );
};

export default Page;
