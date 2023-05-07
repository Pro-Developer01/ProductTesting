import React, { useState, useRef } from 'react';

const Notes = () => {
  const [notes, setNotes] = useState(['']);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const textareaRef = useRef(null);

  const handleNoteChange = (index, event) => {
    const { value } = event.target;

    if (event.key === 'Enter' && value.trim() !== '') {
      const newNotes = [...notes];
      newNotes.splice(index + 1, 0, '');
      setNotes(newNotes);
    } else {
      const newNotes = [...notes];
      newNotes[index] = value;
      setNotes(newNotes);
    }

    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };


  
  const handleDragStart = (index, event) => {
    event.dataTransfer.setData('text/plain', index);
  };

  const handleDrop = (targetIndex, event) => {
    const sourceIndex = event.dataTransfer.getData('text/plain');
    const newNotes = [...notes];
    const [removed] = newNotes.splice(sourceIndex, 1);
    newNotes.splice(targetIndex, 0, removed);
    setNotes(newNotes);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = notes.map((note) => {
      const regex = new RegExp(searchTerm, 'gi');
      const match = note.match(regex);
      return match ? note.replace(regex, `<mark>${match[0]}</mark>`) : note;
    });

    setSearchResults(results);
  };

  const [hoveredRow, setHoveredRow] = useState(null);

  const handleMouseEnter = (rowIndex) => {
    setHoveredRow(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };


  return (
    <div style={{marginLeft:'-30px'}}>
      <table>
        <tbody>
          {searchResults.length > 0
            ? searchResults.map((note, index) => (
                <tr
                  key={index}
                  onDrop={(event) => handleDrop(index, event)}
                  onDragOver={(event) => event.preventDefault()}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <td>
                    <div
                      draggable
                      onDragStart={(event) => handleDragStart(index, event)}
                      style={{
                        visibility: hoveredRow === index ? 'visible' : 'hidden',
                        cursor: 'move',
                        width: '20px',
                        height: '20px',
                        background: '#eee',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      &#x2630; {/* Unicode for hamburger icon */}
                    </div>
                  </td>
                  <td>
                    <div
                      dangerouslySetInnerHTML={{ __html: note }}
                      style={{ padding: '5px' }}
                    />
                  </td>
                  <td>
                    <div>
                      <select
                        defaultValue="edit"
                        onChange={(event) => {
                          const newNotes = [...notes];
                          if (event.target.value === 'insert') {
                            newNotes.splice(index + 1, 0, '');
                          } else if (event.target.value === 'delete') {
                            newNotes.splice(index, 1);
                          }
                          setNotes(newNotes);
                        }}
                      >
                        <option disabled value="edit">
                          Edit
                        </option>
                        <option value="insert">Insert</option>
                        <option value="delete">Delete</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))
            : notes.map((note, index) => (
                <tr
                  key={index}
                  onDrop={(event) => handleDrop(index, event)}
                  onDragOver={(event) => event.preventDefault()}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <td>
  <div
    draggable
    onDragStart={(event) => handleDragStart(index, event)}
    style={{
      visibility: hoveredRow === index ? 'visible' : 'hidden',
      cursor: 'move',
      width: '20px',
      height: '20px',
      background: '#eee',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    &#x2630; {/* Unicode for hamburger icon */}
  </div>
</td>
<td style={{padding:'0 5px'}}>
  <div style={{ width: '15px', height: '15px', backgroundColor: '#ff6404', borderRadius: '50%' }}></div>
</td>
<td>
  <textarea
    ref={textareaRef}
    value={note}
    onChange={(event) => handleNoteChange(index, event)}
    onKeyDown={(event) => handleNoteChange(index, event)}
    placeholder="Write here"
    style={{
      width: '190%',
      resize: 'none',
      overflow: 'hidden',
      wordWrap: 'break-word',
    }}
    autoFocus={index === notes.length - 1}
  />
</td>
<td>
  <div style={{ marginLeft: '140px' }}>
    <select
      defaultValue="edit"
      onChange={(event) => {
        const newNotes = [...notes];
        if (event.target.value === 'insert') {
          newNotes.splice(index + 1, 0, '');
        } else if (event.target.value === 'delete') {
          newNotes.splice(index, 1);
        }
        setNotes(newNotes);
      }}
    >
      <option disabled value="edit">
        Edit
      </option>
      <option value="insert">Insert</option>
      <option value="delete">Delete</option>
    </select>
  </div>
</td>

                </tr>
              ))}
        </tbody>
      </table>

      {/* <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search..."
        />
        <button onClick={handleSearch}>Search</button>
      </div> */}
    </div>
  );
};

export default Notes;
