import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Icon } from 'logos'
import { selectTags, toggleTag } from 'ducks/tags'
import { selectHosts, toggleHost, onlyHost } from 'ducks/hosts'
import './filters.css'

const Host = ({ name, active, ...props }) => (
  <div className={classNames('Host', { active })} {...props}>
    <Icon host={name} />
  </div>
)

const Tag = ({ name, active, ...props }) => (
  <div className={classNames('Tag', { active })} {...props}>
    {name}
  </div>
)

export const GoToTop = () => (
  <nav className="GoToTop" onClick={e => window.scrollTo(0, 0)}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <path d="M512 530L320 338 128 530 0 402 320 82l320 320z" />
    </svg>
  </nav>
)

const FilterComponent = ({ tags, hosts, toggleHost, toggleTag, onlyHost }) => (
  <section className="Filters">
    <nav className="hosts">
      {Object.keys(hosts).map(name => (
        <Host
          key={name}
          name={name}
          active={hosts[name]}
          onClick={e => {
            toggleHost(name)
          }}
          onDoubleClick={e => {
            e.stopPropagation()
            e.preventDefault()
            onlyHost(name)
          }}
        />
      ))}
    </nav>
    <nav className="tags">
      {Object.keys(tags).map(name => (
        <Tag
          key={name}
          name={name}
          active={tags[name]}
          onClick={e => toggleTag(name)}
        />
      ))}
    </nav>
  </section>
)
const mapStateToProps = (state, ownProps) => ({
  tags: selectTags(state),
  hosts: selectHosts(state),
})
const mapDispatchToProps = {
  toggleTag,
  toggleHost,
  onlyHost,
}
export const Filters = connect(mapStateToProps, mapDispatchToProps)(
  FilterComponent
)
