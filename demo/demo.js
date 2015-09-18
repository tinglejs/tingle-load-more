/**
 * LoadMore Component Demo for tingle
 * @auther yize
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

const Context = require('tingle-context');
const LoadMore = require('../src');

const URL = "./demo/testData.json";

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1
        }
    }


    componentDidMount() {
        // 默认需要直接先初始化一次
        this.startLoad();
    }

    startLoad() {
        const t = this;
        let loadMore = t.refs.loadMore;

        // 告诉 LoadMore 开始加载了，LoadMore 会显示正在加载中
        loadMore.loading();

        $.getJSON(URL, {page: t.state.page}, function (d) {
            if (d.success) {
                let data = t.state.data.concat(d.data);
                t.setState({data: data, page: ++t.state.page});
                if(d.hasMore){
                    // 告诉 LoadMore 加载完成 ， 如果不告知 LoadMore 已经加载完成，LoadMore 不会再监听下一次的 inViewPort 事件
                    loadMore.loaded();
                }else{
                    // 告诉 LoadMore 已经没有更多了，LoadMore 会显示没有更多。
                    loadMore.noMore();
                }
            }
        })
    }

    render() {
        return (
            <div>
                {this.state.data.map(function (d) {
                    return (<p key={Context.getTID()} className="tDemoP tFAC">{d}</p>);
                })}
                <LoadMore className="tFAC" offset={50} onLoadMore={this.startLoad.bind(this)} ref='loadMore'>
                </LoadMore>
            </div>
        );
    }
}

module.exports = Demo;