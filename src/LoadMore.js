/**
 * LoadMore Component for tingle
 * @author iThans
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

var Context = require('tingle-context');
var classnames = require('classnames');
var inViewPort = require('in-viewport');

var LOADING = 'loading';
var NOMORE = 'noMore';

class LoadMore extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            load: LOADING
        }
    }

    componentDidMount() {
        var t = this;
        var el = React.findDOMNode(t);

        var offset = t.props.offset >= 50 ? t.props.offset : 50;

        // see https://github.com/vvo/in-viewport
        this.watcher = inViewPort(el, {
            offset: offset
        }, t._handleLoadEvents.bind(t));
    }

    componentWillUnmount() {
        this.watcher.dispose();
    }

    _handleLoadEvents(e) {
        this.props.onLoadMore && this.props.onLoadMore({loadState: this.state.load})
    }

    loaded() {
        this.setState({load: LOADING});
        this.watcher.watch();
    }

    noMore() {
        this.setState({load: NOMORE});
        this.watcher.watch();
    }

    render() {
        var t = this;
        var text = '';
        switch (t.state.load) {
            case LOADING:
                text = t.props.loadingText;
                break;
            case NOMORE:
                text = t.props.noMoreText;
        }
        return (<div className={classnames({
            'tLoadMore': true,
            [t.props.className]: !!t.props.className,
            [t.state.load]: !!t.state.load
        })}>{text}</div>);
    }
}
LoadMore.defaultProps = {
    offset: 50,
    onLoadMore: Context.noop,
    loadingText: '正在加载中…',
    noMoreText: '没有啦！'
};

// http://facebook.github.io/react/docs/reusable-components.html
LoadMore.propTypes = {
    offset: React.PropTypes.number,
    onLoadMore: React.PropTypes.func,
    loadingText: React.PropTypes.string,
    noMoreText: React.PropTypes.string
};

module.exports = LoadMore;
