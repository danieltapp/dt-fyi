<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;

  interface Star {
    x: number;
    y: number;
    radius: number;
    alpha: number;
    twinkleSpeed: number;
  }

  const createStars = (count: number): Star[] => {
    const stars: Star[] = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        twinkleSpeed: 0.02 + Math.random() * 0.02,
      });
    }
    return stars;
  };

  const animateStars = (stars: Star[]) => {
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed * (Math.random() > 0.5 ? 1 : -1);
        if (star.alpha < 0) star.alpha = 0;
        if (star.alpha > 1) star.alpha = 1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };
    animate();
  };

  const resizeCanvas = (stars: Star[]) => {
    if (!canvas || !ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    animateStars(stars);
  };

  onMount(() => {
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');

    const stars = createStars(200);
    animateStars(stars);

    const handleResize = () => resizeCanvas(stars);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<canvas class="background-canvas" bind:this={canvas} style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;"></canvas>

