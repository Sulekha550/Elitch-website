import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function Hero3DScene({ className = '' }) {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse coordinates with smooth damping
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left - width / 2) / (width / 2);
      const y = (e.clientY - rect.top - height / 2) / (height / 2);
      targetMouseX = x * 0.8;
      targetMouseY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 3D Nodes: Form an interconnected geodesic cluster & outer orbital data rings
    const NODE_COUNT = 42;
    const nodes = [];
    const RADIUS = Math.min(width, height) * 0.32;

    // Golden spiral on sphere surface for organic uniform distribution
    for (let i = 0; i < NODE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / NODE_COUNT);
      const theta = Math.sqrt(NODE_COUNT * Math.PI) * phi;

      // Slight natural jitter for organic research network feel
      const r = RADIUS * (0.85 + Math.random() * 0.3);
      nodes.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        baseSize: 2 + Math.random() * 2.5,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseOffset: Math.random() * Math.PI * 2,
        colorType: Math.random() > 0.3 ? 'cyan' : 'violet'
      });
    }

    // Outer orbital rings points
    const RING_POINTS = 36;
    const ringNodes = [];
    for (let i = 0; i < RING_POINTS; i++) {
      const angle = (i / RING_POINTS) * Math.PI * 2;
      ringNodes.push({
        angle,
        r: RADIUS * 1.35,
        y: (Math.sin(angle * 2) * 20)
      });
    }

    let rotX = 0.2;
    let rotY = 0;
    let rotZ = 0;
    let time = 0;

    // Resize handler
    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      time += 0.015;

      // Damped mouse tracking for silky feel
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      if (!prefersReducedMotion) {
        rotY += 0.0035;
        rotX = 0.2 + mouseY * 0.4;
        rotZ = mouseX * 0.3;
      }

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const fov = 420;

      // Rotation matrix math
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY + time * 0.15);
      const sinY = Math.sin(rotY + time * 0.15);
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);

      // Project 3D points
      const projectedNodes = nodes.map((node) => {
        // Rotate around Y
        let x1 = node.x * cosY + node.z * sinY;
        let y1 = node.y;
        let z1 = -node.x * sinY + node.z * cosY;

        // Rotate around X
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // Rotate around Z
        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2;

        // Add subtle floating breath
        y3 += Math.sin(time + node.pulseOffset) * 8;

        // Perspective projection
        const cameraDist = 480;
        const scale = fov / (cameraDist + z3);
        const projX = centerX + x3 * scale;
        const projY = centerY + y3 * scale;

        // Depth alpha: nodes closer are brighter
        const depthAlpha = Math.max(0.12, Math.min(0.95, (z3 + RADIUS * 1.2) / (RADIUS * 2.4)));

        return {
          projX,
          projY,
          scale,
          z: z3,
          depthAlpha,
          baseSize: node.baseSize,
          colorType: node.colorType,
          pulse: Math.sin(time * 2 + node.pulseOffset)
        };
      });

      // Sort by depth (painter's algorithm)
      projectedNodes.sort((a, b) => a.z - b.z);

      // Draw interconnecting data lines
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const dx = projectedNodes[i].projX - projectedNodes[j].projX;
          const dy = projectedNodes[i].projY - projectedNodes[j].projY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * Math.min(projectedNodes[i].depthAlpha, projectedNodes[j].depthAlpha) * (isDark ? 0.45 : 0.35);
            ctx.beginPath();
            ctx.moveTo(projectedNodes[i].projX, projectedNodes[i].projY);
            ctx.lineTo(projectedNodes[j].projX, projectedNodes[j].projY);
            
            // Gradient line
            const grad = ctx.createLinearGradient(
              projectedNodes[i].projX, projectedNodes[i].projY,
              projectedNodes[j].projX, projectedNodes[j].projY
            );
            if (isDark) {
              grad.addColorStop(0, `rgba(0, 240, 255, ${lineAlpha})`);
              grad.addColorStop(1, `rgba(99, 102, 241, ${lineAlpha * 0.7})`);
            } else {
              grad.addColorStop(0, `rgba(2, 132, 199, ${lineAlpha})`);
              grad.addColorStop(1, `rgba(124, 58, 237, ${lineAlpha * 0.7})`);
            }
            ctx.strokeStyle = grad;
            ctx.lineWidth = (isDark ? 0.85 : 0.75) * projectedNodes[i].scale;
            ctx.stroke();
          }
        }
      }

      // Draw 3D Orbiting Ring
      ctx.beginPath();
      for (let i = 0; i <= RING_POINTS; i++) {
        const ring = ringNodes[i % RING_POINTS];
        const angle = ring.angle + time * 0.3;
        const rx = Math.cos(angle) * ring.r;
        const rz = Math.sin(angle) * ring.r;
        const ry = ring.y + Math.cos(angle * 3) * 15;

        // Rotate ring
        let x1 = rx * cosY + rz * sinY;
        let y1 = ry;
        let z1 = -rx * sinY + rz * cosY;

        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        const cameraDist = 480;
        const scale = fov / (cameraDist + z2);
        const px = centerX + x2 * scale;
        const py = centerY + y2 * scale;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = isDark ? 'rgba(0, 240, 255, 0.12)' : 'rgba(2, 132, 199, 0.14)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw Nodes with luminous glowing halos
      projectedNodes.forEach((node) => {
        const size = Math.max(1, node.baseSize * node.scale * (1 + node.pulse * 0.15));
        
        // Outer glow halo
        const haloRadius = size * 3.5;
        const glow = ctx.createRadialGradient(
          node.projX, node.projY, 0,
          node.projX, node.projY, haloRadius
        );

        if (isDark) {
          if (node.colorType === 'cyan') {
            glow.addColorStop(0, `rgba(0, 240, 255, ${node.depthAlpha * 0.5})`);
            glow.addColorStop(1, 'rgba(0, 240, 255, 0)');
          } else {
            glow.addColorStop(0, `rgba(139, 92, 246, ${node.depthAlpha * 0.45})`);
            glow.addColorStop(1, 'rgba(139, 92, 246, 0)');
          }
        } else {
          if (node.colorType === 'cyan') {
            glow.addColorStop(0, `rgba(14, 165, 233, ${node.depthAlpha * 0.4})`);
            glow.addColorStop(1, 'rgba(14, 165, 233, 0)');
          } else {
            glow.addColorStop(0, `rgba(139, 92, 246, ${node.depthAlpha * 0.35})`);
            glow.addColorStop(1, 'rgba(139, 92, 246, 0)');
          }
        }

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(node.projX, node.projY, haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // Solid core
        if (isDark) {
          ctx.fillStyle = node.colorType === 'cyan' 
            ? `rgba(220, 252, 255, ${node.depthAlpha})` 
            : `rgba(243, 232, 255, ${node.depthAlpha})`;
        } else {
          ctx.fillStyle = node.colorType === 'cyan' 
            ? `rgba(2, 132, 199, ${node.depthAlpha * 0.95})` 
            : `rgba(109, 40, 217, ${node.depthAlpha * 0.95})`;
        }
        ctx.beginPath();
        ctx.arc(node.projX, node.projY, size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-75 md:opacity-90"
      />
    </div>
  );
}

