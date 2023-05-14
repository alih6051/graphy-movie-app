import React from 'react'

function Navbar() {
  return (
    <div className='max-w-7xl mx-auto p-3 flex justify-between align-middle'>
        <div>OMDb Movies</div>

        <div className='flex align-middle'>
            <a className='mr-5' href="/">Home</a>
            <a href="/favourites">Favourites</a>
        </div>
    </div>
  )
}

export default Navbar