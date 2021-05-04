import React, {useRef} from 'react'
import {addTodo} from '../../stores/actions'
import {useDispatch} from 'react-redux'

const AddTodo = () => {
  const input = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  return (
    <div>
      <form onSubmit={(e: any) => {
        e.preventDefault()
        if(input.current) {
          if (!input.current.value.trim()) {
            return
          }
          dispatch(addTodo(input.current.value))
          input.current.value = ''
        }
      }}>
        <input ref={input} className="mr-2" />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

export default AddTodo;