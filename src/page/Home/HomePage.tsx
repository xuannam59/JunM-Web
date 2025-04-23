// src/pages/Home.tsx
import React from 'react';
import { Button, Card } from 'antd';
import { useTheme } from '@/utils/ThemeProvider';
import { useSearchParams } from 'react-router-dom';

const Home: React.FC = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <>
            <div className="">
                <div>
                    <h1>Trang chủ</h1>
                    <Button type="primary" onClick={toggleTheme}>
                        Chuyển đổi {darkMode ? 'Sáng' : 'Tối'}
                    </Button>
                    <p>Đây là nội dung trang chủ.</p>
                </div>
            </div>
        </>
    );
};

export default Home;