var peer=new Peer();

let localStream;

const inputLocalPeerId=document.getElementById("myId");
const inputRemotePeerId=document.getElementById("callId");
const btnCall=document.getElementById("join");
const btnScreen=document.querySelector(".screenBtn");


navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(stream=>{
    localStream=stream;
    const videoElement=document.getElementById("localVideo");
    createVideo(videoElement,stream)
})


peer.on("open",id=>{
    inputLocalPeerId.innerText=id;
    peer.on('data', function(data) {
        console.log('Received', data);
      });
  
      // Send messages
      peer.send('Hello!');
});

btnScreen.addEventListener("click",()=>{
    navigator.mediaDevices.getDisplayMedia({audio:true,video:true}).then(stream=>{
        const screenVideo=document.getElementById("screenVideo")
        screenVideo.srcObject=stream
        screenVideo.play()
    })
})

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
    videoEl.srcObject=stream;
    videoEl.onloadedmetadata=()=>videoEl.play()
}