# LoadMore 下拉加载更多

- name: tingle-load-more
- category: tingle
- tags: tingle,load-more,lodaMore,下拉,下拉加载,加载更多
- description: 下拉加载更多。
- maintainers: 九神(67732)
- version: 1.0.0
- lastupdate: 2015-07-27
- screenshots: http://aligitlab.oss-cn-hangzhou-zmf.aliyuncs.com/uploads/alinwmobile/tingle-load-more/01e5ba4132/image.png

---

## LoadMore [![Dependency Status](http://img.shields.io/david/tinglejs/tingle-load-more.svg?style=flat-square)](https://david-dm.org/tinglejs/tingle-load-more) [![devDependency Status](http://img.shields.io/david/dev/tinglejs/tingle-load-more.svg?style=flat-square)](https://david-dm.org/tinglejs/tingle-load-more#info=devDependencies)

[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]

## TL;DR

Load-more 是下拉加载更多插件。只控制「加载更多」状态条的显示隐藏，通知父元素进行加载。

![效果图](http://aligitlab.oss-cn-hangzhou-zmf.aliyuncs.com/uploads/alinwmobile/tingle-load-more/01e5ba4132/image.png)

## Simple Usage

```
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

- [Fire a bug/Issues 提Bug](http://gitlab.alibaba-inc.com/alinwmobile/tingle-load-more/issues)
- [Tingle项目](http://gitlab.alibaba-inc.com/alinwmobile/tingle/tree/master)

[travis-image]: https://img.shields.io/travis/tinglejs/tingle-load-more.svg?style=flat-square
[travis-url]: https://travis-ci.org/tinglejs/tingle-load-more
[npm-image]: https://img.shields.io/npm/v/tingle-load-more.svg?style=flat-square
[npm-url]: https://npmjs.org/package/tingle-load-more
[downloads-image]: https://img.shields.io/npm/dm/tingle-load-more.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/tingle-load-more