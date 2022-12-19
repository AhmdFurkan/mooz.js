var peer=new Peer();

let localStream;

const inputLocalPeerId=document.getElementById("myId");
const inputRemotePeerId=document.getElementById("callId");
const btnCall=document.getElementById("join");
const btnScreen=document.querySelector(".screenBtn");
const myId=document.getElementById("myId");
const videoElement=document.getElementById("localVideo");
const remotePeerId=inputRemotePeerId.value;
const call=peer.call(remotePeerId,localStream);
const remoteVideo=document.getElementById("remoteVideo")

navigator.mediaDevices.getUserMedia({video:true}).then(stream=>{
    createVideo(videoElement,stream)
})

peer.on("open",id=>{
    inputLocalPeerId.innerText=id;
});


btnCall.addEventListener("click",()=>{
    call.on("stream",stream=>{
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
    videoEl.srcObject = stream
    videoEl.onloadedmetadata=()=>videoEl.play()
}
