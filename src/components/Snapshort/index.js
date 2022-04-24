import React,{useMemo} from "react";
import classnames from "classnames";

import css from "./style.less";

export default function Snapshort({base64,style,className,onPlay,...otherProps}){
  const compose_style=useMemo(()=>Object.assign({},style),[style]);
  const compose_class=useMemo(()=>classnames(css.snap_short,className),[]);
  return (
    <img onClick={onPlay} width={16*25} height={9*25} style={compose_style} className={compose_class} src={base64} {...otherProps}/>
)};

Snapshort.defaultValue={
  base64:null,
  onPlay(){}
};