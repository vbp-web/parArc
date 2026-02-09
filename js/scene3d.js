// 3D Scene Controller using Three.js
class Scene3D {
    constructor() {
        this.canvas = document.getElementById('canvas3d');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.buildings = [];
        this.particles = null;
        this.lights = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetMouseX = 0;
        this.targetMouseY = 0;
        this.scrollProgress = 0;
        this.clock = new THREE.Clock();
        this.isPaused = false;

        if (this.canvas) {
            this.init();
        }
    }

    init() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupLights();
        this.createArchitecture();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0f0f0f, 10, 50);
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 5, 15);
        this.camera.lookAt(0, 0, 0);
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambientLight);

        // Main directional light
        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(5, 10, 5);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        mainLight.shadow.camera.near = 0.1;
        mainLight.shadow.camera.far = 50;
        this.scene.add(mainLight);
        this.lights.push(mainLight);

        // Fill light
        const fillLight = new THREE.DirectionalLight(0x6b8cff, 0.3);
        fillLight.position.set(-5, 5, -5);
        this.scene.add(fillLight);
        this.lights.push(fillLight);

        // Rim light
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
        rimLight.position.set(0, 3, -10);
        this.scene.add(rimLight);
        this.lights.push(rimLight);
    }

    createArchitecture() {
        // Create abstract architectural structures

        // Main building - Concrete material
        const concreteGeometry = new THREE.BoxGeometry(4, 6, 4);
        const concreteMaterial = new THREE.MeshStandardMaterial({
            color: 0x3a3a3a,
            roughness: 0.8,
            metalness: 0.2
        });
        const mainBuilding = new THREE.Mesh(concreteGeometry, concreteMaterial);
        mainBuilding.position.set(0, 0, 0);
        mainBuilding.castShadow = true;
        mainBuilding.receiveShadow = true;
        this.scene.add(mainBuilding);
        this.buildings.push(mainBuilding);

        // Glass tower
        const glassGeometry = new THREE.BoxGeometry(2, 8, 2);
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x88ccff,
            metalness: 0.1,
            roughness: 0.1,
            transparent: true,
            opacity: 0.4,
            transmission: 0.9,
            thickness: 0.5
        });
        const glassTower = new THREE.Mesh(glassGeometry, glassMaterial);
        glassTower.position.set(-5, 1, -3);
        glassTower.castShadow = true;
        this.scene.add(glassTower);
        this.buildings.push(glassTower);

        // Steel structure
        const steelGeometry = new THREE.BoxGeometry(3, 4, 3);
        const steelMaterial = new THREE.MeshStandardMaterial({
            color: 0x555555,
            roughness: 0.3,
            metalness: 0.9
        });
        const steelStructure = new THREE.Mesh(steelGeometry, steelMaterial);
        steelStructure.position.set(5, -1, -2);
        steelStructure.rotation.y = Math.PI / 6;
        steelStructure.castShadow = true;
        steelStructure.receiveShadow = true;
        this.scene.add(steelStructure);
        this.buildings.push(steelStructure);

        // Stone platform
        const platformGeometry = new THREE.BoxGeometry(15, 0.5, 15);
        const stoneMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            roughness: 0.9,
            metalness: 0.1
        });
        const platform = new THREE.Mesh(platformGeometry, stoneMaterial);
        platform.position.set(0, -3.5, 0);
        platform.receiveShadow = true;
        this.scene.add(platform);

        // Additional abstract elements
        for (let i = 0; i < 5; i++) {
            const size = Math.random() * 1.5 + 0.5;
            const geometry = new THREE.BoxGeometry(size, size * 2, size);
            const material = new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(0, 0, Math.random() * 0.3 + 0.1),
                roughness: Math.random() * 0.5 + 0.5,
                metalness: Math.random() * 0.5
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 10,
                Math.random() * 2 - 1,
                (Math.random() - 0.5) * 10
            );
            mesh.rotation.y = Math.random() * Math.PI;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            this.scene.add(mesh);
            this.buildings.push(mesh);
        }
    }

    createParticles() {
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 300; // Increased for better effect

        const posArray = new Float32Array(particlesCount * 3);
        const scaleArray = new Float32Array(particlesCount);

        for (let i = 0; i < particlesCount * 3; i++) {
            // Spread particles in a wider area
            posArray[i] = (Math.random() - 0.5) * 25;
        }

        for (let i = 0; i < particlesCount; i++) {
            scaleArray[i] = Math.random();
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));

        // Create a soft glowing particle material
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.08,
            color: 0xffffff,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
    }

    setupEventListeners() {
        // Mouse movement for parallax
        document.addEventListener('mousemove', (e) => {
            this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        // Window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    updateScroll(progress) {
        this.scrollProgress = progress;

        if (!this.camera) return;

        // Move camera based on scroll
        const targetZ = 15 - progress * 20;
        const targetY = 5 + progress * 10;
        const targetX = Math.sin(progress * Math.PI * 2) * 5;

        this.camera.position.x += (targetX - this.camera.position.x) * 0.05;
        this.camera.position.y += (targetY - this.camera.position.y) * 0.05;
        this.camera.position.z += (targetZ - this.camera.position.z) * 0.05;

        // Rotate buildings based on scroll
        this.buildings.forEach((building, index) => {
            const offset = index * 0.1;
            building.rotation.y = progress * Math.PI * 2 + offset;
            building.position.y += Math.sin(progress * Math.PI + offset) * 0.01;
        });
    }

    handleResize() {
        if (!this.camera || !this.renderer) return;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        if (!this.renderer || !this.camera) return;

        if (this.isPaused) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        const delta = this.clock.getDelta();
        const elapsed = this.clock.getElapsedTime();

        // Smooth mouse parallax
        this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
        this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

        // Apply parallax to camera
        this.camera.position.x += this.mouseX * 0.5 * delta;
        this.camera.position.y += -this.mouseY * 0.3 * delta;
        this.camera.lookAt(0, 0, 0);

        // Gentle rotation animation for buildings
        this.buildings.forEach((building, index) => {
            building.rotation.y += Math.sin(elapsed + index) * 0.0005;
        });

        // Animate particles
        if (this.particles) {
            this.particles.rotation.y = elapsed * 0.05;
            this.particles.rotation.x = this.mouseY * 0.1;

            // Gentle floating wave effect
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(elapsed * 0.5 + positions[i]) * 0.002;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        // Render scene
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(() => this.animate());
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
    }

    toggleDebug(enabled) {
        if (enabled) {
            // Add axes helper
            const axesHelper = new THREE.AxesHelper(5);
            axesHelper.name = 'axesHelper';
            this.scene.add(axesHelper);

            // Add grid helper
            const gridHelper = new THREE.GridHelper(20, 20);
            gridHelper.name = 'gridHelper';
            this.scene.add(gridHelper);
        } else {
            // Remove helpers
            const axes = this.scene.getObjectByName('axesHelper');
            const grid = this.scene.getObjectByName('gridHelper');
            if (axes) this.scene.remove(axes);
            if (grid) this.scene.remove(grid);
        }
    }
}
