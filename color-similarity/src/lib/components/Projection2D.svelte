<script>
	export let canvas;

	let myCanvas;
	let ctx;

	$: {
		if (canvas !== undefined && myCanvas) {
			console.log(canvas);
			if (!ctx) ctx = myCanvas.getContext('2d');
			ctx.clearRect(0, 0, 500, 300);

			const imageSrc = canvas.toDataURL('image/png');
			const image = new Image();
			image.src = imageSrc;

			ctx.drawImage(image, 0, 0);
		}
	}
</script>

<canvas bind:this={myCanvas} height="300" width="500" />
