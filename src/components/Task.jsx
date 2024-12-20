import PropTypes from 'prop-types';
function Task ({item, deleteTask, editTask, taskClassSelector, classStyles}){

  return(
    <div className={item.classStyle.container}>
        <div className="d-flex ms-1">
            <div className="d-flex flex-column">
                <div>
                    <button onClick={()=> taskClassSelector(item.id, classStyles.classDanger)} className="red-bg btn border" aria-label='Cambia los estilos de la tarea'></button>
                    <button onClick={()=> taskClassSelector(item.id, classStyles.classWarning)} className="yellow-bg btn border" aria-label='Cambia los estilos de la tarea'></button>
                </div>
                <div>
                    <button onClick={()=> taskClassSelector(item.id, classStyles.classSuccess)} className="green-bg btn border" aria-label='Cambia los estilos de la tarea'></button>
                    <button onClick={()=> taskClassSelector(item.id, classStyles.classNormal)} className="bg-white btn border" aria-label='Cambia los estilos de la tarea'></button>
                </div>
            </div>                
            <p className={item.classStyle.task}>{item.task}</p>
        </div>

        <div className="d-flex gap-1 align-items-center">

            <p className={item.classStyle.type}>{item.type}</p>


            <button onClick={() => editTask(item)} className='m-0 btn p-1 fs-5'><i className={item.classStyle.btnEdit} aria-label='Edita la tarea'></i></button>

            <button onClick={() => deleteTask(item.id)} className='m-0 btn p-1'><i className={item.classStyle.btnDelete} aria-label='Elimina la tarea'></i></button>
        </div>
    </div>
  )

}

Task.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    classStyles: PropTypes.shape({
      btnDelete: PropTypes.string.isRequired,
      btnEdit: PropTypes.string.isRequired,
      container: PropTypes.string.isRequired,
      task: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    })
  }).isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  taskClassSelector: PropTypes.func.isRequired,
  classStyles: PropTypes.shape({
    classDanger: PropTypes.object,
    classWarning: PropTypes.object,
    classSuccess: PropTypes.object,
    classNormal: PropTypes.object,
  })
}

export default Task;