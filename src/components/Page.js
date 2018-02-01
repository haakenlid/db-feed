import React from 'react'
import Feed from 'components/Feed'
import Filters from 'components/Filters'
import './page.css'

export default () => (
  <section>
    <header>
      <Filters />
    </header>
    <main className="Page">
      <Feed />
    </main>
  </section>
)
