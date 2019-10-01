import React, { Component } from 'react';
import { snakeCase, startCase, keys } from 'lodash';
import PropTypes from 'prop-types';
import { Box, Text, FormField } from 'grommet';
import Button from 'UI/Button';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import MarkdownEditor from 'Containers/MarkdownEditor';
import LabelPicker from 'UI/LabelPicker';
import BoardPicker from 'UI/BoardPicker';
import TextInput from 'UI/TextInput';
import ColorPicker from 'UI/ColorPicker';
import CardPreview from 'Containers/CardPreview';
import validateFields from './Cards/CardValidation';
import cardDefinition from './Cards/definition.json';

// import noteValidator from './noteValidator';

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
      const {
        changeCardSetting,
        boards,
        editorSettings,
        boardNames,
        toggleBoardsDialog,
        createBoard,
      } = this.props;
      const enums = (setting.enums && [...setting.enums]) || null;
      switch (settingType) {
        case 'enum':
          if (settingUiSchema === 'color') {
            return (
              <FormField
                label={startCase(settingName)}
                htmlFor={snakeCase(settingName)}
                key={startCase(settingName)}
                className="color-form-field form-field"
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
          if (settingUiSchema === 'board') {
            return (
              <FormField
                label={startCase(settingName)}
                htmlFor={snakeCase(settingName)}
                key={startCase(settingName)}
                className="board-form-field form-field"
              >
                <BoardPicker
                  createBoard={createBoard}
                  onClick={v => changeCardSetting(settingName, v)}
                  boardNames={boardNames}
                  boards={boards}
                  toggleBoardsDialog={toggleBoardsDialog}
                  value={
                    (boards
                      && boards.filter(
                        b => b.id === editorSettings[settingName],
                      )[0].name)
                    || 'INBOX'
                  }
                  addButton
                />
              </FormField>
            );
          }

          console.warn('Found enum but no widget in schema', settingName); // eslint-disable-line no-console
          return '';
        case 'string':
          return this.generateComponentsFromUiSchema({
            ...setting,
            settingUiSchema,
            settingName,
          });
        default:
          console.warn('Unknown setting', settingName); // eslint-disable-line no-console
          return '';
      }
    });
  }

  updateCard(card) {
    const { saveCard, focusedCard, focusCard } = this.props;
    saveCard(card);
    if (focusedCard) {
      focusCard(card);
    }
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
              className="form-field"
              label={startCase(settingName)}
              htmlFor={snakeCase(settingName)}
              key={startCase(settingName)}
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
        return '';
      default:
        return (
          <FormField
            className="form-field"
            label={startCase(settingName)}
            htmlFor={snakeCase(settingName)}
            key={startCase(settingName)}
          >
            <TextInput
              label={settingName}
              value={settingValue || ''}
              onChange={e => changeCardSetting(settingName, e)}
            />
          </FormField>
        );
    }
  }

  generateComponentsFromType(definition) {
    const schema = definition.properties;
    const settings = keys(schema);
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
    if (validateFields(editorSettings)) {
      this.handleLabels();
      toggleEditor();
      const newCard = { ...editorSettings, startDate: new Date() };
      if (editorSettings.newCard) {
        addCard(newCard);
      } else {
        this.updateCard(editorSettings);
      }
    }
  }

  renderCardForm(components) {
    const { editorSettings, changeCardSetting } = this.props;
    return (
      <form plain="true">
        <Box direction="row" justify="start">
          {components}
        </Box>
        <Box
          className="editor-with-preview"
          style={{
            backgroundColor: `${editorSettings.color}aa`,
          }}
        >
          <MarkdownEditor
            text={editorSettings.text}
            className="card-text-editor"
            submitCard={() => this.submitFormFields()}
          />
          <CardPreview changeCardSetting={changeCardSetting} />
        </Box>
      </form>
    );
  }

  render() {
    const { editorSettings, toggleEditor } = this.props;
    return (
      <Box
        direction="column"
        alignContent="center"
        pad="large"
        className="card-editor"
        full="horizontal"
      >
        <KeyboardEventHandler
          handleKeys={['ctrl+enter']}
          onKeyEvent={() => this.submitFormFields()}
        />
        <Box className="header">
          <Text align="center" size="xxlarge">
            {editorSettings.newCard ? 'NEW CARD' : 'EDIT CARD'}
          </Text>
          <Button onClick={() => this.submitFormFields()}>Save Card</Button>
          <Button
            color="accent-2"
            className="discard-btn"
            hoverIndicator="accent-2"
            onClick={() => toggleEditor()}
          >
            X
          </Button>
        </Box>
        {this.generateComponentsFromType(cardDefinition)}
      </Box>
    );
  }
}

CardEditor.propTypes = {
  addCard: PropTypes.func.isRequired,
  focusCard: PropTypes.func.isRequired,
  toggleEditor: PropTypes.func.isRequired,
  changeCardSetting: PropTypes.func.isRequired,
  editorSettings: PropTypes.object.isRequired,
  addLabel: PropTypes.func.isRequired,
  boards: PropTypes.object.isRequired,
  boardNames: PropTypes.array.isRequired,
  createBoard: PropTypes.func.isRequired,
  focusedCard: PropTypes.bool.isRequired,
  saveCard: PropTypes.func.isRequired,
  toggleBoardsDialog: PropTypes.func.isRequired,
  removeLabel: PropTypes.func.isRequired,
  labels: PropTypes.array,
};

CardEditor.defaultProps = {
  labels: [],
};
