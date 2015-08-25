# LoadMore 下拉加载更多

## tingle-load-more [![npm version](https://badge.fury.io/js/tingle-load-more.svg)](http://badge.fury.io/js/tingle-load-more)

## TL;DR

Load-more 是下拉加载更多插件。只控制「加载更多」状态条的显示隐藏，通知父元素进行加载。

![效果图](https://img.alicdn.com/tps/TB1KN4sIVXXXXbdaXXXXXXXXXXX.png_200x200.jpg)

## Simple Usage

```javascript
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

加载完成时调用的函数。

### .noMore()

没有更多了。

## Links 相关链接

- [Fire a bug/Issues 提Bug](http://github.com/tinglejs/tingle-load-more/issues)