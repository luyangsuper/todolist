// @flow
import React from 'react'
import Item from './Item'
import {Input,Button} from 'antd'
import style from './Todo.module.css';
type State = {
  todolist: Array<Object>,
  text: string,
  disabled: boolean
}

type Props = {

}

class Todo extends React.Component<Props,State>{
  state: State
  constructor(props){
    super(props)
    this.state = {
      todolist: [],
      text: '',
      disabled: true
    };
    this.editText = this.editText.bind(this)
    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.editItem  = this.editItem.bind(this)
  }
  componentDidUpdate(preProps: Object,preState: Object){
    if(preState.todolist.length !== this.state.todolist.length && preState.todolist.length !== 0){
      localStorage.setItem('todolist',JSON.stringify(this.state))
    }else{
      let flag = false;
      for(let i=0; i<preState.todolist.length; i++){
        if(preState.todolist[i].text !== this.state.todolist[i].text){
          flag = true
        }
      }
      if(flag === true){
        localStorage.setItem('todolist',JSON.stringify(this.state))
      }
    }
  }
  editText(event: any){
    this.setState({
      text: event.target.value
    })
    if(event.target.value.trim() !== ''){
      this.setState({
        disabled: false
      })
    }else{
      this.setState({
        disabled: true
      })
    }
  }a
  addItem(){
    if(this.state.text.trim() !== ''){
      const newTodolist = [...this.state.todolist,{id:Math.random(),text: this.state.text,time: new Date().toLocaleString()}]
      this.setState({
        todolist: newTodolist,
        text: '',
        disabled: true
      })
    }
  }
  editItem(text: string,editIndex: number){
    const id = this.state.todolist[editIndex].id
    const newTodolist = [...this.state.todolist]
    const time = new Date().toLocaleString()
    newTodolist.splice(editIndex,1,{id,text,time})
    this.setState({
      todolist: newTodolist
    })
  }
  deleteItem(index: number){
    const newTodolist = [...this.state.todolist]
    newTodolist.splice(index,1)
    this.setState({
      todolist: newTodolist
    })
  }
  componentDidMount(){
    const state = JSON.parse(localStorage.getItem('todolist'))
    this.setState(state)
  }
  render(): React.Element<any>{
    return (
      <div className={style.main}>
        <h1>To-Do List</h1>
        <div className={style.head}>
            <Input type='text' placeholder='请输入待办事项' value={this.state.text} onChange={this.editText}></Input>
            <Button type='primary' disabled={this.state.disabled} onClick={this.addItem}>提交</Button>
        </div>
        <div className={style.body}>
          {this.state.todolist.map((e,index)=><Item key={e.id} index={index} text={e.text} time={e.time} editItem={this.editItem} deleteItem={this.deleteItem}></Item>)}
        </div>
      </div>
    )
  }
}

export default Todo;
