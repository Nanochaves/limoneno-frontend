import React from "react";
import './taggy-tag.scss';
import { Tag, Icon } from "antd";

declare var window: any;

export class TaggyTag extends React.Component<any> {
    private text: any;
    private range: any;
    props: any;

    constructor(props: any) {
      super(props);
      this.text = React.createRef();
    }

    deleteTag(): void {
      if (this.props.delete) {
        this.props.delete(this.props.tag);
      }
    }

    tag(): void {
      var currentRange = window.getSelection().getRangeAt(0);

      let start = currentRange.startOffset + this.props.offset;
      let end = currentRange.endOffset + this.props.offset;
      if (this.props.select) {
        if (end < start) {
          this.props.select(end, start);
        } else {
          this.props.select(start, end);
        }
      }
    }

    render() {
        if (this.props.tag.tag) {
            return (
              <Tag color={this.props.tag.color} className="tag">
                {this.props.tag.text + '  '}
                <b>{'(' + this.props.tag.label + ')'}</b>
                <Icon type="close" onClick={() => this.deleteTag()}></Icon>
              </Tag>
            );
        } else {
          return (
            <span ref={this.text} onClick={this.tag.bind(this)}>{this.props.tag.text}</span>
          );
        }
    }
}