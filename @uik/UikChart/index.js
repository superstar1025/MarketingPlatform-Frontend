import React, { PureComponent } from "react";
import classnames from "classnames";
import defaultsDeep from "lodash/defaultsDeep";
import { defaults as chartjsDefaults } from "react-chartjs-2";

import createCustomTooltip from "./CustomTooltip";
import cls from "./chartjs.scss";

import getDefaultOptions from "./getDefaultOptions";

chartjsDefaults.global.defaultFontFamily = "Roboto";

const getChart = chartType => require("react-chartjs-2")[chartType]; // eslint-disable-line

export default class UikChart extends PureComponent {
  static defaultProps = {
    options: {},
    valueFormatter: e => e,
    minHeight: 0,
    maxHeight: 400,
    height: null,
    width: null,
    tooltipRenderer: undefined,
    chartType: "Line",
    id: null,
    className: null
  };

  state = {
    size: {
      width: null,
      height: null
    }
  };

  componentDidMount() {
    this.setCanvasSize();
    if (window) {
      window.addEventListener("resize", this.setCanvasSize);
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener("resize", this.setCanvasSize);
    }
  }

  setCanvasSize = () => {
    // responsive
    const { wrapper } = this;
    const {
      minHeight,
      maxHeight,
      height: defaultHeight,
      width: defaultWidth
    } = this.props;

    if (wrapper) {
      const width = defaultWidth || Math.min(wrapper.clientWidth, 4000);
      const height =
        defaultHeight ||
        Math.max(Math.min(wrapper.clientWidth / 2.3, maxHeight), minHeight);
      this.setState({
        size: {
          width,
          height
        }
      });
    }
  };

  setRef = name => component => {
    this[name] = component;
  };

  render() {
    const {
      data,
      options = {},
      valueFormatter,
      tooltipRenderer,
      chartType,
      id,
      className
    } = this.props;

    const Chart = getChart(chartType);

    const finalOptions = defaultsDeep(
      {},
      options,
      {
        tooltips: {
          custom: tooltip =>
            createCustomTooltip(
              this.tooltip,
              tooltip,
              valueFormatter,
              tooltipRenderer
            )
        }
      },
      getDefaultOptions(valueFormatter)
    );

    const {
      size: { width, height }
    } = this.state;

    const sizecls = {
      width,
      height
    };

    return (
      <div className={classnames(cls.wrapper, className)}>
        <div ref={this.setRef("wrapper")} className={cls.canvasWrapper}>
          <div className={cls.tooltipWrapper} style={sizecls}>
            <Chart
              ref={this.setRef("chart")}
              data={data}
              id={id || "chart"}
              options={finalOptions}
              redraw
              {...sizecls}
            />
            <div ref={this.setRef("tooltip")} className={cls.tooltip}>
              <div className="tooltip__content">
                <table />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
