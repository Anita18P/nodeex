import {Router} from 'express';
const router=Router();
import {Todo} from '../models/todo';
type RequestBody={text:string};
type RequestParams={todoId:string};

const todos:Todo[]=[];

router.get('/',(req,res,next)=>{
  res.status(200).json({todos:todos,message:"success"});
})

router.post('/todo',(req,res,next)=>{
    const body=req.body as RequestBody;
    const newTodo:Todo={
        id:new Date().toISOString(),
        text:body.text
    };
    todos.push(newTodo);
    res.status(201).json({message:"Added to do",todo:newTodo,todos:todos});


})

router.put('/todo/:todoId',(req,res,next)=>{
    const params=req.params as RequestParams;
    const tid=params.todoId;
    const body=req.body as RequestBody;
    const todoIndex=todos.findIndex(todoItem=>todoItem.id===tid);
    if(todoIndex>=0){
      todos[todoIndex]={
        id:todos[todoIndex].id,
        text:body.text
      }
      return res.status(200).json({message:"update todo",todos:todos});
    }
    res.status(404).json({message:'could not find todo for this id'});
})

router.delete('/todo/:todoId',(req,res,next)=>{
    const params=req.params as RequestParams;
    const todo=todos.filter(todoItem=>todoItem.id!==params.todoId);
    res.status(200).json({message:'Deleted todo',todos:todos});
})


export default router;