import React from 'react';
import { Canvas } from '@react-three/fiber';
import { CustomizationSidebar } from './modules';
import styles from './AvatarPage.module.scss';
import AvatarExperience from './components/AvatarExperience';

const AvatarPage: React.FC = () => {

  return (
    <div className={styles.avatar}>
      <CustomizationSidebar />
      <div className={styles.avatar__canvas}>
        <Canvas
          camera={{
            position: [-1, 1, 5],
            fov: 45,
          }}
          shadows
        >
          <color attach="background" args={['#555']} />
          <fog attach="fog" args={['#555', 15, 25]} />
          <group position-y={-1}>
            <AvatarExperience />
          </group>
        </Canvas>
      </div>

    </div>
  );
};

export default AvatarPage;