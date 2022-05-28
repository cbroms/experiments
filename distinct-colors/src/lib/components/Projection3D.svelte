<script>
	import * as THREE from 'three';
	import { OrbitControls } from '$lib/libs/OrbitControls';
	import { map } from '$lib/math';

	import { onDestroy, onMount } from 'svelte';

	export let canvas;
	export let radius;
	export let rotation = 200;
	export let width = 500;
	export let height = 400;

	let thisWidth;
	let thisHeight;

	let windowWidth;

	const minRadius = 0.2;
	const maxRadius = 2;

	const cylinderHeight = height / 100;

	const ANIMATION_DURATION_MS = 2000;
	const ANIMATION_TOLERANCE_DEG = 5;

	let projectionElt;

	let rotationFunction = null;
	let currentRotation = rotation;

	let scene;
	let camera;
	let renderer;
	let controls;

	let geometry = null;
	let materials = [];
	let cylinder = null;
	let texture = null;

	$: {
		if (windowWidth < 720) {
			thisWidth = windowWidth - 20;
		} else {
			thisWidth = width;
		}
	}

	$: {
		thisWidth = width;
		thisHeight = height > 400 ? height : 400;
	}

	$: {
		if (thisHeight && thisWidth && renderer) {
			// if the height changes, set the camera and controls up again
			renderer.setSize(thisWidth, thisHeight);

			camera = new THREE.OrthographicCamera(
				thisWidth / -2,
				thisWidth / 2,
				thisHeight / 2,
				thisHeight / -2
			);
			camera.position.z = 5;
			camera.position.y = 1;
			camera.zoom = 75;
			camera.updateProjectionMatrix();

			controls = new OrbitControls(camera, renderer.domElement);
			controls.maxPolarAngle = Math.PI / 2;
			controls.enableDamping = true;
			controls.dampingFactor = 0.05;
			controls.minZoom = 40;
			controls.maxZoom = 120;
		}
	}

	onMount(() => {
		scene = new THREE.Scene();
		camera = new THREE.OrthographicCamera(
			thisWidth / -2,
			thisWidth / 2,
			thisHeight / 2,
			thisHeight / -2
		);
		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(thisWidth, thisHeight);
		projectionElt.appendChild(renderer.domElement);

		camera.position.z = 5;
		camera.position.y = 1;
		camera.zoom = 75;
		camera.updateProjectionMatrix();

		// set up the center line
		const lineMaterial = new THREE.LineBasicMaterial({
			color: 0x000000,
			transparent: true,
			opacity: 0.2
		});
		const points = [
			new THREE.Vector3(0, -1 * cylinderHeight, 0),
			new THREE.Vector3(0, cylinderHeight, 0)
		];
		const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
		const line = new THREE.Line(lineGeometry, lineMaterial);
		scene.add(line);

		// set up bounding cylinder
		const cylinderGeometry = new THREE.CylinderGeometry(
			maxRadius,
			maxRadius,
			cylinderHeight,
			80,
			1
		);
		const cylinderEdges = new THREE.EdgesGeometry(cylinderGeometry, 10);
		const edgeLines = new THREE.LineSegments(cylinderEdges, lineMaterial);
		scene.add(edgeLines);

		controls = new OrbitControls(camera, renderer.domElement);
		controls.maxPolarAngle = Math.PI / 2;
		// controls.autoRotate = true;
		// controls.autoRotateSpeed = 4;
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;
		controls.minZoom = 40;
		controls.maxZoom = 120;

		function animate() {
			requestAnimationFrame(animate);

			if (rotationFunction) rotationFunction();
			controls.update();
			renderer.render(scene, camera);
		}

		animate();
		updateTexture();
	});

	const updateTexture = () => {
		cleanupScene();

		texture = new THREE.CanvasTexture(canvas);
		texture.minFilter = THREE.NearestFilter;

		materials = [
			new THREE.MeshBasicMaterial({ map: texture }),
			new THREE.MeshBasicMaterial({ color: 0xf1f1f1 }),
			new THREE.MeshBasicMaterial({ color: 0x000000 })
		];
		geometry = new THREE.CylinderGeometry(
			easeRadius(radius),
			easeRadius(radius),
			cylinderHeight,
			80,
			1
		);
		cylinder = new THREE.Mesh(geometry, materials);
		cylinder.rotation.y = THREE.MathUtils.degToRad(currentRotation * -1);

		scene.add(cylinder);

		const clock = new THREE.Clock();

		const rotationDiff = Math.abs(rotation - currentRotation);

		const moveRight =
			(currentRotation < rotation && rotationDiff < 180) ||
			(currentRotation > rotation && rotationDiff > 180);

		const rotateTarget = !moveRight && rotationDiff > 180 ? 360 - rotation : rotation;
		const speed = Math.abs(currentRotation - rotateTarget) / (ANIMATION_DURATION_MS / 100);

		rotationFunction = () => {
			if (Math.abs(currentRotation - rotateTarget) > ANIMATION_TOLERANCE_DEG) {
				if (moveRight) cylinder.rotation.y -= speed * clock.getDelta();
				else cylinder.rotation.y += speed * clock.getDelta();

				if (Math.abs(THREE.MathUtils.radToDeg(cylinder.rotation.y)) > 360) {
					cylinder.rotation.y = 0;
				}
				currentRotation = Math.abs(Math.round(THREE.MathUtils.radToDeg(cylinder.rotation.y)));
			} else {
				rotationFunction = null;
			}
		};
	};

	$: {
		if (canvas && scene) {
			updateTexture();
		}
	}

	const cleanupScene = () => {
		if (materials.length > 0 && geometry) {
			materials.map((m) => m.dispose());
			geometry.dispose();
			scene.remove(cylinder);
			cylinder = null;
			rotationFunction = null;
		}
	};

	const easeRadius = (r) => {
		return map(1 - Math.pow(1 - r, 2), 0, 1, minRadius, maxRadius);
	};

	onDestroy(() => {
		cleanupScene();
	});
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div bind:this={projectionElt} />
