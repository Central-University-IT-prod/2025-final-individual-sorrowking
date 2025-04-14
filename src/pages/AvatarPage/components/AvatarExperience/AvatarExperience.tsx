import { Backdrop, Environment, OrbitControls, SoftShadows } from '@react-three/drei'
import Avatar from '../Avatar'


const Experience = () => {

  return (
    <>
      <OrbitControls 
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 5}
        maxAzimuthAngle={Math.PI / 5}
        minDistance={3}  
        maxDistance={8}
        enablePan={false} 
      />
      <Environment preset="sunset" environmentIntensity={0.3} />
      <Backdrop scale={[50, 10, 5]} floor={1.5} receiveShadow position-z={-5}>
        <meshStandardMaterial color="#FFA577" />
      </Backdrop>

      <SoftShadows size={52} samples={16} />  {/* можно убрать если будет подлагивать*/}
      <directionalLight 
        position={[5, 5, 5]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-5, 5, 5]} intensity={0.7} />
      <directionalLight position={[1, 0.1, -5]} intensity={3} color={"red"}/>
      <directionalLight position={[-1, 0.1, -5]} intensity={8} color={"blue"}/>

      <Avatar />
    </>
  )
}

export default Experience