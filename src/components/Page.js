import React from 'react'
import Feed from 'components/Feed'
import Filters from 'components/Filters'
import GoToTop from 'components/GoToTop'
import { Logo, Icon } from 'logos'
import './page.css'

const REPO = 'https://github.com/haakenlid/db-feed'

export default () => (
  <div id="pageWrapper">
    <header className="pageHeader">
      <a href="https://sol.no">
        <Logo id="pageLogo" host="sol.no" />
      </a>
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
