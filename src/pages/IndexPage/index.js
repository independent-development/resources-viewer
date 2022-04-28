/* eslint-disable react/prop-types */
import React,{useRef,useState,useCallback} from "react";

import NoSSR from "@/components/NoSSR";
import Snapshort from "@/components/Snapshort";
import FileSelecter from "@/components/FileSelecter";
import VideoElement from "@/components/VideoElement";
import PreviewContainer from "@/components/PreviewContainer";

import get_video_snapsheap from "@/utils/get_video_snapsheap";


export default function IndexPage(){
  const video_element=useRef();

  const [blob_url,set_blob_url]=useState("");
  const [base64_array,set_base64_array]=useState([]);

  const handleChange=useCallback(async (computed_blob_url)=>{
    const base64_array=await get_video_snapsheap(computed_blob_url);
    set_base64_array(base64_array);
    set_blob_url(computed_blob_url);
  },[]);

  return (
    <div>
      <FileSelecter onChange={handleChange}/>
      <PreviewContainer>
        {base64_array.map(([current_time,current_base64],index)=>{
          return (
            <Snapshort key={index} base64={current_base64} onPlay={()=>video_element.current.play(current_time)}/>
        )})}
      </PreviewContainer>
      <NoSSR>
        <VideoElement blob_url={blob_url} ref={video_element}/>
      </NoSSR>
    </div>
)}


IndexPage.propTypes={

};

IndexPage.defaultProps={

};