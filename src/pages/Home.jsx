import { useState } from 'react';
import Header from '../components/Header';
import TodoList from '../components/TodoList';

export default function Home() {
  const [isRefresh, setIsRefresh] = useState(true)

  const setRefresh = (status) => {
    setIsRefresh(status)
  }

  return (
    <>
    <div className="App">
      <div className="content">
        <Header setRefresh={setRefresh} />
        <TodoList setRefresh={setRefresh} isRefresh={isRefresh} />
      </div>
    </div>
    </>
  )
}
