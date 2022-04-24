import classnames from "classnames";
import React,{useState,useCallback} from "react";

// import css from "./style.less";

export default function FileSelecter({onChange,...otherProps}){
  
  const [file_select_target,set_file_select_target]=useState(null);

  const handleCallback=useCallback(async ()=>{
    file_select_target.src?URL.resolveObjectURL(file_select_target.src):void(0);
    file_select_target.src=URL.createObjectURL(file_select_target.files[0]);
    await onChange(file_select_target.src);
  },[file_select_target,onChange]);

  return (
    <input type="file" ref={set_file_select_target} onChange={handleCallback} {...otherProps}/>
)};

FileSelecter.defaultValue={
  base64:null,
  onChange(){}
};