import React, { Component } from "react";
import SvgLines from 'react-mt-svg-lines';

export default class Sucess extends Component {
  render() {
    const { type } = this.props
    console.log('type', type)
    return (
      <div>
      {
        type === "sucess" ? (
        <div>
          <SvgLines animate={true} duration={500}>
          <svg viewBox="0 0 100 100" width="64" height="64">
            <g fill="none" strokeMiterlimit="1">
              <circle fill="#3EB735" cx="50" cy="50" r="45"/>
              <path stroke="#FFF" strokeWidth="8" d="M20.8,51c0,0,20.8,18.2,21.5,18.2c0.6,0,33.3-38.5,33.3-38.5"/>
            </g>
          </svg>
          </SvgLines>
        </div>
        ) : type === "error" ? (
          <div>
            <SvgLines animate={true} duration={500}>
            <svg viewBox="0 0 100 100" width="64" height="64">
              <g fill="none" strokeMiterlimit="1">
                <circle fill="#c7254e" cx="50" cy="50" r="45"/>
                <path stroke="#FFF" strokeWidth="8" d="M 25,25 l 50,50 M 75,25 l -50,50"/>
              </g>
            </svg>
            </SvgLines>
          </div>
        ) : null
      }
      </div>
    )
  }
}