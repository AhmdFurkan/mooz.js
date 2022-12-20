var peer=new Peer();

let localStream;
let localId;

const inputLocalPeerId=document.getElementById("myId");
const inputRemotePeerId=document.getElementById("callId");
const btnCall=document.getElementById("join");
const btnScreen=document.querySelector(".screenBtn");
const send_button=document.getElementById("send");


navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(stream=>{
    localStream=stream;
    const videoElement=document.getElementById("localVideo");
    createVideo(videoElement,stream)
})


peer.on("open",id=>{
    localId=id;
});

function wpSend(){
    let wpUrl;
    if (inputRemotePeerId.value==="") {
        wpUrl="https://api.whatsapp.com/send?phone=905455105084&text=moozjs.vercel.app/index.html?id="+localId
    }else{
        wpUrl="https://api.whatsapp.com/send?phone=90"+inputRemotePeerId.value+"&text=moozjs.vercel.app/index.html?id="+localId
    }
    
    window.open(wpUrl,"_blank")
}


btnCall.addEventListener("click",()=>{
    if (getParamas()!==null) {
        const call=peer.call(getParamas(),localStream);
        call.on("stream",stream=>{
            const remoteVideo=document.getElementById("remoteVideo")
            createVideo(remoteVideo,stream)
        })
    }else{
        console.log("gelmedi")
    }
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
const getParamas=()=>{
    let urlString=(window.location.href).toLowerCase();
    let url=new URL(urlString);
    let remoteId=url.searchParams.get("id")
    return remoteId;
}
window.onload=()=>{
    if (getParamas()!==null) {
        inputRemotePeerId.style.display="none";
        document.getElementById("send").style.display="none"
    }else{
        btnCall.style.display="none"
    }
}