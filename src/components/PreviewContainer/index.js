import React,{useMemo} from "react";
import classnames from "classnames";

import css from "./style.less";

export default function PreviewContainer({style,className,children,...otherProps}){
  const compose_style=useMemo(()=>Object.assign({},style),[style]);
  const compose_class=useMemo(()=>classnames(css.preview_container,className),[className]);
  return (
    <div style={compose_style} className={compose_class} {...otherProps}>{children}</div>
)};

PreviewContainer.defaultValue={
  base64:null
};