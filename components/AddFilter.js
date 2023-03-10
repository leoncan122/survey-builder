import React, { useState } from "react";

const AddFilter = ({ setShowModalFilter, setFilters, selected }) => {
  const [expression, setExpression] = useState('')
  const [operator, setOperator] = useState('')

  const operatorFunctions = {
    greater: {
      symbol: 'More than',
      expression: expression,
      resultKey: selected.valueName,
      fn: (result, key, expression) => result[key] > expression
      },
    smaller: {
      symbol: 'Less than',
      expression: expression,
      resultKey: selected.valueName,
      fn: (result, key, expression) =>  result[key] < expression
    },
    equal: {
      symbol: 'Equal to',
      expression: expression,
      resultKey: selected.valueName,
      fn: (result, key, expression) => result[key] == expression
    },
    notEqual: {
      symbol: 'Not equal to',
      expression: expression,
      resultKey: selected.valueName,
      fn: (result, key, expression) => result[key] != expression
    },
    // and: {
    //   symbol: 'and',
    //   fn: (expressionA, expressionB) => (expressionA) expressionA && expressionB},
    // or: {
    //   symbol: 'or',
    //   fn:  (expressionA, expressionB) => (expressionA) expressionA || expressionB},
  }
  const closeModal = () => setShowModalFilter(false)

  const addFilter = () => {
    Object.values(operatorFunctions).forEach(op => op.symbol === operator && setFilters(prev => ([...prev, op])));
    closeModal()
  }
  return (
   <>
    <div className="modal-filter " >
    <div className="modal-contenido">
      <div className="modal-heading">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Add new filter</h1>
      </div>
      <div className="modal-body">
        <form>
            {/* <label  className="col-form-label">2. Add Expression</label> */}
          
          <div className="mb-3 d-flex gap-2">
            <span>{selected?.valueName}</span>
            <select class="form-select" 
            onChange={(e) => setOperator(e.target.value)}
            aria-label="select">
                <option value={''} disabled />
              {Object.values(operatorFunctions).map((operator, index) => (
                <option value={operator.symbol} key={index} 
            // onChange={(e) => console.log(e.target.value)}
            >{operator.symbol}</option>
              ))}
            </select>

            <input className="form-input" 
            onChange={(e) => setExpression(e.target.value)}
            />

          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={(e) => closeModal()}>Close</button>
        <button type="button" className="btn btn-primary" onClick={() => addFilter()}>Add filter</button>
      </div>
    </div>
</div>
   </>
  );
};

export default AddFilter;
