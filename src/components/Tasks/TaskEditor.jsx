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
const REMOVE_TASK_ENDPOINT = `${window.serverHost}/removeTask/`;

export default class TaskEditor extends Component {
  shouldComponentUpdate(newProps) {
    const newEditorSettings = newProps && newProps.editorSettings;
    const { editorSettings } = this.props;
    return (
      newEditorSettings.schedule !== editorSettings.schedule ||
      newEditorSettings.color !== editorSettings.color ||
      newEditorSettings.repeat !== editorSettings.repeat ||
      newEditorSettings.repeatAlert !== editorSettings.repeatAlert ||
      newEditorSettings.reminderFrequency !== editorSettings.reminderFrequency ||
      newEditorSettings.taskId !== editorSettings.taskId ||
      newEditorSettings.reminderId !== editorSettings.reminderId
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
          if (settingUiSchema === 'color') {
            return (
              <FormField
                label={_.startCase(settingName)}
                htmlFor={_.snakeCase(settingName)}
                key={_.startCase(settingName)}
              >
                {enums ? (
                  <div className="color-options">
                    {enums.map(color => (
                      <svg
                        onClick={() => changeTaskSetting(_.camelCase(settingName), color)}
                        value={this.props.editorSettings[settingName]}
                        key={color}
                      >
                        <circle r="15" fill={color} />
                      </svg>
                    ))}
                  </div>
                ) : (
                  ''
                )}
              </FormField>
            );
          }
          return (
            <FormField
              label={_.startCase(settingName)}
              htmlFor={_.snakeCase(settingName)}
              key={_.startCase(settingName)}
            >
              {enums ? (
                <Select
                  key={settingName}
                  id={_.snakeCase(settingName)}
                  onChange={e => changeTaskSetting(_.camelCase(settingName), e.option)}
                  placeHolder={_.startCase(settingName)}
                  value={this.props.editorSettings[settingName]}
                  options={[...enums]}
                />
              ) : (
                <Select
                  key={settingName}
                  id={_.snakeCase(settingName)}
                  onChange={e => changeTaskSetting(_.camelCase(settingName), e.target.checked)}
                  placeHolder={_.startCase(settingName)}
                  options={[...this.props.categories, 'Create New']}
                />
              )}
            </FormField>
          );
        case 'string':
          return this.generateComponentsFromUiSchema(settingName, settingUiSchema);
        case 'bool':
          return (
            <FormField htmlFor={_.snakeCase(settingName)} key={_.startCase(settingName)}>
              <CheckBox
                key={settingName}
                defaultChecked={this.props.editorSettings[settingName]}
                id={_.snakeCase(settingName)}
                label={_.startCase(settingName)}
                onChange={e => changeTaskSetting(_.camelCase(settingName), e.target.checked)}
              />
              {setting.dependencies && this.props.editorSettings[settingName]
                ? this.getSettingsComponent(_.keys(setting.dependencies), setting.dependencies)
                : ''}
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
    const settingValue = this.props.editorSettings[settingName];
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
            <MarkdownEditor className={'task-text-editor'} visibility={{ preview: false }} />
            <TaskPreview changeTaskSetting={changeTaskSetting} />
          </div>
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
      }).catch(error => console.log(error));
    }
    this.props.saveTask(task);
  }

  updateReminder(reminder) {
    this.props.saveReminder(reminder);
  }

  removeTask(task) {
    if (task.shortLink) {
      fetch(REMOVE_TASK_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      }).catch(error => console.log(error));
    }
    this.props.removeTask(task);
  }

  removeReminder(task) {
    this.props.removeReminder(task);
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
          onClick={() => {
            // TODO: Improve readability in these nested ifs
            this.props.toggleEditor();
            const newTask = { ...this.props.editorSettings, startDate: new Date() };
            if (this.props.editorSettings.newTask) {
              if (this.props.editorSettings.repeat) {
                this.props.addReminder(newTask);
              } else {
                this.props.addTask(newTask);
              }
            } else if (!this.props.editorSettings.newTask) {
              if (this.props.editorSettings.repeat) {
                if (this.props.editorSettings.reminderId) {
                  this.updateReminder(this.props.editorSettings);
                } else {
                  this.props.addReminder(newTask);
                  this.removeTask(this.props.editorSettings);
                }
              } else if (this.props.editorSettings.reminderId) {
                this.props.addTask(newTask);
                this.removeReminder(this.props.editorSettings);
              } else {
                this.updateTask(this.props.editorSettings);
              }
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
        <Headline>{this.props.editorSettings.newTask ? 'NEW TASK' : 'EDIT TASK'}</Headline>
        {this.generateComponentsFromType(taskDefinition)}
      </Article>
    );
  }
}

TaskEditor.propTypes = {
  addTask: PropTypes.func.isRequired,
  saveTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  addReminder: PropTypes.func.isRequired,
  saveReminder: PropTypes.func.isRequired,
  removeReminder: PropTypes.func.isRequired,
  toggleEditor: PropTypes.func.isRequired,
  changeTaskSetting: PropTypes.func.isRequired,
  editorSettings: PropTypes.object.isRequired,
  categories: PropTypes.array,
};

TaskEditor.defaultProps = {
  categories: [],
};
