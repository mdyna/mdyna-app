import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Article from 'grommet/components/Article';
import Headline from 'grommet/components/Headline';
import Form from 'grommet/components/Form';
import CheckBox from 'grommet/components/CheckBox';
import Select from 'grommet/components/Select';
import FormFields from 'grommet/components/FormFields';
import DateTime from 'grommet/components/DateTime';
import FormField from 'grommet/components/FormField';
import Section from 'grommet/components/Section';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import TaskPreview from '../../containers/TaskPreview';
import MarkdownEditor from '../../containers/MarkdownEditor';
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
    const newEditorSettings = newProps && newProps.editorSettings;
    const { editorSettings } = this.props;
    return (
      newEditorSettings.schedule !== editorSettings.schedule ||
      newEditorSettings.color !== editorSettings.color ||
      newEditorSettings.id !== editorSettings.id
    );
  }

  generateComponentsFromUiSchema(settingName, settingUiSchema) {
    const { changeTaskSetting } = this.props;
    const settingValue = this.state.editorSettings[settingName];
    switch (settingUiSchema) {
      case 'date':
        return (
          <FormField
            label={_.startCase(settingName)}
            htmlFor={_.snakeCase(settingName)}
            key={_.startCase(settingName)}
          >
            <DateTime
              key={settingName}
              id={_.snakeCase(settingName)}
              step={1}
              onChange={e => changeTaskSetting(_.snakeCase(settingName), e)}
              value={settingValue || new Date()}
            />
          </FormField>
        );
      case 'textarea':
        return (
          <div key={settingName} className="editor-with-preview">
            <MarkdownEditor
              className={'task-text-editor'}
              visibility={{ preview: false }}
            />
            <TaskPreview />
          </div>
        );
      case 'color':
        return (
          <FormField
            label={_.startCase(settingName)}
            htmlFor={_.snakeCase(settingName)}
            key={_.startCase(settingName)}
          >
            <input
              key={settingName}
              id={_.snakeCase(settingName)}
              type="color"
              value={settingValue || '#4e636e'}
              onChange={e => changeTaskSetting(_.snakeCase(settingName), e.target.value)}
            />
          </FormField>
        );
      default:
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
    }
  }

  generateComponentsFromType(definition) {
    const { changeTaskSetting } = this.props;
    const schema = definition.properties;
    const settings = _.keys(schema);
    let components = [];
    if (schema && settings) {
      components = settings.map((settingName) => {
        const setting = schema[settingName];
        const settingType = setting.type;
        const settingUiSchema = setting.uiSchema;
        switch (settingType) {
          case 'enum':
            return (
              <FormField
                label={_.startCase(settingName)}
                htmlFor={_.snakeCase(settingName)}
                key={_.startCase(settingName)}
              >
                <Select
                  key={settingName}
                  id={_.snakeCase(settingName)}
                  placeHolder={_.startCase(settingName)}
                  options={[...this.props.categories, 'Create New']}
                />
              </FormField>
            );
          case 'string':
            return this.generateComponentsFromUiSchema(settingName, settingUiSchema);
          case 'bool':
            return (
              <FormField htmlFor={_.snakeCase(settingName)} key={_.startCase(settingName)}>
                <CheckBox
                  key={settingName}
                  toggle
                  id={_.snakeCase(settingName)}
                  label={_.startCase(settingName)}
                  onChange={e => changeTaskSetting(_.snakeCase(settingName), e.target.checked)}
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
      <Article
        direction="column"
        alignContent="center"
        pad="large"
        className="task-editor"
        full={'horizontal'}
      >
        <Headline>NEW TASK</Headline>
        {this.generateComponentsFromType(taskDefinition)}
      </Article>
    );
  }
}

TaskEditor.propTypes = {
  addTask: PropTypes.func.isRequired,
  changeTaskSetting: PropTypes.func.isRequired,
  editorSettings: PropTypes.object.isRequired,
  categories: PropTypes.array,
};

TaskEditor.defaultProps = {
  categories: [],
};
