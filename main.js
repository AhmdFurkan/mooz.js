var peer=new Peer();

let localStream;

const inputLocalPeerId=document.getElementById("myId");
const inputRemotePeerId=document.getElementById("callId");
const btnCall=document.getElementById("join");
const btnScreen=document.querySelector(".screenBtn");
const myId=document.getElementById("myId");

myId.addEventListener("click",()=>{
    navigator.clipboard.writeText(myId.value)
})

navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(stream=>{
    localStream=stream;
    const videoElement=document.getElementById("localVideo");
    createVideo(videoElement,stream)
})


peer.on("open",id=>{
    inputLocalPeerId.innerText=id;
});


btnCall.addEventListener("click",()=>{
    const remotePeerId=inputRemotePeerId.value;
    const call=peer.call(remotePeerId,localStream);
    call.on("stream",stream=>{
        const remoteVideo=document.getElementById("remoteVideo")
        createVideo(remoteVideo,stream)
    })
})
peer.on("call",(call)=>{
    call.answer(localStream);
    call.on("stream",stream=>{
        const remoteVideo=document.getElementById("remoteVideo")
        createVideo(remoteVideo,stream)
    })
})
function createVideo(videoEl,stream){
    if ('srcObject' in video) {
        videoEl.srcObject = stream
      } else {
        videoEl.src = window.URL.createObjectURL(stream) // for older browsers
      }
    videoEl.muted=true;
    videoEl.onloadedmetadata=()=>videoEl.play()
}
