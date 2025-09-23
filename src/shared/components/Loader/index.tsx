import React, { ReactElement, ReactNode } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { LoaderSizes } from '../../../enums/LoaderSizes';
import styles from './Loader.module.scss';

interface Props {
  icon?: ReactElement
  size?: LoaderSizes.SMALL | LoaderSizes.LARGE | LoaderSizes.DEFAULT,
  tip?: string
}

const Loader: React.FC<Props> = ({ icon, size, tip }: Props) => {
  let antIcon = icon ? icon : <LoadingOutlined style={{ fontSize: 24 }} spin />
  return (
    <div className={styles['loader-container']}>
      <Spin indicator={antIcon} size={size ? size : LoaderSizes.DEFAULT} tip={tip} />
    </div>

  )
};
export default Loader 