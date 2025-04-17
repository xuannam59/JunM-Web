// src/pages/Home.tsx
import React from 'react';
import { Button, Card } from 'antd';
import { useTheme } from '@/utils/ThemeProvider';

const Home: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="w-full min-h-[100vh] flex justify-center items-center">
      <div className="">
        <h1>Trang chủ</h1>
        <Button type="primary" onClick={toggleTheme}>
          Chuyển đổi {darkMode ? 'Sáng' : 'Tối'}
        </Button>
        <p>Đây là nội dung trang chủ.</p>
      </div>
    </div>
  );
};

export default Home;