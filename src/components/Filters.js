import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Icon } from 'logos'
import { selectTags, toggleTag } from 'ducks/tags'
import { selectHosts, toggleHost, onlyHost } from 'ducks/hosts'

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

const Filters = ({ tags, hosts, toggleHost, toggleTag, onlyHost }) => (
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
export default connect(mapStateToProps, mapDispatchToProps)(Filters)