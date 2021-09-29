import * as React from 'react';
import './taggy.scss';
import 'antd/dist/antd.css';
import { Tag, Icon } from 'antd';
import { DatasetItemTag } from '../../../../models/dataset-item-tag';
import { TaggyTag } from './taggy-tag/taggy-tag';
import { TagItem } from './tag-item.interface';

export class Taggy extends React.Component<any> {
  // Define the props in component
  props: any;
  state: any = {
    date: null
  };

  objects: TagItem[] = [];

  analizeTags(): any {
    this.objects = [
      {
        text: this.props.text,
        start: 0,
        end: this.props.text ? this.props.text.length - 1 : 0,
        tag: false,
        color: '',
        type: '',
        label: ''
      }
    ];

    this.props.spans.map((tag: DatasetItemTag) => {
      let type = this.props.ents.find((ent: any) => {
        return ent.type === tag.type;
      });

      let text = this.objects.find((ent: TagItem) => {
        return tag.start >= ent.start && tag.end <= ent.end;
      });
      if (text) this.analizeTag(text, tag, type);

      return true;
    });
  }

  analizeTag(item: TagItem, tag: DatasetItemTag, type: any): void {
    this.objects.splice(this.objects.indexOf(item), 1);

    // Add the tag
    this.objects.push({
      text: item.text.slice(tag.start - item.start, tag.end - item.start),
      start: tag.start,
      end: tag.end,
      tag: true,
      color: type ? type.color : '#FFFFF',
      type: type ? type.type : '',
      label: type ? type.label : ''
    });

    if (item.start - tag.start !== 0) {
      this.objects.push({
        text: item.text.substring(0, tag.start - item.start),
        start: item.start,
        end: tag.start,
        tag: false,
        color: '',
        type: '',
        label: ''
      });
    }

    this.objects.push({
      text: item.text.substring(tag.end - item.start, item.text.length),
      start: tag.end,
      end:
        item.end === this.props.text.length
          ? item.end
          : item.text.length,
      tag: false,
      color: '',
      type: '',
      label: ''
    });

    this.objects.sort((a: TagItem, b: TagItem) => {
      return a.start - b.start;
    });
  }

  deleteTag = (tag: TagItem): void => {
    this.props.delete(tag);
  };

  selectText(start: number, end: number): void {
    this.props.select(start, end);
  }

  draw(): any {
    this.analizeTags();
    return this.objects.map((tag: TagItem, index: number) => {
      if (tag.tag) {
        return (
          <Tag color={tag.color} key={index} className="tag">
            {tag.text + '  '}
            <b>{'(' + tag.label + ')'}</b>
            <Icon type="close" onClick={() => this.deleteTag(tag)}></Icon>
          </Tag>
        );
      } else {
        return (
          <TaggyTag offset={tag.start} tag={tag} key={index} select={this.selectText.bind(this)}></TaggyTag>
        );
      }
    });
  }

  render() {
    return <div>{this.draw()}</div>;
  }
}