import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Icon } from 'logos'
import { selectTags, toggleTag, onlyTag } from 'ducks/tags'
import { selectHosts, toggleHost, onlyHost } from 'ducks/hosts'
import { eventHandler } from 'utils/misc'

const Host = ({ name, active, ...props }) => (
  <div
    className={classNames('Host', { active })}
    {...props}
    title={`${active ? 'skjul' : 'vis'} saker fra ${name}.no`}
  >
    <Icon host={name} />
  </div>
)

const Tag = ({ name, active, ...props }) => (
  <div
    className={classNames('Tag', { active })}
    {...props}
    title={`${active ? 'skjul' : 'vis'} kategorien ${name}`}
  >
    {name}
  </div>
)

export const Filters = ({
  tags,
  hosts,
  toggleHost,
  toggleTag,
  onlyHost,
  onlyTag,
}) => (
  <section className="Filters">
    <nav className="hosts">
      {Object.keys(hosts).map(name => (
        <Host
          key={name}
          name={name}
          active={hosts[name]}
          onClick={e => toggleHost(name)}
          onDoubleClick={eventHandler(onlyHost, name)}
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
          onDoubleClick={eventHandler(onlyTag, name)}
        />
      ))}
    </nav>
  </section>
)
const mapStateToProps = state => ({
  tags: selectTags(state),
  hosts: selectHosts(state),
})
const mapDispatchToProps = {
  toggleTag,
  onlyTag,
  toggleHost,
  onlyHost,
}
export default connect(mapStateToProps, mapDispatchToProps)(Filters)
