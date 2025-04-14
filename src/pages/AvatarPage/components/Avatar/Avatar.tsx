import { useAnimations, useFBX, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import Asset from '../Asset'
import useUserStore from '@/shared/stores/userStore'
import { UserAvatar } from '@/shared/types/types'
import { COLOR_ITEMS_MAP } from '@/shared/constants/userCharacter'
import { SkinnedMesh } from 'three'


// костюм скрывает некоторые айтемы, поэтому фикс
const outfitLockedItems = [
  'clothes', 'hair', 'hat', 'shoes', 'earring'
]

const customizationItems: Array<keyof UserAvatar> = [
  'clothes', 
  'eyeBrow', 
  'eyes', 
  'facialHair', 
  'glasses', 
  'hat', 
  'outfit', 
  'face', 
  'hair', 
  'head', 
  'nose', 
  'shoes', 
  'earring'
]

const Avatar = (props) => {
  const group = useRef(null)
  const { nodes } = useGLTF('/assets/models/Armature.glb')
  const { animations } = useFBX('/assets/models/Idle.fbx')
  const { actions } = useAnimations(animations, group);
  const userAvatar = useUserStore((state) => state.user.avatar)
  const avatarKeys = customizationItems.filter(key => !userAvatar.outfit || !outfitLockedItems.includes(key))
  useEffect(() => {
    actions["mixamo.com"]?.play();
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          {avatarKeys.map((key) => 
            userAvatar[key] && (
              <Suspense key={`${key}-${userAvatar[key]}`}>
                <Asset 
                  url={userAvatar[key] as string}
                  color={userAvatar[COLOR_ITEMS_MAP[key]] ?? undefined}
                  skeleton={(nodes.Plane as SkinnedMesh)?.skeleton}
                />
              </Suspense>
            )
          )}
        </group>
      </group>
    </group>
  )
}

export default Avatar