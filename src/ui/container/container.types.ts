import { CSSProperties, ReactNode, Ref } from "react";

export type ContainerProps = {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    ref?: Ref<HTMLDivElement>;
};
