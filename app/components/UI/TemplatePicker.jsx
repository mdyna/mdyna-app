import React, { PureComponent } from 'react';
import { Menu } from 'grommet';
import { Down } from 'grommet-icons';
import PropTypes from 'prop-types';


import TEMPLATES from './MarkdownTemplates';

export default class TemplatePicker extends PureComponent {
  render() {
    const {
      onClick,
    } = this.props;
    const templateKeys = Object.keys(TEMPLATES);
    return (
      <Menu
        justifyContent="center"
        className="boards-menu"
        dropBackground="dark-2"
        icon={<Down color="brand" />}
        dropAlign={{ top: 'bottom' }}
        items={[
          ...templateKeys.map(
            (key) => {
              const template = TEMPLATES[key];
              return {
                label: template.title,
                onClick: () => onClick(template.text),
              };
            },
          ),
        ]}
      />
    );
  }
}

TemplatePicker.propTypes = {
  onClick: PropTypes.func.isRequired,
};
