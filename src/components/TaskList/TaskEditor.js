import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Article from 'grommet/components/Article';
import Headline from 'grommet/components/Headline';
import Form from 'grommet/components/Form';
import Section from 'grommet/components/Section';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import Pulse from 'grommet/components/icons/Pulse';
import taskValidator from './taskValidator';
import taskDefinition from './taskDefinition';

import '!style-loader!css-loader!sass-loader!./TaskEditor.scss'; // eslint-disable-line

export default class TaskEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.tasks,
      modalOpen: false,
    };
  }

  generateComponentsFromSchema(definition) {
    const schema = definition.properties;
    const settings = _.keys(schema);
    let components = [];
    if (schema && settings) {
      components = settings.map((settingName) => {
        const setting = schema[settingName];
        const settingType = schema[settingName].type;
        switch (settingType) {
          case 'string':
            return (
              <TextInput
                key={settingName}
                className={_.snakeCase(settingName)}
                placeHolder={_.startCase(settingName)}
              />
            );
          default:
            console.warn('Unknown setting', settingName); // eslint-disable-line no-console
            return '';
        }
      });
    }
    return (
      <Form
        plain
      >
        <Section
          direction="column"
          alignContent="center"
        >
          {components}
        </Section>
      </Form>
    );
  }

  render() {
    return (
      <Article
        direction="column"
        alignContent="center"
        pad="large"
        className="task-editor"
        colorIndex="neutral-1-a"
      >
        <Headline>
              NEW TASK
        </Headline>
        {this.generateComponentsFromSchema(taskDefinition)}
      </Article>

    );
  }
}

TaskEditor.propTypes = {
  addTask: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object),
};

TaskEditor.defaultProps = {
  tasks: [],
};
