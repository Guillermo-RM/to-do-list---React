import PropTypes from 'prop-types';
function FilterBtn({ item, showFilterWindow, deleteFilter, filterClassSelector, classStyles}) {

  return (
  <div className="d-inline-flex align-items-center flex-column gap-1 bg-white rounded p-1 me-1 my-1">
    <div>
        <button 
            onClick={() => showFilterWindow(item.filter)} 
            className="text-decoration-none btn px-1 py-0 fw-medium bg-white me-1"
            aria-label='Acciona el filtrado de tareas'>
            {item.filter}
        </button>
        <button 
            onClick={() => deleteFilter(item.id)} 
            className="text-decoration-none btn text-danger py-0 px-1 fw-bold"
            aria-label='Elimina el filtro'>
            X
        </button>
    </div>
    <div>
        <div>
            <button onClick={()=> filterClassSelector(classStyles.classDanger, item.filter)} className="red-bg btn border radius-50" aria-label='Cambia los estilos de la tarea'></button>
            <button onClick={()=> filterClassSelector(classStyles.classWarning, item.filter)} className="yellow-bg btn border radius-50" aria-label='Cambia los estilos de la tarea'></button>
            <button onClick={()=> filterClassSelector(classStyles.classSuccess, item.filter)} className="green-bg btn border radius-50" aria-label='Cambia los estilos de la tarea'></button>
            <button onClick={()=> filterClassSelector(classStyles.classNormal, item.filter)} className="bg-white btn border radius-50" aria-label='Cambia los estilos de la tarea'></button>
        </div>
    </div>
  </div>
  )

}

FilterBtn.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired
  }).isRequired,
  showFilterWindow: PropTypes.func.isRequired,
  deleteFilter: PropTypes.func.isRequired,
  filterClassSelector: PropTypes.func.isRequired,
  classStylesc: PropTypes.shape({
    classDanger: PropTypes.object,
    classWarning: PropTypes.object,
    classSuccess: PropTypes.object,
    classNormal: PropTypes.object,
  })
}

export default FilterBtn