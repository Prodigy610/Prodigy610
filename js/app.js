/*
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
*/




// Устанавливаем начальное положение для эффекта параллакса
let initialGamma = 0;
let initialBeta = 0;
let isInitialized = false;

// Добавляем эффект параллакса при движении мыши
document.addEventListener('mousemove', e => {
    Object.assign(document.documentElement, {
        style: `
        --move-x: ${(e.clientX - window.innerWidth / 2) * -.01}deg;
        --move-y: ${(e.clientY - window.innerHeight / 2) * -.02}deg;
        `
    });
});

if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
            if (permissionState === 'granted') {
                window.addEventListener('deviceorientation', onDeviceOrientation);
            }
        })
        .catch(console.error);
} else {
    window.addEventListener('deviceorientation', onDeviceOrientation);
}

function onDeviceOrientation(event) {
    let gamma = event.gamma || 0; // Лево-право (-90 до 90)
    let beta = event.beta || 0;   // Верх-низ (-180 до 180)

    if (!isInitialized) {
        initialGamma = gamma;
        initialBeta = beta;
        isInitialized = true;
    }

    let correctedGamma = gamma - initialGamma;
    let correctedBeta = beta - initialBeta;

    const gammaSensitivity = 0.3;
    const betaSensitivity = 0.3;

    correctedGamma = Math.min(Math.max(correctedGamma, -30), 30);
    correctedBeta = Math.min(Math.max(correctedBeta, -30), 30);

    document.documentElement.style.setProperty('--move-x', correctedGamma * gammaSensitivity + 'deg');
    document.documentElement.style.setProperty('--move-y', correctedBeta * betaSensitivity + 'deg');
}
