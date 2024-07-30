import React,{useState} from 'react'
import GaugeChart from 'react-gauge-chart'

import '../Styles/CalorieComponent.css';

const CalarieComponent = ({weightPatter}) => {

  const [maintainWeight,setMaintainWeight] = useState(2029);
  const [reduceWeight,setReduceWeight] = useState(2459);
  const [gainWeight,setGainWeight] = useState(1229);

  return (
    <div>
      <div className='cc-heading'>
        Analysis :
      </div>
    <div className='h-44 w-44'>
    <GaugeChart id="gauge-chart5"
      fontSize='0px'
      nrOfLevels={5}
      colors={['#5BE12C', '#ff0000']}
      percent={0.45}
      cornerRadius={0} 
      arcPadding={0}
      arcWidth={0.2}
      needleColor="#FFFFFF" 
      />
      </div>
    </div>
  )
}

export default CalarieComponent
