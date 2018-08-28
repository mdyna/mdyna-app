import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Article from 'grommet/components/Article';
import Headline from 'grommet/components/Headline';
import Form from 'grommet/components/Form';
import classnames from 'classnames';
import CheckBox from 'grommet/components/CheckBox';
// import RadioButton from 'grommet/components/RadioButton';
import FormFields from 'grommet/components/FormFields';
import DateTime from 'grommet/components/DateTime';
import FormField from 'grommet/components/FormField';
import Section from 'grommet/components/Section';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import NotePreview from '../containers/NotePreview';
import MarkdownEditor from '../containers/MarkdownEditor';

// import noteValidator from './noteValidator';
import noteDefinition from './Notes/noteDefinition.json';

import '!style-loader!css-loader!sass-loader!./CardEditor.scss'; // eslint-disable-line

const EDIT_NOTE = noteID => `${window.serverHost}/note/${noteID}/edit`;
const REMOVE_NOTE_ENDPOINT = `${window.serverHost}/removeNote/`;

export default class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: this.props.editorSettings.labels,
    };
  }

  getSettingsComponent(settings, schema) {
    return settings.map((settingName) => {
      const setting = schema[settingName];
      const settingType = setting.type;
      const settingUiSchema = setting.uiSchema;
      const { changeNoteSetting } = this.props;
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
                        onClick={() => changeNoteSetting(_.camelCase(settingName), color)}
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
          return '';
        case 'string':
          return this.generateComponentsFromUiSchema({ ...setting, settingUiSchema, settingName });
        case 'bool':
          return (
            <FormField htmlFor={_.snakeCase(settingName)} key={_.startCase(settingName)}>
              <CheckBox
                key={settingName}
                defaultChecked={this.props.editorSettings[settingName]}
                id={_.snakeCase(settingName)}
                label={_.startCase(settingName)}
                onChange={e => changeNoteSetting(_.camelCase(settingName), e.target.checked)}
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


  getSuggestions() {
    if (this.state.labelInput) {
      const inputLabels = this.state.labelInput.split(' ');
      const lastLabel = inputLabels[inputLabels.length - 1];
      const lastLabelLength = lastLabel.length;
      const userLabels = this.props.labels && this.props.labels.map(d => d.title);
      return userLabels
        .filter(
          d => d.slice(0, lastLabelLength) === lastLabel && inputLabels.indexOf(d) === -1,
        )
        .slice(0, 5);
    }
    return [' '];
  }

  changeStringSplit(setting, value) {
    const { prefixer, splitters } = setting;
    const settingName = setting.settingName || 'labels';
    const result = [];
    const { changeNoteSetting } = this.props;
    for (let splitterIndex = 0; splitterIndex < splitters.length; splitterIndex += 1) {
      const splitter = splitters[splitterIndex];
      const splitVals = value.split(splitter);
      if (splitVals.length !== this.state.labelCount) {
        this.handleLabels();
        this.setState({
          labelCount: splitVals.length,
        });
      }
      for (let i = 0; i < splitVals.length; i += 1) {
        const val = splitVals[i].trim();
        if (val && splitter !== val && val !== prefixer) {
          result.push(`${prefixer}${_.camelCase(val)}`);
        }
      }
    }

    const labels = result.map(d => ({
      title: d,
    }));
    changeNoteSetting(_.camelCase(settingName), labels);
  }

  generateComponentsFromUiSchema(setting) {
    const { settingName, settingUiSchema } = setting;
    const { changeNoteSetting, labels } = this.props;
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
              onChange={e => changeNoteSetting(_.camelCase(settingName), e)}
              value={settingValue || new Date()}
            />
          </FormField>
        );
      case 'stringSplit':
        if (settingName === 'labels') {
          return (
            <FormField
              label={_.startCase(settingName)}
              htmlFor={_.snakeCase(settingName)}
              key={_.startCase(settingName)}
            >
              <TextInput
                key={settingName}
                id={_.snakeCase(settingName)}
                suggestions={labels && this.getSuggestions(labels.map(d => d.title))}
                defaultValue={
                  settingValue
                    ? `${settingValue
                      .map(d => d.title)
                      .join(' ')
                      .trim()} #`
                    : '#'
                }
                onSelect={
                  (e) => {
                    const selectedValue = `${this.state.labelInput.substring(0, this.state.labelInput.lastIndexOf(' '))} ${e.suggestion} #`;
                    this.changeStringSplit(setting, selectedValue);
                    this.setState({
                      labelInput: selectedValue,
                    });
                    e.target.value = selectedValue;
                  }
                }
                placeHolder={_.startCase(settingName)}
                onDOMChange={(e) => {
                  this.changeStringSplit(setting, e.target.value);
                  this.setState({
                    labelInput: e.target.value,
                  });
                }}
              />
            </FormField>
          );
        }
        return '';
      case 'textarea':
        return (
          <div key={settingName} className="editor-with-preview">
            <MarkdownEditor className={'note-text-editor'} visibility={{ preview: false }} />
            <NotePreview changeNoteSetting={changeNoteSetting} />
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
              onDOMChange={e => changeNoteSetting(_.camelCase(settingName), e.target.value)}
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
    return this.renderNoteForm(components);
  }

  updateNote(note) {
    if (note.shortLink) {
      fetch(EDIT_NOTE(note.shortLink), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      }).catch(error => console.log(error));
    }
    this.props.saveNote(note);
  }

  updateTask(task) {
    this.props.saveTask(task);
  }

  removeNote(note) {
    if (note.shortLink) {
      fetch(REMOVE_NOTE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      }).catch(error => console.log(error));
    }
    this.props.removeNote(note);
  }

  removeTask(note) {
    this.props.removeTask(note);
  }

  handleLabels() {
    const prevLabels = this.state.labels;
    const newLabels = this.props.editorSettings.labels || [];
    if (prevLabels) {
      const prevLabelTitles = prevLabels.map(d => d.title);
      const newLabelTitles = newLabels.map(d => d.title);
      newLabelTitles.forEach((label, index) => {
        if (prevLabelTitles.indexOf(label) === -1) {
          this.props.addLabel(newLabels[index]);
        }
      });
      prevLabelTitles.forEach((label, index) => {
        if (newLabelTitles.indexOf(label) === -1) {
          this.props.removeLabel(prevLabels[index]);
        }
      });
    } else {
      newLabels.forEach(label => this.props.addLabel(label));
    }
  }

  submitFormFields() {
    this.handleLabels();
    this.props.toggleEditor();
    const newNote = { ...this.props.editorSettings, startDate: new Date() };
    if (this.props.editorSettings.newNote) {
      if (this.props.editorSettings.repeat) {
        this.props.addTask(newNote);
      } else {
        this.props.addNote(newNote);
      }
    } else if (!this.props.editorSettings.newNote) {
      if (this.props.editorSettings.repeat) {
        if (this.props.editorSettings.taskId) {
          this.updateTask(this.props.editorSettings);
        } else {
          this.props.addTask(newNote);
          this.removeNote(this.props.editorSettings);
        }
      } else if (this.props.editorSettings.taskId) {
        this.props.addNote(newNote);
        this.removeTask(this.props.editorSettings);
      } else {
        this.updateNote(this.props.editorSettings);
      }
    }
  }

  renderNoteForm(components) {
    return (
      <Form plain>
        <Section direction="column" alignContent="center">
          <FormFields>{components}</FormFields>
        </Section>
        <Button label="Submit" primary onClick={() => this.submitFormFields()} />
      </Form>
    );
  }

  render() {
    return (
      <Article
        direction="column"
        alignContent="center"
        pad="large"
        className={classnames('note-editor', { 'white-mode': this.props.whiteMode })}
        full={'horizontal'}
      >
        <Headline>{this.props.editorSettings.newNote ? 'NEW NOTE' : 'EDIT NOTE'}</Headline>
        {this.generateComponentsFromType(noteDefinition)}
      </Article>
    );
  }
}

NoteEditor.propTypes = {
  addNote: PropTypes.func.isRequired,
  saveNote: PropTypes.func.isRequired,
  whiteMode: PropTypes.bool,
  removeNote: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  saveTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  toggleEditor: PropTypes.func.isRequired,
  changeNoteSetting: PropTypes.func.isRequired,
  editorSettings: PropTypes.object.isRequired,
  addLabel: PropTypes.func.isRequired,
  removeLabel: PropTypes.func.isRequired,
  labels: PropTypes.array,
};

NoteEditor.defaultProps = {
  whiteMode: false,
  labels: [],
};
