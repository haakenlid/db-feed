import React from 'react'
import Feed from 'components/Feed'
import Filters from 'components/Filters'
import Story from 'components/Story'
import GoToTop from 'components/GoToTop'
import { Logo, Icon } from 'logos'

const SOL = 'https://sol.no'
const PageLogo = () => (
  <a href={SOL} title="sol.no">
    <Logo id="pageLogo" host="los.no" />
  </a>
)

const REPO = 'https://github.com/haakenlid/db-feed'
const GitHubLogo = () => (
  <a id="githubLink" href={REPO} title="source code">
    <Icon host="github" />
  </a>
)

export const Header = () => [
  <header key="header" className="pageHeader">
    <PageLogo />
    <Filters />
    <GitHubLogo />
  </header>,
  <GoToTop key="GoToTop" />,
]

const Page = () => (
  <div id="pageWrapper">
    <Header />
    <main className="Page">
      <Story />
      <Feed />
    </main>
  </div>
)
export default Page
