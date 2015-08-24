/**
 * LoadMore Component for tingle
 * @author yize
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

const React = require('react');
const Context = require('tingle-context');
const classnames = require('classnames');
const LOADING = 'loading';
const NOMORE = 'noMore';

class LoadMore extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            load: LOADING
        }
    }

    componentDidMount() {
        const t = this;

        document.addEventListener('scroll', this._onScroll.bind(t), false);
        document.addEventListener('resize', this._onScroll.bind(t), false);
    }

    componentWillUnmount() {
        const t = this;

        document.removeEventListener('scroll', this._onScroll.bind(t), false);
        document.removeEventListener('resize', this._onScroll.bind(t), false);
    }

    loaded() {
        this.setState({load: LOADING});
        this.isLoading = false;
        this._unLock();
    }

    // lock
    loading() {
        this.isLoading = true;
    }
    
    _canLoad(){
        return !this.isLoading && this.state.load !== NOMORE;
    }

    _canLoad(){
        return !this.isLoading && this.state.load !== NOMORE;
    }

    noMore() {
        this.setState({load: NOMORE});
        this._unLock();
    }

    render() {
        const t = this;

        let text = '';

        switch (t.state.load) {
            case
            LOADING:
                text = t.props.loadingText;
                break;
            case
            NOMORE:
                text = t.props.noMoreText;
        }
        return (<div ref="root" className={classnames({
            'tLoadMore': true,
            [t.props.className]: !!t.props.className,
            [t.state.load]: !!t.state.load
        })}>{text}</div>);
    }

    _isVisible(el, offset) {
        const t = this;
        offset = t.props.offset >= 50 ? t.props.offset : 50;
        // Check if the element is visible
        // https://github.com/jquery/jquery/blob/740e190223d19a114d5373758127285d14d6b71e/src/css/hiddenVisibleSelectors.js
        if (!el.offsetWidth || !el.offsetHeight) {
            return false;
        }

        const eltRect = el.getBoundingClientRect();

        return eltRect.top < document.documentElement.clientHeight + offset;
    }

    _onScroll() {
        var t = this;

        var el = React.findDOMNode(t.refs.root);

        if (!el || !t._canLoad()) {
            return;
        }

        if (t._isVisible(el, this.offset)) {
            t.loading();
            t._handleLoadEvents();
        }
    }

    _handleLoadEvents() {
        this.props.onLoadMore && this.props.onLoadMore({loadState: this.state.load})
    }

    _isLoading() {
        return this.isLoading;
    }

    _unLock() {
        this.isLoading = false;
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
