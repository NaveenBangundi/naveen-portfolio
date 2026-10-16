// Interactive 3D Perspective Tilt Effect
export function attachTilt(node, maxTilt = 12) {
  if (!node) return () => {};

  let rect = null;

  const onMouseEnter = () => {
    rect = node.getBoundingClientRect();
  };

  const onMouseMove = (e) => {
    if (!rect) rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    node.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const onMouseLeave = () => {
    node.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    rect = null;
  };

  node.addEventListener('mouseenter', onMouseEnter);
  node.addEventListener('mousemove', onMouseMove);
  node.addEventListener('mouseleave', onMouseLeave);

  return () => {
    node.removeEventListener('mouseenter', onMouseEnter);
    node.removeEventListener('mousemove', onMouseMove);
    node.removeEventListener('mouseleave', onMouseLeave);
  };
}
