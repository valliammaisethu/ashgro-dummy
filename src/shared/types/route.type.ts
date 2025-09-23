import { FC, ReactElement, ComponentClass } from "react";


interface SingleRoute {
    path?: string;
    component?: any,
    children?: SingleRoute[];
    index?: boolean;
}


export interface RouterProps {
    path: string,
    component: any,
    children?: SingleRoute[];
}

