import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  // useCallback + debounce: pastikan fungsi ini stabil (tidak berubah tiap render)
  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 300),
    [] // dependency kosong → fungsi dibuat sekali saja
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    debouncedSearch(value); // kirim ke parent setelah jeda
  };

  return (
    <input
      type="text"
      placeholder="Cari produk..."
      value={input}
      onChange={handleChange}
      style={{
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        marginBottom: '16px',
      }}
    />
  );
};

export default SearchBar;