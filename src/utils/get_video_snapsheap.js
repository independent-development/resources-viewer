import get_current_base64 from "@/utils/get_current_base64";

const video_target=document.createElement("video");
video_target.muted=true;
video_target.controls=true;

export default async function get_video_snapsheap(blob_url){
  const promise_task=[];
  const get_time_splite=await new Promise((resolve)=>{
    video_target.addEventListener("canplaythrough",async function callback(){
      video_target.removeEventListener("canplaythrough",callback);
      const duration=video_target.duration;
      resolve(Array(52).fill(duration).map((fill,index)=>parseInt((duration/52)*index)));
    });
    video_target.src=blob_url;
  });

  for(let key=0;key<get_time_splite.length;key++){
    const snapshoot=await get_current_base64(video_target,get_time_splite[key]);
    promise_task.push(snapshoot);
  };

  return await Promise.all(promise_task);
}