import { useState } from 'react'


function useNamesSelected() {
  const [selectedNames, setData] = useState([])

  const select = async value => {
        const isValueOnData = selectedNames.includes(value);
        const newValues = selectedNames.filter(el => el !== value)
        
        isValueOnData ? 
        setData(newValues):
        setData(prev => [...prev, value])

  }

  return [selectedNames, select]
}

export default useNamesSelected


