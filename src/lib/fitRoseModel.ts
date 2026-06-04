import { Box3, type Group, Vector3 } from 'three'

export interface ViewportSize {
  width: number
  height: number
}

export function hasRoseViewportChangedSignificantly(
  previous: ViewportSize | null,
  next: ViewportSize,
  changeRatio = 0.06,
): boolean {
  if (!previous) {
    return true
  }

  const widthDelta = Math.abs(previous.width - next.width)
  const heightDelta = Math.abs(previous.height - next.height)
  const widthThreshold = Math.max(previous.width, next.width) * changeRatio
  const heightThreshold = Math.max(previous.height, next.height) * changeRatio

  return widthDelta > widthThreshold || heightDelta > heightThreshold
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

export function resetRoseSceneTransform(scene: Group) {
  scene.position.set(0, 0, 0)
  scene.rotation.set(0, 0, 0)
  scene.scale.set(1, 1, 1)
}
