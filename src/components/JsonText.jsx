import { useContext } from 'react'
import tableContext from '../Context/Context'

function JsonText() {
  const { state } = useContext(tableContext)
  const { list } = state

  const jsonData = list.map((data, i) => {
    return (
      <pre key={i}>
        {'\n'}
        {'  '}
        {'{'}
        {'\n'}
        {'    '}"FirstName": "{data.FirstName}",{'\n'}
        {'    '}"LastName": "{data.LastName}",{'\n'}
        {'    '}"ID": "{data.ID}",{'\n'}
        {'  '}
        {'},'}
        {'\n'}
      </pre>
    )
  })
  return <>{jsonData}</>
}

export default JsonText
