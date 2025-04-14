import { useGLTF } from "@react-three/drei"
import React, { useEffect, useMemo } from "react";
import { BufferGeometry, Material, Mesh, Skeleton } from "three"

interface AssetProps {
  url: string;
  color?: string;
  skeleton: Skeleton
}

const Asset: React.FC<AssetProps> = ({
  url, color, skeleton
}) => {
  const {scene} = useGLTF(`/assets/models/${url}.glb`);
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        if (child.material?.name.includes("Color_")) {
          child.material.color.set(color);
        }
      }
    })
  }, [color, scene])
  const attachedItems = useMemo(() => {
    const items: Array<{
      geometry: BufferGeometry;
      material: Material | Material[];
    }> = [];
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        items.push({
          geometry: child.geometry,
          material: child.material,

        })
      }
    })
    return items;
  }, [scene])

  return attachedItems.map((item, index) => (
    <skinnedMesh
      key={index}
      skeleton={skeleton}
      geometry={item.geometry}
      material={item.material}
      castShadow
      receiveShadow
    />
  ))
}

export default Asset