import io from 'socket.io-client';
import React, { Component, PropTypes, Children, cloneElement } from 'react';

export default class TwitterStream extends Component {
  static propTypes = {
    track: PropTypes.array,
    children: PropTypes.node
  }

  static defaultProps = {
    track: ['rubyconfpt']
  }

  constructor(props) {
    super(props);
    this.state = { track: props.track, tweets: [] };
  }

  componentDidMount() {
    this.socket = io('localhost:4000');

    this.socket.on('tweet', this.onTweet);
  }

  componentWillUnmount() {
    this.socket.destroy();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.track)
      this.setState({ track: nextProps.track });
  }

  onTweet = tweet => this.setState({ tweets: [tweet, ...this.state.tweets] });

  get children() {
    const { tweets } = this.state;
    const { children } = this.props;

    return Children.map(children, child => cloneElement(child, { tweets }));
  }

  render() {
    return <div className="TwitterStreamContainer">
      {this.children}
    </div>;
  }
}
