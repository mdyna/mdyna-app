import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import Card from 'grommet/components/Card';
import Heading from 'grommet/components/Heading';


import '!style-loader!css-loader!sass-loader!./ReminderItem.scss'; // eslint-disable-line
import unNest from '../../utils/nest';

export default class ReminderItem extends Component {
  render() {
    const color = unNest(this, 'props.color') || '#1DE9B6';
    const { title } = this.props;
    return (
      <Card
        className={'reminder-item'}
        style={{
          filter: `drop-shadow(3px -6px 3px ${tinycolor(color).darken(25)})`,
          backgroundColor: color,
          color: tinycolor(color).darken(40),
        }}
      >
        <Heading
          align="start"
          tag="h3"
          strong
        >
          {title}
        </Heading>
      </Card>
    );
  }
}

ReminderItem.propTypes = {
  title: PropTypes.string.isRequired,
};
