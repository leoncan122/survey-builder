import React, {Component, createElement, JSXElementConstructor} from 'react';


function genComponentStyle(tag) {
    return function(strings, ...vals) {
        return class extends Component {
            style
            evalInterpolation = (props, strings, vals) => {
              let resultStr = ""
              for (var i = 0; i < strings.length; i++) {
                  var str = strings[i];
                  var val
                  if(vals) {
                      val = vals[i]
                      if(val !== undefined) {
                          if(typeof val === "function") {
                              val = val(props)
                          }
                          str += val
                      }
                  }
                  resultStr += str
              }
              return resultStr
          }
            computeStyle = (props, strings, vals) => {
              strings = this.evalInterpolation(props, strings, vals)
              this.style = {}
              strings.split(";").forEach((str)=> {
                  let [prop, val] = str.trim().split(":")
                  if(prop !== undefined && val !== undefined) {
                      prop = prop.trim()
                      val = val.trim()
                      this.style[prop] = val
                  }
              });
              return this.style
          }
            constructor(props) {
                super(props)
                this.style = {}
            }
            componentWillMount() {
                this.style = this.computeStyle(this.props, strings, vals)
            }
            componentWillUpdate(props) {
                this.style = this.computeStyle(props, strings, vals)
            }
            render() {
                return (
                    createElement(tag, { style: this.style, ...this.props })
                )
            }
        }        
    }
  }
  const tags = [
    "textarea",
    "div",
    "input",
    "section"
  ]
  const styled = {}
  tags.forEach(tag => {
      styled[tag] = genComponentStyle(tag)
  })
  export default styled