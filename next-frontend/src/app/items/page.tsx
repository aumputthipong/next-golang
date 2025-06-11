'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

type Item = {
  id: number;
  name: string;
};

const Page = () => {
  const [items, setItems] = React.useState<Item[]>([]);

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
    </Box>
  );
};

export default Page;
