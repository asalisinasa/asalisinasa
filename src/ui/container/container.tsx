"use client";

import cn from "classnames";
import { FC } from "react";

import { ContainerProps } from "./container.types";

import styles from "./container.module.css";

export const Container: FC<ContainerProps> = (props) => {
  const { children, className, style, ref } = props;

  return (
    <div className={cn(styles.container, className)} style={style} ref={ref}>
      {children}
    </div>
  );
};
