import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Article from 'grommet/components/Article';
import Headline from 'grommet/components/Headline';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Section from 'grommet/components/Section';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
// import taskValidator from './taskValidator';
import taskDefinition from './taskDefinition.json';

import '!style-loader!css-loader!sass-loader!./TaskEditor.scss'; // eslint-disable-line

export default class TaskEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      editorSettings: this.props.editorSettings,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      this.setState({
        editorSettings: newProps.editorSettings,
      });
    }
  }

  shouldComponentUpdate(newProps) {
    return newProps.editorSettings.id !== this.props.editorSettings.id;
  }

  generateComponentsFromSchema(definition) {
    const { changeTaskSetting } = this.props;
    const schema = definition.properties;
    const settings = _.keys(schema);
    let components = [];
    if (schema && settings) {
      components = settings.map((settingName) => {
        const setting = schema[settingName];
        const settingType = setting.type;
        switch (settingType) {
          case 'string':
            return (
              <FormField
                label={_.startCase(settingName)}
                htmlFor={_.snakeCase(settingName)}
                key={_.startCase(settingName)}
              >
                <TextInput
                  key={settingName}
                  id={_.snakeCase(settingName)}
                  placeHolder={_.startCase(settingName)}
                  onDOMChange={e => changeTaskSetting(_.snakeCase(settingName), e.target.value)}
                />
              </FormField>
            );
          default:
            console.warn('Unknown setting', settingName); // eslint-disable-line no-console
            return '';
        }
      });
    }
    return this.renderTaskForm(components);
  }

  renderTaskForm(components) {
    return (
      <Form plain>
        <Section direction="column" alignContent="center">
          <FormFields>{components}</FormFields>
        </Section>
        <Button
          label="Submit"
          primary
          onClick={() => this.props.addTask(this.state.editorSettings)}
        />
      </Form>
    );
  }

  render() {
    return (
      <Article direction="column" alignContent="center" pad="large" className="task-editor">
        <Headline>NEW TASK</Headline>
        {this.generateComponentsFromSchema(taskDefinition)}
      </Article>
    );
  }
}

TaskEditor.propTypes = {
  addTask: PropTypes.func.isRequired,
  changeTaskSetting: PropTypes.func.isRequired,
  editorSettings: PropTypes.shape().isRequired,
};
