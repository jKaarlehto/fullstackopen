import React from 'react';

const InputForm = ({ fields, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      {Object.entries(fields).map(([key, { name, value, onChange, type = 'text' }], index) => (
        <div key={index}>
          {name}: <input type={type} value={value} onChange={onChange} />
        </div>
      ))}
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default InputForm;

