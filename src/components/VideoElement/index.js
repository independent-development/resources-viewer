import {Button} from "antd";
import classnames from "classnames";
import {createPortal} from "react-dom";
import React,{useRef,useMemo,useState,useEffect,useImperativeHandle,useCallback} from "react";

import css from "./style.less";

const VideoElement=React.forwardRef(({blob_url,style,className,...otherProps},ref)=>{

  const [open_status,set_open_status]=useState(false);
  const [video_target,set_video_ref]=useState(null);
  const mount_target=useRef(document.createElement("div")).current;

  const compose_style=useMemo(()=>Object.assign({},style),[style]);
  const compose_class=useMemo(()=>classnames({
    [css.video_element_container]:true,
    [css.video_element_container_close]:!open_status,
  },className),[className,open_status]);

  const handlePlayCallback=useCallback((current_time)=>{
    set_open_status(true);
    video_target.muted=false;
    video_target.currentTime=current_time;
    video_target.play();
  },[video_target]);

  const handleStopCallback=useCallback((current_time)=>{
    set_open_status(false);
    video_target.muted=false;
    video_target.pause();
  },[video_target]);

  useImperativeHandle(ref,()=>({play:handlePlayCallback}));

  useEffect(()=>{
    document.body.appendChild(mount_target);
    return ()=>document.body.removeChild(mount_target);
  },[]);

  return createPortal((
    <div className={compose_class}>
      <Button block type="primary" onClick={handleStopCallback}>暂停并关闭</Button>
      <video muted controls src={blob_url} ref={set_video_ref} style={compose_style} className={css.video_element} {...otherProps}/>
    </div>
  ),mount_target)
});

VideoElement.defaultValue={
  blob_url:null
};

export default VideoElement;