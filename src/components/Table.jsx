import { useRef, useContext } from 'react'
import tableContext from '../Context/Context'
import Grid from './Grid'
import JsonText from './JsonText'

function Table() {
  const { state, dispatch } = useContext(tableContext)
  const { list, alert } = state
  const firstNameRef = useRef('')
  const LastNameRef = useRef('')
  const idRef = useRef('')

  const handelAdd = () => {
    const listCopy = [...list]
    const idCheck = listCopy.find((input) => input.ID === idRef.current.value)
    if (idCheck) return dispatch({ type: 'alert', data: 'ID already in Use' })
    if (
      firstNameRef.current.value.length < 2 &&
      LastNameRef.current.value.length < 2 &&
      idRef.current.value.length < 2
    )
      return dispatch({ type: 'alert', data: 'No input' })
    const newData = {
      FirstName: firstNameRef.current.value,
      LastName: LastNameRef.current.value,
      ID: idRef.current.value,
    }
    listCopy.push(newData)
    localStorage.setItem('list', JSON.stringify(listCopy))
    dispatch({ type: 'add', data: listCopy })
  }

  const handelCopy = () => {
    const jsonListCopy = JSON.stringify(list)
    if (!navigator.clipboard)
      return prompt('Copy Text to Clipboard', jsonListCopy)
    navigator.clipboard?.writeText(jsonListCopy)
    dispatch({ type: 'alert', data: 'Copied the text' })
  }

  return (
    <section className="section">
      <article className="message is-link">
        <div className="message-header">
          <p>Link</p>
          &#129409;
        </div>
        <div className="message-body">{alert}</div>
      </article>
      <hr />
      <section>
        <div className="columns">
          <div className="column">
            <input
              placeholder="First Name"
              className="input"
              ref={firstNameRef}
            />
          </div>
          <div className="column">
            <input
              placeholder="Last Name"
              className="input"
              ref={LastNameRef}
            />
          </div>
          <div className="column">
            <input
              placeholder="ID"
              className="input"
              ref={idRef}
              type={'number'}
            />
          </div>
          <div className="column is-narrow">
            <button className="button" onClick={handelAdd}>
              Add
            </button>
          </div>
        </div>
        <table className="table loading is-bordered is-fullwidth">
          <tbody>
            <tr>
              <td>First Name</td>
              <td>Last Name</td>
              <td>ID</td>
              <td>Edit</td>
            </tr>
            <Grid />
          </tbody>
        </table>
      </section>
      <hr />
      <pre>
        <button className="button is-success" onClick={handelCopy}>
          &#9986;
        </button>
        <br />[<JsonText />]
      </pre>
    </section>
  )
}

export default Table
