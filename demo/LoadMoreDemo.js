/**
 * LoadMore Component Demo for tingle
 * @auther yize
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
var classnames = require('classnames');
var Context = require('tingle-context');

var LoadMore = require('../src');

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 10,
            loadTimes: 1
        }
    }


    componentDidMount() {
        // 默认需要直接先初始化一次
        this.startLoad();
    }

    startLoad() {
        var t = this;
        var loadMore = this.refs.loadMore;
        // 上锁
        loadMore.loading();
        // simulate ajax
        setTimeout(()=> {
                if (t.state.loadTimes < 5) {
                    t.setState({loadTimes: ++this.state.loadTimes});
                    loadMore.loaded()
                } else {
                    loadMore.noMore();
                }
            }
            , 500);
    }

    render() {
        var children = [];
        for (var i = 1; i <= this.state.count * this.state.loadTimes; i++) {
            children.push(<p key={Context.getTID()} className="tDemoP tFAC">{i}</p>)
        }
        return (
            <div>
                {children}
                <LoadMore className="tFAC" offset={50} onLoadMore={this.startLoad.bind(this)} ref='loadMore'>
                </LoadMore>
            </div>
        );
    }
}


module.exports = Demo;
