
export default async function get_current_base64(video_target,current_time){
  await new Promise((resolve)=>{
    function callback(){
      resolve();
      video_target.removeEventListener("canplaythrough",callback);
    };
    video_target.addEventListener("canplaythrough",callback);
    video_target.currentTime=current_time;
  });
  const oCanvas=document.createElement("canvas");
  oCanvas.width=1600;
  oCanvas.height=900;
  const context=oCanvas.getContext("2d");
  context.drawImage(video_target,0,0,oCanvas.width,oCanvas.height);
  const base64=oCanvas.toDataURL("image/jpeg");
  return [current_time,base64];
};