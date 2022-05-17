<script>
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

	import { onDestroy, onMount } from 'svelte';

	export let canvas;
	export let radius;

	export let maxRadius;

	const height = 500;
	const width = 500;

	let projectionElt;

	let scene;
	let camera;
	let renderer;

	let geometry;
	let materials = [];
	let cylinder;

	onMount(() => {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(width, height);
		projectionElt.appendChild(renderer.domElement);

		camera.position.z = 5;
		camera.position.y = 2;

		// set up the center line
		const lineMaterial = new THREE.LineBasicMaterial({
			color: 0x000000,
			transparent: true,
			opacity: 0.2
		});
		const points = [new THREE.Vector3(0, -2, 0), new THREE.Vector3(0, 2, 0)];
		const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
		const line = new THREE.Line(lineGeometry, lineMaterial);
		scene.add(line);

		// set up bounding cylinder
		const cylinderGeometry = new THREE.CylinderGeometry(maxRadius, maxRadius, 2, 80, 1);
		const cylinderEdges = new THREE.EdgesGeometry(cylinderGeometry, 10);
		const edgeLines = new THREE.LineSegments(cylinderEdges, lineMaterial);
		scene.add(edgeLines);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.maxPolarAngle = Math.PI / 2;
		// controls.autoRotate = true;
		// controls.autoRotateSpeed = 4;
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;

		function animate() {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);
		}

		animate();
	});

	$: {
		if (canvas && scene) {
			if (materials.length > 0 && geometry) {
				materials.map((m) => m.dispose());
				geometry.dispose();
				scene.remove(cylinder);

				materials = [];
				geometry = null;
				cylinder = null;
			}

			const texture = new THREE.CanvasTexture(canvas);

			materials = [
				new THREE.MeshBasicMaterial({ map: texture }),
				new THREE.MeshBasicMaterial({ color: 0xf1f1f1 }),
				new THREE.MeshBasicMaterial({ color: 0x000000 })
			];
			geometry = new THREE.CylinderGeometry(radius, radius, 2, 80, 1);
			cylinder = new THREE.Mesh(geometry, materials);

			scene.add(cylinder);

			// cylinder.rotation.x = 0.3;
		}
	}
</script>

<div bind:this={projectionElt} />
