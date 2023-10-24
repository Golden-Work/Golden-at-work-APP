import React, { useState, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ItemCard from './ItemCard';

interface Item {
  name: string;
  img: string;
  description: string;
}

interface ItemListProps {
  items: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleLeftIconClick = () => {
    if (containerRef.current) {
      setScrollLeft(Math.max(scrollLeft - 300, 0));
    }
  };

  const handleRightIconClick = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const scrollWidth = containerRef.current.scrollWidth;
      setScrollLeft(Math.min(scrollLeft + 300, scrollWidth - containerWidth));
    }
  };
  const iconButtonStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    
    '&:active': {
        color: 'purple',
      },
  };
  return (
    <Box
      className="item-list-container"
      sx={{
        position: 'relative',
        width: '100%',
        overflowX: 'hidden',
        
      }}
    >
      <Box
        className="item-list"
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 1,
          '& > *': {
            marginRight: 7,
          },
          
          transform: `translateX(${-scrollLeft}px)`,
          transition: 'transform 0.3s ease-in-out',
        }}
        ref={containerRef}
      >
        {items.map((item, index) => (
          <ItemCard key={index} name={item.name} img={item.img} description={item.description} />
        ))}
      </Box>
      <IconButton
        sx={{
          ...iconButtonStyles,
          left: 0,
          
        }}
        onClick={handleLeftIconClick}
      >
        <ChevronLeftIcon sx={{fontSize: 40}}/>
      </IconButton>

      <IconButton
        sx={{
          ...iconButtonStyles,
          right: 0,
        }}
        onClick={handleRightIconClick}
      >
        <ChevronRightIcon sx={{fontSize: 40}}/>
      </IconButton>
    </Box>
  );
};

export default ItemList;
