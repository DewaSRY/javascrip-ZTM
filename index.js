const videoElement = document.getElementById("video");
const button = document.getElementById("button");

//Prompt to select media strem , pass to video element then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.log("Error was ocure:", error);
  }
}
button.addEventListener("click", async () => {
  //Disable Button
  button.disabled = true;
  //Start Picture in Picture
  await videoElement.requestPictureInPicture();
  //reset Button
  button.disabled = false;
});
//on Load
selectMediaStream();
