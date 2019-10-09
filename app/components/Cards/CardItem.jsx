import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import tinycolor from 'tinycolor2';
import { Box } from 'grommet';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import sample from 'lodash/sample';
import Labels from 'UI/Labels';
import Editor from 'Components/MarkdownEditor';
import { convertDateToLocaleString } from 'Utils/dates';
import CardBar from './CardBar';
// import assertTaskAlerts from '../../utils/assertTaskAlerts';

import './CardItem.scss'; // eslint-disable-line

export const COLOR_SAMPLES = [
  '#ff8a80',
  '#ff80ab',
  '#ea80fc',
  '#8c9eff',
  '#80d8ff',
  '#a7ffeb',
  '#b9f6ca',
  '#fff475',
  '#ffd180',
  '#a7c0cd',
];

const COLOR_LABELS = {
  '#ff8a80': 'red',
  '#ff80ab': 'pink',
  '#ea80fc': 'purple',
  '#8c9eff': 'dark-blue',
  '#80d8ff': 'light-blue',
  '#a7ffeb': 'mdyna-green',
  '#b9f6ca': 'green',
  '#fff475': 'yellow',
  '#ffd180': 'orange',
  '#a7c0cd': 'grey',
};

class MdynaCard extends PureComponent {
  state = {
    isHovered: false,
  };

  name = 'Mdyna Card';

  scrollToCard() {
    // eslint-disable-next-line
    ReactDOM.findDOMNode(this).scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }

  renderCardDate() {
    const { card } = this.props;
    const { startDate, lastEditDate } = card;
    const lastEditDateFormatted = convertDateToLocaleString(lastEditDate);
    const startDateFormatted = convertDateToLocaleString(startDate);
    const datesAreDifferent = lastEditDateFormatted !== startDateFormatted;
    const formattedDate = datesAreDifferent
      ? lastEditDateFormatted
      : startDateFormatted;
    return datesAreDifferent ? (
      <span className="card-date">
        Last edit on
        {' '}
        <span>{formattedDate}</span>
      </span>
    ) : (
      <span className="card-date">
        Created on
        {' '}
        <span>{formattedDate}</span>
      </span>
    );
  }

  render() {
    const {
      card,
      className,
      hasCardBar,
      changeCardSetting,
      toggleCard,
      changeTitle,
      saveCard,
      isFocused,
      removeCard,
      focusCard,
      editCard,
      removeLabel,
      addLabelFilter,
      removeLabelFilter,
      readOnly,
      labelFilters,
      whiteMode,
      codeTheme,
    } = this.props;
    const { isHovered } = this.state;
    const labelFuncs = { addLabelFilter, removeLabelFilter };
    const color = (card && card.color) || changeCardSetting('color', sample(COLOR_SAMPLES));
    const cardActions = {
      toggleCard,
      removeCard,
      editCard,
      focusCard,
      removeLabel,
      changeTitle,
    };
    const getCardText = (title, text) => {
      if (title && text) {
        return `# ${card.title}  ${card.text}`;
      }
      if (title && !text) {
        return `# ${card.title}`;
      }
      return text;
    };
    return (
      <Box
        key={card.id}
        role="button"
        tabIndex={0}
        onDoubleClick={() => {
          cardActions.editCard(card);
        }}
        className={classnames(className, COLOR_LABELS[color], 'card-item')}
        onMouseEnter={() => this.setState({
          isHovered: true,
        })
        }
        onMouseLeave={() => this.setState({
          isHovered: false,
        })
        }
        style={{
          backgroundColor: color,
          transition: 'width 0.5s ease-in',
          filter:
            (isHovered
              && `drop-shadow(1px -3px 3px ${tinycolor(color).darken(25)})`)
            || null,
        }}
      >
        <CardBar
          card={card}
          isFocused={Boolean(isFocused)}
          cardActions={hasCardBar ? cardActions : ''}
          cardItem={this}
          title={card.title}
        />
        <Labels
          labelFuncs={labelFuncs}
          labelFilters={labelFilters}
          labels={card.labels}
          color={color}
        />
        {this.renderCardDate()}

        <Editor
          readOnly={readOnly}
          card={card}
          defaultValue={card.text}
          onSave={saveCard}
          codeTheme={codeTheme}
          changeTitle={val => changeCardSetting('title', val)}
          whiteMode={whiteMode}
          value={getCardText(card.title, card.text)}
          onChange={val => changeCardSetting('text', val)}
          theme={{
            backgroundColor: 'transparent',
          }}
        />
      </Box>
    );
  }
}

export default MdynaCard;

MdynaCard.propTypes = {
  card: PropTypes.object.isRequired,
  isFocused: PropTypes.bool,
  readOnly: PropTypes.bool,
  codeTheme: PropTypes.string,
  toggleCard: PropTypes.func,
  saveCard: PropTypes.func,
  hasCardBar: PropTypes.bool,
  editCard: PropTypes.func,
  changeTitle: PropTypes.func.isRequired,
  labelFilters: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  className: PropTypes.string,
  removeCard: PropTypes.func,
  whiteMode: PropTypes.bool,
  removeLabel: PropTypes.func,
  changeCardSetting: PropTypes.func,
  focusCard: PropTypes.func,
  addLabelFilter: PropTypes.func,
  removeLabelFilter: PropTypes.func,
};

MdynaCard.defaultProps = {
  changeCardSetting: null,
  removeCard: null,
  saveCard: null,
  editCard: null,
  isFocused: false,
  codeTheme: 'Default',
  whiteMode: false,
  addLabelFilter: null,
  removeLabelFilter: null,
  removeLabel: null,
  readOnly: true,
  labelFilters: [],
  focusCard: null,
  toggleCard: null,
  hasCardBar: false,
  className: '',
};
