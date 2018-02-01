import React from 'react'
import Feed from 'components/Feed'
import Filters from 'components/Filters'
import LoadingIndicator from 'components/LoadingIndicator'
import './page.css'

export default () => (
  <section>
    <header>
      <Filters />
      <LoadingIndicator />
    </header>
    <main className="Page">
      <Feed />
    </main>
  </section>
)
