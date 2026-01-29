import React from "react";
import { Tooltip } from "antd";

import { useEllipsisTooltip } from "src/shared/hooks/useEllipsisTooltip";

interface TextTooltipProps {
  text?: string | number;
  className?: string;
}

const TextTooltip: React.FC<TextTooltipProps> = ({ text, className }) => {
  const { ref, isTruncated } = useEllipsisTooltip<HTMLParagraphElement>([text]);

  return (
    <Tooltip title={isTruncated ? text : undefined}>
      <p ref={ref} className={className}>
        {text}
      </p>
    </Tooltip>
  );
};

export default TextTooltip;
