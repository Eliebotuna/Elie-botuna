import React, { useEffect, useRef } from 'react';
import '../../styles/InteractiveBackground.css';

const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 9000;
      
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2 + 1;
        const speedX = Math.random() * 2 - 1;
        const speedY = Math.random() * 2 - 1;
        
        particles.push({
          x,
          y,
          size,
          speedX,
          speedY,
          originalX: x,
          originalY: y
        });
      }
      
      return particles;
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        radius: 100
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = {
        x: undefined,
        y: undefined,
        radius: 100
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = mouseRef.current.radius;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * 2;
        const directionY = forceDirectionY * force * 2;

        if (distance < mouseRef.current.radius) {
          particle.x -= directionX;
          particle.y -= directionY;
        } else {
          if (particle.x !== particle.originalX) {
            const dx = particle.x - particle.originalX;
            particle.x -= dx / 10;
          }
          if (particle.y !== particle.originalY) {
            const dy = particle.y - particle.originalY;
            particle.y -= dy / 10;
          }
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.5)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    particlesRef.current = createParticles();
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="interactive-background"
      aria-hidden="true"
    />
  );
};

export default InteractiveBackground; 