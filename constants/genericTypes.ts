import * as React from "react";
import { RouteProps } from "react-router-dom";

export type RouteRenderProp = (props: RouteProps) => React.ReactElement<any>;
