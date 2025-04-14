import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/modules';
import styles from './MainLayout.module.scss';
import { UserDetailModal } from '@/modules';
import useUserStore from '@/shared/stores/userStore'
import { toast, ToastContainer } from 'react-toastify';

const MainLayout: React.FC = () => {
  const { user, updateUser } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user.firstVisit) {
      setIsModalOpen(true);
    }
  }, [user.firstVisit]);

  const handleSave = (data: {
    name: string;
    gender: 'male' | 'female' | undefined;
    height: number;
    weight: number;
    age: number;
  }) => {

    if (!data.name || !data.gender || !data.height || !data.weight || !data.age) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (data.height > 250 || data.height < 120) {
      toast.error('Пожалуйста, укажите корректный рост');
      return; 
    }

    if (data.weight > 200 || data.height < 30) {
      toast.error('Пожалуйста, укажите корректный вес');
      return; 
    }

    if (data.age > 120 || data.age < 10) {
      toast.error('Пожалуйста, укажите корректный возраст');
      return; 
    }

    updateUser({
      ...data,
      coins: user.coins
    });

    setIsModalOpen(false);
  };

  return (
    <div className={styles.fullContainer}>
      <Navbar />
      
      <main className={styles.mainContainer}>
        <Outlet />
        
        <UserDetailModal
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave} 
        />

      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
      />
    </div>
  );
};

export default MainLayout;