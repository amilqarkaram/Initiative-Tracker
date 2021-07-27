import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PCApp from './components/PCApp'
import TabletApp from './components/TabletApp'
import MobileApp from './components/MobileApp'
import dispatchers from './utils/dispatchers'
function App(){

  const { windowWidth } = useSelector(state => state);

  useEffect(function(){
    dispatchers.SetWindowWidth(window.innerWidth);
  },[window.innerWidth])
  
  return(
    <div>
    {windowWidth >= 640 && <PCApp /> }
    {windowWidth < 640 && windowWidth > 480 && <TabletApp /> }
    {windowWidth <= 480 && <MobileApp /> }
    </div>
  )
}

export default App;
