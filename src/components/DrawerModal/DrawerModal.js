import React from 'react'
import './DrawerModal.css'
import Navigation from '../../pages/Navigation';
import SearchMenu from '../../pages/SearchMenu';

export default function DrawerModal({title, setTitle}) {
  const closeHandle=()=>{
    setTitle(null);
  }
  const NavigationHandler=(title)=>{
    switch(title) {
      case 'Navigate':
        // code block
        return <Navigation/> ;
      case 'Search':
        // code block
        return <SearchMenu/>;
      case 'Show':
        // code block
        break;
      case 'Filter':
        // code block
        break;
      case 'Template':
        // code block
        break;
      default:
        return <span>Please Select Proper tab</span>
    }
  }
  return (
    <div className='DrawerModalParent'>
      <div className="headingSection">
        <span id='heading'>{title}</span>
        <span class="material-symbols-outlined" onClick={closeHandle} style={{cursor:'pointer'}}> close</span>
      </div>
      <div className="contentsection">
      {NavigationHandler(title)}

      </div>
    </div>
  )
}
