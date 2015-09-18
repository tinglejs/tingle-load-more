# tingle-load-more [![npm version](https://badge.fury.io/js/tingle-load-more.svg)](http://badge.fury.io/js/tingle-load-more)

Load-more 是下拉加载更多插件。只控制「加载更多」状态条的显示隐藏，通知父元素进行加载。

<img src="https://img.alicdn.com/tps/TB1Dj2YJpXXXXbiXFXXXXXXXXXX-750-1254.png" width="375"/>

## Simple Usage

```javascript
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
```


## 可用配置

| 配置项 | 必填 | 默认值 | 功能/备注 |
|---|----|---|----|
|offset|optional|50| 数据（注1）|
|onLoadMore|required|Tingle.noop()| 触发加载之后的调用函数 (注2) |
|loadingText|optional|正在加载中…| 加载中的文案 |
|noMoreText|optional|没有啦！| 没有更多的文案 |


> 注1: offset 的 最小取值为 50 ，当传入的值小于 50 时，会自动传入 50 ，用以修复在某些 Android 机型上的兼容性问题。
>
> 注2: 每次当用户滑动到需要加载的位置时，load-more 会通知父级元素去加载数据，也就是通过这个函数传递。


## API接口

### .loading()

加载锁，防止重复触发 `onLoadMore` 事件。

### .loaded()

> changed in 0.2.1 : 如果不满一屏，loaded 执行自后会自动再次触发加载。

加载完成时调用的函数。

### .noMore()

没有更多了。

## Links 相关链接

- [Fire a bug/Issues 提Bug](http://github.com/tinglejs/tingle-load-more/issues)