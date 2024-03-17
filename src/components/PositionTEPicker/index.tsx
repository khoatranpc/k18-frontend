import React from 'react'
import { MenuProps } from 'antd';
import { PositionTe } from '@/global/enum';
import { getLabelPositionTe } from '@/global/init';
import Dropdown from '../Dropdown';

interface Props {
  value?: PositionTe;
  onChange?: (positionTe: PositionTe) => void;
  className?: string;
}
const PositionTEPicker = (props: Props) => {
  const listPosition: MenuProps['items'] = [
    {
      key: PositionTe.QC,
      label: getLabelPositionTe[PositionTe.QC]
    },
    {
      key: PositionTe.ASSISTANT,
      label: getLabelPositionTe[PositionTe.ASSISTANT]
    },
    {
      key: PositionTe.HR,
      label: getLabelPositionTe[PositionTe.HR]
    },
    {
      key: PositionTe.LEADER,
      label: getLabelPositionTe[PositionTe.LEADER]
    }
  ];
  return (
    <Dropdown
      className={props.className}
      listSelect={listPosition}
      trigger="click"
      title={getLabelPositionTe[props.value as PositionTe]}
      sizeButton="small"
      onClickItem={(e) => {
        const getPosition = e.key;
        if (getPosition !== props.value) {
          props.onChange?.(getPosition as PositionTe);
        }
      }}
    />
  )
}

export default PositionTEPicker;