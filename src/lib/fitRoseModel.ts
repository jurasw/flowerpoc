import { Box3, Group, Vector3 } from 'three'

interface ViewportSize {
  width: number
  height: number
}

interface RoseFrameOptions {
  fillRatio: number
  verticalFocus: number
}

export function fitRoseModelToViewport(
  scene: Group,
  group: Group,
  viewport: ViewportSize,
  options: RoseFrameOptions,
) {
  scene.position.set(0, 0, 0)
  scene.rotation.set(0, 0, 0)
  scene.scale.set(1, 1, 1)
  scene.updateMatrixWorld(true)

  const box = new Box3().setFromObject(scene)
  const size = box.getSize(new Vector3())
  const center = box.getCenter(new Vector3())
  const focusY = box.min.y + size.y * options.verticalFocus

  scene.position.set(-center.x, -focusY, -center.z)

  const horizontalSize = Math.max(size.x, size.z)
  if (horizontalSize <= 0 || size.y <= 0) {
    return
  }

  const fitHorizontal = (viewport.width * options.fillRatio) / horizontalSize
  const fitVertical = (viewport.height * options.fillRatio) / size.y
  group.scale.setScalar(Math.min(fitHorizontal, fitVertical))
}

export function resetRoseModelTransform(scene: Group, group: Group) {
  scene.position.set(0, 0, 0)
  scene.rotation.set(0, 0, 0)
  scene.scale.set(1, 1, 1)
  group.scale.setScalar(1)
}
