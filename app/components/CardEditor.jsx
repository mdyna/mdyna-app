import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  Box, Text, FormField,
} from 'grommet';
import classnames from 'classnames';
import Button from 'UI/Button';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import ErrorBoundary from 'UI/Error';
import CardPreview from 'Containers/CardPreview';
import MarkdownEditor from 'Containers/MarkdownEditor';
import LabelPicker from 'UI/LabelPicker';
import TextInput from 'UI/TextInput';
import ColorPicker from 'UI/ColorPicker';

// import noteValidator from './noteValidator';
import cardDefinition from './Cards/definition.json';

import './CardEditor.scss';

export default class CardEditor extends Component {
  state = {
    // eslint-disable-next-line
    labels: this.props.editorSettings.labels,
  };

  getSettingsComponent(settings, schema) {
    return settings.map((settingName) => {
      const setting = schema[settingName];
      const settingType = setting.type;
      const settingUiSchema = setting.uiSchema;
      const { changeCardSetting, editorSettings } = this.props;
      const enums = (setting.enums && [...setting.enums]) || null;
      switch (settingType) {
        case 'enum':
          if (settingUiSchema === 'color') {
            return (
              <FormField
                label={_.startCase(settingName)}
                htmlFor={_.snakeCase(settingName)}
                key={_.startCase(settingName)}
                className="color-form-field"
              >
                {enums ? (
                  <ColorPicker
                    colors={enums}
                    label={settingName}
                    onChange={changeCardSetting}
                    value={editorSettings[settingName]}
                  />
                ) : (
                  ''
                )}
              </FormField>
            );
          }
          console.warn('Found enum but no widget in schema', settingName); // eslint-disable-line no-console
          return '';
        case 'string':
          return this.generateComponentsFromUiSchema({ ...setting, settingUiSchema, settingName });
        default:
          console.warn('Unknown setting', settingName); // eslint-disable-line no-console
          return '';
      }
    });
  }

  updateCard(card) {
    const { saveCard } = this.props;
    saveCard(card);
  }

  generateComponentsFromUiSchema(setting) {
    const { settingName, settingUiSchema } = setting;
    const { changeCardSetting, labels, editorSettings } = this.props;
    const settingValue = editorSettings[settingName];
    switch (settingUiSchema) {
      case 'stringSplit':
        if (settingName === 'labels') {
          return (
            <FormField
              label={_.startCase(settingName)}
              htmlFor={_.snakeCase(settingName)}
              key={_.startCase(settingName)}
            >
              <LabelPicker
                label={settingName}
                labels={labels}
                value={settingValue}
                setting={setting}
                onChange={changeCardSetting}
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
              className="card-text-editor"
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
              label={settingName}
              value={settingValue || ''}
              onChange={changeCardSetting}
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

  handleLabels() {
    const { labels } = this.state;
    const { editorSettings, addLabel, removeLabel } = this.props;
    const prevLabels = labels;
    const newLabels = editorSettings.labels || [];
    if (prevLabels) {
      const prevLabelTitles = prevLabels.map(d => d.title);
      const newLabelTitles = newLabels.map(d => d.title);
      newLabelTitles.forEach((label, index) => {
        if (prevLabelTitles.indexOf(label) === -1) {
          addLabel(newLabels[index]);
        }
      });
      prevLabelTitles.forEach((label, index) => {
        if (newLabelTitles.indexOf(label) === -1) {
          removeLabel(prevLabels[index]);
        }
      });
    } else {
      newLabels.forEach(label => addLabel(label));
    }
  }

  submitFormFields() {
    const { editorSettings, addCard, toggleEditor } = this.props;
    this.handleLabels();
    toggleEditor();
    const newCard = { ...editorSettings, startDate: new Date() };
    if (editorSettings.newCard) {
      addCard(newCard);
    } else {
      this.updateCard(editorSettings);
    }
  }

  renderCardForm(components) {
    const { whiteMode } = this.props;
    return (
      <form plain>
        <Box direction="column" alignContent="center">
          {components}
        </Box>
        <Button
          theme={(whiteMode && 'white') || 'dark'}
          className="submit-btn"
          label="Submit"
          color="primary"
          onClick={() => this.submitFormFields()}
        />
      </form>
    );
  }

  render() {
    const { editorSettings, whiteMode } = this.props;
    return (
      <ErrorBoundary>
        <Box
          direction="column"
          alignContent="center"
          pad="large"
          className={classnames('card-editor', { 'white-mode': whiteMode })}
          full="horizontal"
        >
          <KeyboardEventHandler
            handleKeys={['ctrl+enter']}
            onKeyEvent={() => this.submitFormFields()}
          />
          <Text className="header">
            {editorSettings.newCard ? 'NEW CARD' : 'EDIT CARD'}
            <Button
              theme={(whiteMode && 'white') || 'dark'}
              className="submit-btn"
              color="alt"
              onClick={() => this.submitFormFields()}
            >
              Save Card
            </Button>
          </Text>
          {this.generateComponentsFromType(cardDefinition)}
        </Box>
      </ErrorBoundary>
    );
  }
}

CardEditor.propTypes = {
  addCard: PropTypes.func.isRequired,
  whiteMode: PropTypes.bool,
  toggleEditor: PropTypes.func.isRequired,
  changeCardSetting: PropTypes.func.isRequired,
  editorSettings: PropTypes.object.isRequired,
  addLabel: PropTypes.func.isRequired,
  saveCard: PropTypes.func.isRequired,
  removeLabel: PropTypes.func.isRequired,
  labels: PropTypes.array,
};

CardEditor.defaultProps = {
  whiteMode: false,
  labels: [],
};
