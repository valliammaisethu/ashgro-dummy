import { Collapse, } from 'antd';
import React,{ReactNode} from 'react'



type AccordionType = {
  id: string;
  title: ReactNode;
  description: ReactNode;
  showArrow:boolean;
}


type AccordionProps = {
  accordionList: AccordionType[];
  defaultActiveKey: string;
  onChange?:(key: string | string[])=>void
}


const { Panel } = Collapse;

const Accordion = ({accordionList,defaultActiveKey='1',onChange}: AccordionProps) => {
  return (
    <Collapse accordion defaultActiveKey={defaultActiveKey} onChange={onChange}>
    {accordionList.map((item) => 
      (
      <Panel header={item.title} key={item.id} showArrow={item.showArrow}>
          {item.description}
      </Panel>))}
    </Collapse>
  );
}

export default Accordion