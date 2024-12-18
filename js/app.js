document.addEventListener('mousemove', e => {
    Object.assign(document.documentElement, {
        style: `
        --move-x: ${(e.clientX - window.innerWidth / 2) * -.01}deg;
        --move-y: ${(e.clientY - window.innerHeight / 2) * -.02}deg;
        `
      
    })
})

if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (event) => {
        let gamma = event.gamma; // Лево-право (-90 до 90)
        let beta = event.beta;   // Верх-низ (-180 до 180)

        // Ограничим диапазон значений для плавности
        gamma = Math.min(Math.max(gamma, -30), 30);
        beta = Math.min(Math.max(beta, -30), 30);

        document.documentElement.style.setProperty('--move-x', gamma * 0.5 + 'deg');
        document.documentElement.style.setProperty('--move-y', beta * 0.5 + 'deg');
    });
} else {
    console.log('DeviceOrientationEvent не поддерживается этим устройством.');
}
