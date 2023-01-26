import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function getLocalStorage() {
  let list = localStorage.getItem('list');

  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  }
  else {
    return [];
  }
}
function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });


  function handleSubmit(e) {
    e.preventDefault();

    if (!name) {
      showAlert(true, 'danger', 'Please add a value');
    }
    else if (name && isEditing) {
      setList(list.map(item => {
        if (item.id === editId) {
          return { ...item, title: name, date: { year: new Date().getUTCFullYear(), month: new Date().getDate()} };
        }
        return item;
      }))
      setName('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'success', 'Task changed');
    }

    else {
      showAlert(true, 'success', 'Task added');
      const newList = { id: new Date().getTime().toString(), title: name, date: { year: new Date().getUTCFullYear(), month: new Date().getDate()} }
      setList([...list, newList]);
      setName('');
    }
  }
  function clearItems() {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  }

  function removeItems(id) {
    setList(list.filter(item => {
      return item.id !== id;
    }));
  }
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return <section className="section-center">
    <form className="grocery-form" onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
      <h3>Todo List App</h3>

      <div className="form-control">
        <input type="text"
          className="grocery"
          placeholder="task..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="submit-btn">
          {isEditing ? 'Edit' : 'Submit'}
        </button>
      </div>
    </form>
    {list.length > 0 && <List list={list} removeItems={removeItems} editItem={editItem} />}
    <button className="clear-btn" onClick={clearItems}>
      Clear Items
    </button>
  </section>
}

export default App;
