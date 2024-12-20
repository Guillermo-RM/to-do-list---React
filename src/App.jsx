import { gsap } from 'gsap';
import { useEffect, useState, useReducer, useRef } from 'react'
import Warning from './components/Warning';
import FilterBtn from './components/FilterBtn';
import Task from './components/Task';

export default function Practice (){

  const initialTaskArray = () => { // extract information from local storage
    const localStorageArray = localStorage.getItem('tasks');
    return localStorageArray ? JSON.parse(localStorageArray) : [];
  }

  const initialFilterArray = () => { // extract information from local storage
    const filters = localStorage.getItem('filters');
    return filters ? JSON.parse(filters) : [] 
  }

  const initialState = {
    inputValue:'',
    inputType:'',
    inputTaskFilter:'',
    taskArray: initialTaskArray(),
    filtersArray:initialFilterArray(),
    filterWindow:[],
    editTaskId: null
  }

  const classStyles = {
    classDanger: {
      container: 'red-bg border d-flex justify-content-between mb-1 rounded',
      task: 'p-0 m-0 p-2 fw-medium text-white',
      type:'p-0 m-0 text-white',
      btnEdit: 'bi bi-pencil-square text-white',
      btnDelete: 'bi bi-trash-fill text-white fs-5'
    },
    classWarning: {
      container: 'yellow-bg border d-flex justify-content-between mb-1 rounded',
      task: 'p-0 m-0 p-2 fw-medium',
      type:'p-0 m-0',
      btnEdit: 'bi bi-pencil-square',
      btnDelete: 'bi bi-trash-fill text-danger fs-5'
    },
    classSuccess: {
      container: 'green-bg border d-flex justify-content-between mb-1 rounded',
      task: 'p-0 m-0 p-2 fw-medium',
      type:'p-0 m-0',
      btnEdit: 'bi bi-pencil-square text-danger',
      btnDelete: 'bi bi-trash-fill text-danger fs-5'
    },
    classNormal: {
      container: 'bg-white border d-flex justify-content-between mb-1 rounded',
      task: 'p-0 m-0 p-2 fw-medium',
      type:'p-0 m-0',
      btnEdit: 'bi bi-pencil-square',
      btnDelete: 'bi bi-trash-fill text-danger fs-5'
    }
  }

  const [showWarning, setShowWarning] = useState(false); // validation alerts
  const [currentFilter, setCurrentFilter] = useState('sin filtro'); // the current filter of the filtered tasks
  const taskRef = useRef([]); //gsap
  const filterRef = useRef([]); //gsap
  const filterWindowRef = useRef([]); //gsap
  const [state, dispatch] = useReducer(reducer, initialState);
  const isEmpty = state.filterWindow.length === 0;
  const filterCheking = state.taskArray.some(item => item.type === 'sin filtro' && state.filtersArray.length !== 0) //

  function reducer (state, action){
    switch(action.type){
      case 'SET_INPUT_VALUE':
        return {...state, inputValue: action.payload };

      case 'SET_INPUT_TYPE' :
        return {...state, inputType: action.payload}

      case 'SET_TASK_TO_ARRAY':
        return {...state, taskArray: action.payload}
      
      case 'UPDATE_TASK_ARRAY':
        return {...state, taskArray: action.payload}

      case 'SET_INPUT_TASK_FILTER':
        return {...state, inputTaskFilter: action.payload}
      
      case 'SET_FILTER_TO_ARRAY':
        return {...state, filtersArray: action.payload}

      case 'UPDATE_FILTER_ARRAY':
        return {...state, filtersArray: action.payload}
      
      case 'SET_WINDOW_ARRAY':
        return {...state, filterWindow: action.payload}

      case 'EDIT_TASK':
        return {...state, editTaskId: action.payload}

      case 'RESET_INPUTS':
        return {...state, inputValue: '', inputType: ''}
    }
  }

  function taskClassSelector (id, style) { // change the class of the task
    const newArray = state.taskArray.map(item => {
      if(item.id === id){
        item.classStyle = style;
      }
      return item
    })
    dispatch({type:'SET_TASK_TO_ARRAY', payload: newArray})
  }

  function filterClassSelector (style , filter) { // change the class of the filters
    const newArray = state.taskArray.map( item => {
      if(item.type === filter){
        item.classStyle = style
      }
      return item;
    })
    dispatch({type:'SET_TASK_TO_ARRAY', payload: newArray})
  }

  function warning () {
    setShowWarning(true)
    setTimeout(()=>{
      setShowWarning(false)
    },2000)
  }

  function handleInputValue (e) {
    const input = e.target.value;
    dispatch({type: 'SET_INPUT_VALUE', payload: input})
  }

  function handleInputType (e) {
    const input = e.target.value;
    dispatch({type: 'SET_INPUT_TYPE', payload: input})
  }

  function addTaskToArray () {
    const newType = state.inputType;
    const filterVerification = state.filtersArray.some(item => item.filter === newType);

    if(state.inputValue === '' || state.inputValue.trim() === ''){

      dispatch({type: 'RESET_INPUTS'})
      warning()

    }else if(state.editTaskId){

      const updateTask = state.taskArray.map( task => task.id === state.editTaskId ? {...task, task: state.inputValue, type: state.inputType} : task)
      dispatch({type: 'SET_TASK_TO_ARRAY', payload: updateTask})
      dispatch({type: 'EDIT_TASK', payload: ''})

      dispatch({type: 'RESET_INPUTS'})

    }else{
      if(state.inputType === '' || state.inputType.trim() === ''){

        dispatch({type: 'SET_TASK_TO_ARRAY', payload: [
          ...state.taskArray, {
            task: state.inputValue,
            type: 'sin filtro',
            id: Math.random().toString(10),
            classStyle: {
              container: 'bg-white border d-flex justify-content-between mb-1 rounded',
              task: 'p-0 m-0 p-2 fw-medium',
              type:'p-0 m-0',
              btnEdit: 'bi bi-pencil-square text-dark',
              btnDelete: 'bi bi-trash-fill text-danger fs-5'
            }
          }
        ]})
        dispatch({type: 'RESET_INPUTS'})

      }else{

        dispatch({type: 'SET_TASK_TO_ARRAY', payload: [
          ...state.taskArray, {
            task: state.inputValue,
            type: state.inputType,
            id: Math.random().toString(10),
            classStyle: {
              container: 'bg-white border d-flex justify-content-between mb-1 rounded',
              task: 'p-0 m-0 p-2 fw-medium',
              type:'p-0 m-0',
              btnEdit: 'bi bi-pencil-square',
              btnDelete: 'bi bi-trash-fill text-danger fs-5'
            }
          }
        ]})

        dispatch({type: 'RESET_INPUTS'})

        if(!filterVerification){
          dispatch({
            type: 'SET_FILTER_TO_ARRAY',
            payload: [
              ...state.filtersArray,{
                filter: newType,
                id: Math.random().toString(10),
              }
            ]
          })
        }

        dispatch({type: 'RESET_INPUTS'})
      }
    }
  }

  function editTask (item){
    dispatch({type: 'SET_INPUT_VALUE', payload: item.task})
    dispatch({type: 'SET_INPUT_TYPE', payload: item.type})
    dispatch({type: 'EDIT_TASK', payload: item.id})
  }

  function deleteTask(id) {
    const elementIndex = state.taskArray.findIndex((item) => item.id === id);
    const filterWindowIndex = state.filterWindow.findIndex((item) => item.id === id);
    const taskElement = taskRef.current[elementIndex];
    const filterWindowElement = filterWindowRef.current[filterWindowIndex];

    if (taskElement) {
      gsap.to(taskElement, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          const newTaskArray = state.taskArray.filter((item) => item.id !== id);
          dispatch({ type: 'UPDATE_TASK_ARRAY', payload: newTaskArray });
        },
      });
    }

    if (filterWindowElement) {
      gsap.to(filterWindowElement, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          const newFilterWindow = state.filterWindow.filter((item) => item.id !== id);
          dispatch({ type: 'SET_WINDOW_ARRAY', payload: newFilterWindow });
        },
      });
    }
  }

  function handleInputFilter (e) {
    const input = e.target.value.trim()
    dispatch({type:'SET_INPUT_TASK_FILTER', payload: input})
  }

  function addFilterToArray () {
    const newType = state.inputTaskFilter;
    const arrayVarification = state.filtersArray.some(item => item.filter === newType);

    if(state.inputTaskFilter === '' || state.inputTaskFilter.trim() === ''){
      warning()
      dispatch({type:'SET_INPUT_TASK_FILTER', payload:''})
    }else{
      if(arrayVarification){
        warning()
      }else{
        dispatch({type: 'SET_FILTER_TO_ARRAY',
          payload: [
            ...state.filtersArray,{
              filter: state.inputTaskFilter,
              id: Math.random().toString(10),
            }
        ]})
      }
    }
    dispatch({type:'SET_INPUT_TASK_FILTER', payload:''})
  }

  function deleteFilter(id) {
    const elementIndex = state.filtersArray.findIndex(item => item.id === id);
    const filterElemnt = filterRef.current[elementIndex];
  
    if (filterElemnt) {
      gsap.to(filterElemnt, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          const newArray = state.filtersArray.filter(item => item.id !== id);
          dispatch({ type: 'UPDATE_FILTER_ARRAY', payload: newArray });
        },
      });
    }
  }

  function showFilterWindow (value) {
    setCurrentFilter(value)
    const newArray = state.taskArray.filter(task => task.type === value)
    dispatch({
      type: 'SET_WINDOW_ARRAY',
      payload:newArray
    })
  }
 
  useEffect(()=>{ // save in local storage
    localStorage.setItem('tasks', JSON.stringify(state.taskArray))
    localStorage.setItem('filters', JSON.stringify(state.filtersArray))
  },[state.taskArray, state.filtersArray])

  useEffect(() => { //gsap
    if (state.taskArray.length > 0) {
      gsap.fromTo(
        taskRef.current[state.taskArray.length - 1],
        { opacity: 0 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
  }, [state.taskArray, taskRef]);

  useEffect(() => { //gsap
    if (state.filtersArray.length > 0) {
      gsap.fromTo(
        filterRef.current[state.filtersArray.length - 1],
        { opacity: 0 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
  }, [state.filtersArray, taskRef]);

  useEffect(() => { //gsap
    if (state.filterWindow.length > 0) {
      gsap.fromTo(
        filterWindowRef.current[state.filterWindow.length - 1],
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      );
    }
  }, [state.filterWindow, taskRef]);

  return(
    <div className='container-fluid d-flex justify-content-center'>
      <div className='w-100 row'>

        <div className='col-md-6 col-sm-12'>
          <div className='border px-3 pb-3 w-100'>
          {/* ADD TASK */}
          <h3 className='mt-1 text-center'>Agregar Tarea</h3>
          <div className='my-2'>
            <input
              placeholder='Tarea'
              value={state.inputValue}
              onChange={handleInputValue}
              type='text'
              className='w-100 p-1 mb-2 input'
            />

            <div className='d-flex align-items-center gap-1'>
              <input
                placeholder='Tipo'
                value={state.inputType}
                onChange={handleInputType}
                type='text'
                className='p-1 input'
              />
              <button className='btn bg text-white p-1' onClick={addTaskToArray}>Agregar Tarea</button>
            </div>
          </div>

          {/* ADD FILTERS */}
          <div className='my-2 d-flex align-items-center gap-1'>
            <input
              placeholder='Agregar filtro'
              value={state.inputTaskFilter}
              onChange={handleInputFilter}
              type='text'
              className='p-1 input'
            />
            <button className='btn bg text-white p-1' onClick={addFilterToArray}>Agregar Filtro</button>
          </div>
            {showWarning ? <Warning text={'Espacio'}/> : <></> }
          </div>

          {/* FILTERS */}
          <div className='my-1 d-inline-flex flex-wrap'>
            {filterCheking ? (
            <div className='d-inline-flex align-items-center flex-column gap-1 bg-white rounded p-1 me-1 my-1'>
              <div>
                  <button 
                      onClick={() => showFilterWindow('sin filtro')} 
                      className='text-decoration-none btn px-1 py-0 fw-medium bg-white me-1'>
                      sin filtro
                  </button>
              </div>
              <div>
                  <div>
                      <button onClick={()=> filterClassSelector(classStyles.classDanger, 'sin filtro')} className='red-bg btn border '></button>
                      <button onClick={()=> filterClassSelector(classStyles.classWarning, 'sin filtro')} className='yellow-bg btn border '></button>
                      <button onClick={()=> filterClassSelector(classStyles.classSuccess, 'sin filtro')} className='green-bg btn border '></button>
                      <button onClick={()=> filterClassSelector(classStyles.classNormal, 'sin filtro')} className='bg-white btn border '></button>
                  </div>
              </div>
            </div>
            ):(<></>)}


            {state.filtersArray.map((item, index) => (
              <div key={item.id} ref={(el) => (filterRef.current[index] = el)}>
                <FilterBtn item={item} showFilterWindow={showFilterWindow} deleteFilter={deleteFilter} filterClassSelector={filterClassSelector} classStyles={classStyles}/>
              </div>
            ))}
          </div>

          {/* FILTERED TASKS */}
           {isEmpty ? (<></>) : (
            <div className='p-0 m-0'>

              <div className='d-flex align-items-center justify-content-center'>
                <h3>Filtradas</h3>
                <button onClick={()=> {dispatch({type: 'SET_WINDOW_ARRAY', payload: []})}} className='btn rounded'><i className={classStyles.classNormal.btnDelete}></i></button>
              </div>

              {state.filterWindow.map((item, index) => (
                <div key={item.id} ref={(el) => (filterWindowRef.current[index] = el)}>
                  <Task item={item} deleteTask={deleteTask} editTask={editTask} taskClassSelector={taskClassSelector} classStyles={classStyles}/>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='col-md-6 col-sm-12'>
          <h3 className='text-center mt-1'>Tareas</h3>
          {state.taskArray.map((item, index)=>(
            <div key={item.id} ref={(el) => (taskRef.current[index] = el)}>
              <Task item={item} deleteTask={deleteTask} editTask={editTask} taskClassSelector={taskClassSelector} classStyles={classStyles}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}