// src/pages/Home.tsx
import React from 'react';
import { Button, Card } from 'antd';
import { useTheme } from '@/utils/ThemeProvider';

const Home: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Card style={{ margin: 20 }}>
      <h1>Trang chủ</h1>
      <Button type="primary" onClick={toggleTheme}>
        Chuyển đổi {darkMode ? 'Sáng' : 'Tối'}
      </Button>
      <p>Đây là nội dung trang chủ.</p>
    </Card>
  );
};

export default Home;