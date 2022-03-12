import React, { useState, useRef, useEffect } from 'react'

function Table() {
  const [list, setList] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [alert, setAlert] = useState('')

  const firstNameRef = useRef('')
  const LastNameRef = useRef('')
  const idRef = useRef('')

  useEffect(() => {
    let localStorageList = JSON.parse(localStorage.getItem('list'))
    if (!localStorageList) {
      localStorageList = [
        { FirstName: 'Brano', LastName: 'Asaya', ID: '1234567' },
      ]
    }
    setList(localStorageList)
    return () => {}
  }, [])

  const handelAdd = () => {
    const listCopy = [...list]
    const idCheck = listCopy.find((input) => input.ID === idRef.current.value)
    if (idCheck) return setAlert('ID already in Use')
    if (
      firstNameRef.current.value.length < 2 &&
      LastNameRef.current.value.length < 2 &&
      idRef.current.value.length < 2
    )
      return setAlert('No input')
    const newData = {
      FirstName: firstNameRef.current.value,
      LastName: LastNameRef.current.value,
      ID: idRef.current.value,
    }
    listCopy.push(newData)
    localStorage.setItem('list', JSON.stringify(listCopy))
    setList(listCopy)
    setAlert('')
  }

  const handelDelete = (i) => {
    const listCopy = [...list]
    listCopy.splice(i, 1)
    localStorage.setItem('list', JSON.stringify(listCopy))
    setList(listCopy)
  }

  const handelUpdate = (e) => {
    e.preventDefault()
    const i = index
    const listCopy = [...list]
    const { FirstName, LastName } = e.target
    if (FirstName.value === '' || LastName.value === '') return
    listCopy[i].FirstName = FirstName.value
    listCopy[i].LastName = LastName.value
    setList(listCopy)
    localStorage.setItem('list', JSON.stringify(listCopy))
    setIsOpen(!isOpen)
    e.target.reset()
  }
  const handelCopy = () => {
    const jsonListCopy = JSON.stringify(list)
    if (!navigator.clipboard)return prompt("Copy Text to Clipboard",jsonListCopy)
      navigator.clipboard?.writeText(jsonListCopy)
      setAlert('Copied the text')

    
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
              setIsOpen(!isOpen)
              setIndex(i)
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
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </td>
      </tr>
    )
  })

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
            {tableData}
          </tbody>
        </table>
      </section>
      <hr />
      <pre>
        <button className="button is-success" onClick={handelCopy}>
          &#9986;
        </button>
        <br />[{jsonData}]
      </pre>
    </section>
  )
}

export default Table
