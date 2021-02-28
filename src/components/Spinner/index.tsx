import React, { FunctionComponent } from 'react'
import { Spin } from 'antd'
import './spinner.scss'

const Spinner: FunctionComponent = () => {
  return (
    <div className="main-spinner">
      <div className="main-spinner-custom">
        <Spin size="large" />
      </div>
    </div>
  )
}

export default Spinner;
