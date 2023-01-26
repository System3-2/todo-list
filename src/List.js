import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';

const List = ({ list, removeItems, editItem }) => {
  return <div className='grocery-list'>
    {list.map((item) => {
      const { id, title, date } = item;
      return <article key={id} className="grocery-item">
        <p className='title'>{title}</p>
        <small>{date.year} {date.month} {date.time}</small>
        <div className='btn-container'>
          <button
            type='button'
            className='edit-btn'
            onClick={() => editItem(id)}
          >
            <FaEdit />
          </button>
          <button
            type='button'
            className='delete-btn'
            onClick={() => removeItems(id)}
          >
            <FaTrash />
          </button>
        </div>
      </article>
    })}
  </div>
}

export default List
