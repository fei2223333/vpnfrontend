import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';import styled, {keyframes} from "styled-components";

const popIn = keyframes`
	0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const BalloonC = styled.div`
  position: relative;
  animation: ${popIn} .5s;

  > span {
    background-color: ${props => (props.color ? props.color : "white")};
  }

  > span:before {
    border-color: ${props => (props.color ? props.color : "white")}
      ${props => (props.color ? props.color : "white")} transparent transparent;
  }

  > span:after {
    border-color: ${props => (props.color ? props.color : "white")} transparent
      transparent ${props => (props.color ? props.color : "white")};
  }

  ${props => props.position === "left" && `{
		margin-right: 30%;
    
    > span:before {
			content: ' ';
			position: absolute;
			width: 0;
			height: 0;
			left: -11px;
			right: auto;
			top: 0px;
			bottom: auto;
			border-width: 9px;
      border-style: solid;
		}
	`} 
  
  ${props => props.position === "right" && `{
    > span {
      float: right;
			margin-right: 0;
      margin-left: 30%;
    }

		&:before {
			display: table;
			content: " ";
		}
		
		&:after {
			display: table;
			content: " ";
			clear: both;
		}
    
    > span:after {
			content: ' ';
			position: absolute;
			width: 0;
			height: 0;
			left: auto;
			right: -11px;
			top: 0px;
			bottom: auto;
			border-width: 9px;
      border-style: solid;
		}
	`};
`;

const Text = styled.span`
  display: inline-block;
  border-radius: 4px;
  padding: 10px;
  position: relative;
  box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.04);
  margin-top: 10px;
`;

export class Balloon extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <BalloonC {...this.props}>
        <Text>{this.props.children}</Text>
      </BalloonC>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Balloon);
