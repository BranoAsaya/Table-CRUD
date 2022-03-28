import { useContext } from 'react'
import tableContext from '../Context/Context'

function Grid() {
  const { state, dispatch } = useContext(tableContext)
  const { list, isOpen, index } = state

  const handelDelete = (i) => {
    const listCopy = [...list]
    listCopy.splice(i, 1)
    localStorage.setItem("list", JSON.stringify(listCopy))
    dispatch({ type: "delete", data: listCopy })
  }

  const handelUpdate = (e) => {
    e.preventDefault()
    const i = index
    const listCopy = [...list]
    const { FirstName, LastName } = e.target
    if (FirstName.value === '' || LastName.value === '') return
    listCopy[i].FirstName = FirstName.value
    listCopy[i].LastName = LastName.value
    localStorage.setItem("list", JSON.stringify(listCopy))
    dispatch({ type: "update", data: listCopy })
    e.target.reset()
  }

  const tableData = list.map((data, i) => {
    return (
      <tr key={i}>
        <td>{data.FirstName}</td>
        <td>{data.LastName}</td>
        <td>{data.ID}</td>
        <td style={{ width: '12vw' }}>
          <button className="button is-danger" onClick={() => handelDelete(i)}>
            &#9940;
          </button>
          &nbsp;
          <button
            className="button is-link"
            onClick={() => {
                dispatch({ type: "open", data: i })
            }}
          >
            &#9997;
          </button>
          <div className={`modal ${isOpen ? 'is-active is-clipped' : ''}`}>
            <div className="modal-background" />
            <div className="modal-content">
              <div className="card">
                <div className="column  has-text-centered">
                  <h1 className="title is-4">Edit</h1>

                  <form onSubmit={(e) => handelUpdate(e)}>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="text"
                          placeholder="First Name"
                          name="FirstName"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="text"
                          placeholder="Last Name"
                          name="LastName"
                        />
                      </div>
                    </div>
                    <button
                      className="button is-block is-primary is-fullwidth is-medium"
                      type="submit"
                    >
                      Update
                    </button>
                    <br />
                  </form>
                </div>
              </div>
            </div>
            <button
              className="modal-close is-large"
              aria-label="close"
              onClick={() =>  dispatch({ type: "close"})}
            />
          </div>
        </td>
      </tr>
    )
  })
  return <>{tableData}</>
}

export default Grid
