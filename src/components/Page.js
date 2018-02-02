import React from 'react'
import Feed from 'components/Feed'
import { Filters, GoToTop } from 'components/Filters'
import './page.css'

export default () => (
  <section>
    <header>
      <Filters />
      <GoToTop />
    </header>
    <main className="Page">
      <Feed />
    </main>
  </section>
)
