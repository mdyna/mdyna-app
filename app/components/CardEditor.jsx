import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Article from 'grommet/components/Article';
import Headline from 'grommet/components/Headline';
import Form from 'grommet/components/Form';
import classnames from 'classnames';
import CheckBox from 'grommet/components/CheckBox';
import Select from 'grommet/components/Select';
// import RadioButton from 'grommet/components/RadioButton';
import FormFields from 'grommet/components/FormFields';
import DateTime from 'grommet/components/DateTime';
import FormField from 'grommet/components/FormField';
import Section from 'grommet/components/Section';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import CardPreview from '../containers/CardPreview';
import MarkdownEditor from '../containers/MarkdownEditor';

// import noteValidator from './noteValidator';
import cardDefinition from './Cards/definition.json';

import '!style-loader!css-loader!sass-loader!./CardEditor.scss'; // eslint-disable-line

const EDIT_NOTE = noteID => `${window.serverHost}/note/${noteID}/edit`;
const REMOVE_NOTE_ENDPOINT = `${window.serverHost}/removeNote/`;

export default class CardEditor extends Component {
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
      const { changeCardSetting } = this.props;
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
                        onClick={() => changeCardSetting(_.camelCase(settingName), color)}
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
              <Select
                key={settingName}
                id={_.snakeCase(settingName)}
                onChange={e => changeCardSetting(_.camelCase(settingName), e.option)}
                placeHolder={_.startCase(settingName)}
                value={this.props.editorSettings[settingName]}
                options={[...enums]}
              />
            </FormField>
          );
        case 'string':
          return this.generateComponentsFromUiSchema({ ...setting, settingUiSchema, settingName });
        case 'bool':
          return (
            <FormField htmlFor={_.snakeCase(settingName)} key={_.startCase(settingName)}>
              <CheckBox
                key={settingName}
                checked={this.props.editorSettings[settingName]}
                id={_.snakeCase(settingName)}
                label={_.startCase(settingName)}
                onChange={e => changeCardSetting(_.camelCase(settingName), e.target.checked)}
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
        .filter(d => d.slice(0, lastLabelLength) === lastLabel && inputLabels.indexOf(d) === -1)
        .slice(0, 5);
    }
    return [' '];
  }

  changeStringSplit(setting, value) {
    const { prefixer, splitters } = setting;
    const settingName = setting.settingName || 'labels';
    const result = [];
    const { changeCardSetting } = this.props;
    for (let splitterIndex = 0; splitterIndex < splitters.length; splitterIndex += 1) {
      const splitter = splitters[splitterIndex];
      const splitVals = value.split(splitter);
      if (splitVals.length !== this.state.labelCount) {
        // this.handleLabels();
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
    changeCardSetting(_.camelCase(settingName), labels);
  }

  generateComponentsFromUiSchema(setting) {
    const { settingName, settingUiSchema } = setting;
    const { changeCardSetting, labels } = this.props;
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
              onChange={e => changeCardSetting(_.camelCase(settingName), e)}
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
                onSelect={(e) => {
                  const selectedValue = `${this.state.labelInput.substring(
                    0,
                    this.state.labelInput.lastIndexOf(' '),
                  )} ${e.suggestion} #`;
                  if (selectedValue) {
                    this.changeStringSplit(setting, selectedValue);
                    this.setState({
                      labelInput: selectedValue,
                    });
                    e.target.value = selectedValue;
                  }
                }}
                placeHolder={_.startCase(settingName)}
                onDOMChange={(e) => {
                  if (e.target.value) {
                    this.changeStringSplit(setting, e.target.value);
                    this.setState({
                      labelInput: e.target.value,
                    });
                  }
                }}
              />
            </FormField>
          );
        }
        return '';
      case 'textarea':
        return (
          <div key={settingName} className="editor-with-preview">
            <MarkdownEditor
              text={settingValue}
              className={'card-text-editor'}
              submitCard={() => this.submitFormFields()}
            />
            <CardPreview changeCardSetting={changeCardSetting} />
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
              autoFocus={settingName === 'title'}
              key={settingName}
              id={_.snakeCase(settingName)}
              defaultValue={settingValue || ''}
              placeHolder={_.startCase(settingName)}
              onDOMChange={e => changeCardSetting(_.camelCase(settingName), e.target.value)}
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
    return this.renderCardForm(components);
  }

  updateCard(card) {
    if (card.shortLink) {
      fetch(EDIT_NOTE(card.shortLink), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
      }).catch(error => console.error(error));
    }
    this.props.saveCard(card);
  }

  removeCard(card) {
    if (card.shortLink) {
      fetch(REMOVE_NOTE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
      }).catch(error => console.error(error));
    }
    this.props.removeCard(card);
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
    const newCard = { ...this.props.editorSettings, startDate: new Date() };
    if (this.props.editorSettings.newCard) {
      this.props.addCard(newCard);
    } else {
      this.updateCard(this.props.editorSettings);
    }
  }

  renderCardForm(components) {
    return (
      <Form plain>
        <Section direction="column" alignContent="center">
          <FormFields>{components}</FormFields>
        </Section>
        <Button
          className="submit-btn"
          label="Submit"
          primary
          onClick={() => this.submitFormFields()}
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
        className={classnames('card-editor', { 'white-mode': this.props.whiteMode })}
        full={'horizontal'}
      >
        <KeyboardEventHandler
          handleKeys={['ctrl+enter']}
          onKeyEvent={() => this.submitFormFields()}
        />
        <Headline>{this.props.editorSettings.newCard ? 'NEW NOTE' : 'EDIT NOTE'}</Headline>
        {this.generateComponentsFromType(cardDefinition)}
      </Article>
    );
  }
}

CardEditor.propTypes = {
  addCard: PropTypes.func.isRequired,
  saveCard: PropTypes.func.isRequired,
  whiteMode: PropTypes.bool,
  removeCard: PropTypes.func.isRequired,
  toggleEditor: PropTypes.func.isRequired,
  changeCardSetting: PropTypes.func.isRequired,
  editorSettings: PropTypes.object.isRequired,
  addLabel: PropTypes.func.isRequired,
  removeLabel: PropTypes.func.isRequired,
  labels: PropTypes.array,
};

CardEditor.defaultProps = {
  whiteMode: false,
  labels: [],
};
