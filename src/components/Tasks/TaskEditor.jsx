import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Article from 'grommet/components/Article';
import Headline from 'grommet/components/Headline';
import Form from 'grommet/components/Form';
import CheckBox from 'grommet/components/CheckBox';
import Select from 'grommet/components/Select';
// import RadioButton from 'grommet/components/RadioButton';
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

const EDIT_TASK = taskID => `${window.serverHost}/task/${taskID}/edit`;
export default class TaskEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      newEditorSettings.repeat !== editorSettings.repeat ||
      newEditorSettings.repeatAlert !== editorSettings.repeatAlert ||
      newEditorSettings.taskId !== editorSettings.taskId
    );
  }

  getSettingsComponent(settings, schema) {
    return settings.map((settingName) => {
      const setting = schema[settingName];
      const settingType = setting.type;
      const settingUiSchema = setting.uiSchema;
      const { changeTaskSetting } = this.props;
      const enums = (setting.enums && [...setting.enums]) || null;
      switch (settingType) {
        case 'enum':
          return (
            <FormField
              label={_.startCase(settingName)}
              htmlFor={_.snakeCase(settingName)}
              key={_.startCase(settingName)}
            >
              {
                enums ?
                  <Select
                    key={settingName}
                    id={_.snakeCase(settingName)}
                    onChange={e => changeTaskSetting(_.camelCase(settingName), e.option)}
                    placeHolder={_.startCase(settingName)}
                    value={this.state.editorSettings[settingName]}
                    options={[...enums]}
                  />
                    :
                  <Select
                    key={settingName}
                    id={_.snakeCase(settingName)}
                    onChange={e => changeTaskSetting(_.camelCase(settingName), e.target.checked)}
                    placeHolder={_.startCase(settingName)}
                    options={[...this.props.categories, 'Create New']}
                  />
              }
            </FormField>
          );
        case 'string':
          return this.generateComponentsFromUiSchema(settingName, settingUiSchema);
        case 'bool':
          return (
            <FormField htmlFor={_.snakeCase(settingName)} key={_.startCase(settingName)}>
              <CheckBox
                key={settingName}
                defaultChecked={this.state.editorSettings[settingName]}
                id={_.snakeCase(settingName)}
                label={_.startCase(settingName)}
                onChange={e => changeTaskSetting(_.camelCase(settingName), e.target.checked)}
              />
              {
                setting.dependencies && this.state.editorSettings[settingName] ?
                this.getSettingsComponent(_.keys(setting.dependencies), setting.dependencies) : ''
              }
            </FormField>
          );
        default:
          console.warn('Unknown setting', settingName); // eslint-disable-line no-console
          return '';
      }
    });
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
              onChange={e => changeTaskSetting(_.camelCase(settingName), e)}
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
              onChange={e => changeTaskSetting(_.camelCase(settingName), e.target.value)}
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
              defaultValue={settingValue || ''}
              placeHolder={_.startCase(settingName)}
              onDOMChange={e => changeTaskSetting(_.camelCase(settingName), e.target.value)}
            />
          </FormField>
        );
    }
  }

  generateComponentsFromType(definition) {
    const schema = definition.properties;
    const settings = _.keys(schema);
    let components = [];
    if (schema && settings) {
      components = this.getSettingsComponent(settings, schema);
    }
    return this.renderTaskForm(components);
  }

  updateTask(task) {
    if (task.shortLink) {
      fetch(EDIT_TASK(task.shortLink), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })
        .catch(error => console.log(error));
    }
    this.props.saveTask(task);
  }

  renderTaskForm(components) {
    return (
      <Form
        plain
      >
        <Section direction="column" alignContent="center">
          <FormFields>{components}</FormFields>
        </Section>
        <Button
          label="Submit"
          primary
          onClick={() => {
            this.props.toggleEditor();
            if (this.state.editorSettings.newTask) {
              this.props.addTask(this.state.editorSettings);
            } else {
              this.updateTAsk(this.state.editorSettings);
            }
          }}
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
        <Headline>{this.state.newTask ? 'NEW TASK' : 'EDIT TASK'}</Headline>
        {this.generateComponentsFromType(taskDefinition)}
      </Article>
    );
  }
}

TaskEditor.propTypes = {
  addTask: PropTypes.func.isRequired,
  saveTask: PropTypes.func.isRequired,
  toggleEditor: PropTypes.func.isRequired,
  changeTaskSetting: PropTypes.func.isRequired,
  editorSettings: PropTypes.object.isRequired,
  categories: PropTypes.array,
};

TaskEditor.defaultProps = {
  categories: [],
};
