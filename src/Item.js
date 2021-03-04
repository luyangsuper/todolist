// @flow
import React from 'react'
import {Button,Card,Input} from 'antd'
import './item.css'
type Props = {
    index: number,
    text: string,
    time: string,
    editItem: Function,
    deleteItem: Fuction
}
type State = {
    text: string,
    isEditing: boolean
}
class Item extends React.Component<Props,State>{
    state: State;
    constructor(props: Props){
        super(props);
        this.state = {
            text: props.text,
            isEditing: false,
        };
        this.cancelEdit = this.cancelEdit.bind(this)
        this.confirmEdit = this.confirmEdit.bind(this)
        this.editText = this.editText.bind(this)
        this.startEdit = this.startEdit.bind(this)
    }
    cancelEdit(){
        this.setState({
            isEditing: false,
            text: this.props.text
        })
    }
    confirmEdit(){
        this.setState({
            isEditing: false
        })
        this.props.editItem(this.state.text,this.props.index)
    }
    editText(event: SyntheticEvent<HTMLButtonElement>){
        this.setState({
            text: event.target.value
        })
    }
    startEdit(){
        this.setState({
            isEditing: true
        })
    }
    render(): React.Element<any>{
        return this.state.isEditing 
        ? (
            <Card 
            hoverable
            type='inner'
            actions={[<Button onClick={this.cancelEdit}>取消</Button>
                    ,<Button onClick={this.confirmEdit}>确定修改</Button>]}
            >
                <Input value={this.state.text} onChange={this.editText}></Input>
            </Card>
          )
        : (
            <Card 
            type='inner'
            hoverable 
            title={`上一次修改时间：${this.props.time}`}
            actions={[<Button onClick={this.startEdit}>修改</Button>
                    ,<Button danger onClick={()=>this.props.deleteItem(this.props.index)}>删除</Button>]}
            >
                <div>{this.props.text}</div>
            </Card>
          )
    }
}

export default Item;