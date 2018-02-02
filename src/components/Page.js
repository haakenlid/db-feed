import React from 'react'
import Feed from 'components/Feed'
import { Filters, GoToTop } from 'components/Filters'
import { Logo, Icon } from 'logos'
import './page.css'

const REPO = 'https://github.com/haakenlid/db-feed'

export default () => (
  <div id="pageWrapper">
    <header className="pageHeader">
      <Logo id="pageLogo" host="sol.no" />
      <Filters />
      <a id="githubLink" href={REPO} title="source code">
        <Icon host="github" />
      </a>
    </header>
    <GoToTop />
    <main className="Page">
      <Feed />
    </main>
  </div>
)
