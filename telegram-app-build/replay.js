const frames = [];

function AddFrame(base64) {
    const img = new Image();
    img.src = `data:image/png;base64,${base64}`;
    frames.push(img);
}

function FinishVideo() {
    const video = Whammy.fromImageArray(frames, 30); // 30 FPS
    const blob = new Blob([video], { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gameplay_video.webm';
    a.click();
}
