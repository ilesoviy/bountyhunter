import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

const SearchBox = forwardRef(function SearchBox(props, ref) {

  const [keyword, setKeyword] = useState('');

  const handleKeyword = useCallback((ev) => {

  })

  useImperativeHandle(ref, () => {
    return {
      getKeyword() {
        return keyword;
      },

    }
  });

  return (
    <div>
      <input type='text' value={keyword} />
    </div>
  );
});

export default SearchBox;
