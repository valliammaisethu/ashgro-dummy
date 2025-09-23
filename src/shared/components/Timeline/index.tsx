import { Timeline  as AntdTimeline} from 'antd';
import React, { ReactNode,FC } from 'react';
type itemsType = {
    label: ReactNode,
    children: ReactNode,
    dot?: ReactNode,
    position?: 'left' | 'right',
    color?: string
}

interface TimelineProps {
    mode?: 'left' | 'right' | 'alternate',
    items: itemsType[],
    pending?: boolean | ReactNode,
    reverse?: boolean,
    pendingDot?: ReactNode,
}

const  Timeline:FC<TimelineProps> =(props)=>{
    const { mode = 'left', items, pending, reverse, pendingDot } = props
    return <AntdTimeline
        mode={mode}
        pending={pending}
        reverse={reverse}
        pendingDot={pendingDot} >
            {items.map((item,index)=><AntdTimeline.Item key={index} label={item.label} dot={item.dot}>{item.children}</AntdTimeline.Item>)}
        </AntdTimeline>


}


export default Timeline;
