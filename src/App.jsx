import { useState } from "react"

function App() {
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState({ no: 0, task: "" })
  const [error, setError] = useState("")

  const formHandler = ({ target }) => {
    setForm({ no: tasks.length + 1, task: target.value })
    if(form.task.length > -1) setError("")
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if(form.task.length > 0) {
      const check = tasks.find((todo) => todo.task === form.task )
      if(!check) {
        setTasks([...tasks, form])
        setForm({ no: 0, task: "" })
      }
      else setError("task already noted")
    } else {
      setError("Task can't be empty")
    }
  }

  const deleteHandler = (idx) => {
    setTasks(tasks.filter((_, index) => index !== idx))
  }

  return (
    <div className="flex justify-center h-screen items-center font-sans">
      <div className="bg-gray-100 shadow-lg px-5 py-4 rounded-lg">
        <h1 className="text-xl font-semibold text-center">SIMPLE TODO LIST</h1>
        <div>
          <form onSubmit={submitHandler} className="mt-3">
            <input onChange={formHandler} value={form.task} name="task" className="mr-3 border border-gray-400 px-2 py-1" placeholder="add new task" />
            <button className="bg-blue-500 px-3 py-1 text-white rounded-sm">ADD</button>
          </form>
          <div className={`${error ? 'visible' : 'hidden'} w-full bg-red-400 mt-2 text-xs text-white font-semibold px-1 py-1 rounded-md`}>
            <span>{error}</span>
            </div>
        </div>
        <div>
          <table className="mt-3 w-full">
            <thead>
              <tr>
                <th className="border border-black w-1/5">No.</th>
                <th className="border border-black">Task</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((todo, idx) => (
                <tr key={idx}>
                  <td className="text-center border border-gray-400 bg-white">{todo.no}</td>
                  <td className="border border-gray-400 px-2 h-10 items-center bg-white flex justify-between">
                    {todo.task} 
                    <span><button onClick={() => deleteHandler(idx)} className="text-xs text-white font-semibold bg-red-500 px-2 py-1 rounded-md">
                      DELETE
                    </button></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
