/**
 * Created by Administrator on 2016/10/21.
 */
import React, { Component } from 'react';
import { Icon } from 'antd';
import $ from 'jquery';
import Swiper from 'swiper';
import '../../../../utils/drag';
import ReactDom from 'react-dom';
import classnames from 'classnames';
import 'swiper/dist/css/swiper.min.css';

/*
 * 解析matrix矩阵，0°-360°，返回旋转角度
 * 当a=b||-a=b,0<=deg<=180
 * 当-a+b=180,180<=deg<=270
 * 当a+b=180,270<=deg<=360
 *
 * 当0<=deg<=180,deg=d;
 * 当180<deg<=270,deg=180+c;
 * 当270<deg<=360,deg=360-(c||d);
 * */
function getmatrix(a, b, c, d, e, f) {
    const aa = Math.round(180 * Math.asin(a) / Math.PI);
    const bb = Math.round(180 * Math.acos(b) / Math.PI);
    const cc = Math.round(180 * Math.asin(c) / Math.PI);
    const dd = Math.round(180 * Math.acos(d) / Math.PI);
    let deg = 0;
    if (aa == bb || -aa == bb) {
        deg = dd;
    } else if (-aa + bb == 180) {
        deg = 180 + cc;
    } else if (aa + bb == 180) {
        deg = 360 - cc || 360 - dd;
    }
    return deg >= 360 ? 0 : deg;
}

/* matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0) */

function getMatrixParams(matrix) {
    let a;
    let b;
    let c;
    let d;
    if (matrix == 'none') {
        return 0;
    }
    matrix = matrix.toString();
    matrix = matrix.split('(')[1].split(')')[0];
    const params = matrix.split(',');
    return getmatrix(params[0], params[1], params[2], params[3]);
}

export default class LargerImgDisplay extends Component {
    constructor(props) {
        super(props);
        this.getWidthHeight = this.getWidthHeight.bind(this);
        this.state = {
            width: 0,
            height: 0,
            photo: props.photo || {},
            photos: props.photos,
            independent: props.independent,
            index: 0
        };
        this.left = null;
        this.right = null;
        this.galleryThumbs = null;
    }

    componentDidMount() {
        setTimeout(() => {
            $('.LargeImgBox').css({
                opacity: 1
            });
        }, 1);
        //  计算当前图片在全部图片中的索引
        let index = 0;
        const { photo = {}, photos } = this.state;
        photos.map(
            (val, idx) => {
                val = val || {};
                if (val.id == photo.id) {
                    index = idx;
                }
            }
        );
        $('.large_inner_box dl').each(function () {
            $(this).dragging();
        });
        this.getWidthHeight();
        this.setState({ index }, () => {
            const galleryThumbs = new Swiper('#large_img_thumb', {
                spaceBetween: 5,
                allowTouchMove: false,
                slidesPerView: 'auto'
            });
            this.galleryThumbs = galleryThumbs;
            $(this.left).on('click', (e) => {
                e.preventDefault();
                updateNavPosition('left');
            });
            $(this.right).on('click', (e) => {
                e.preventDefault();
                updateNavPosition('right');
            });

            const updateNavPosition = (direction) => {
                $('.swiper-wrapper .active-nav').removeClass('active-nav');
                const { index, photos } = this.state;
                let nextIndex;
                if (direction === 'left') {
                    nextIndex = index === 0 ? (photos.length - 1) : index - 1;
                } else {
                    nextIndex = index === (photos.length - 1) ? 0 : (index + 1);
                }
                const activeNav = $('.swiper-wrapper .swiper-slide').eq(nextIndex).addClass('active-nav');
                const slidesPerView = Math.floor(galleryThumbs.width / activeNav.width());
                const totalSlide = Math.floor(photos.length / slidesPerView) + 1;
                if (direction === 'left') {
                    if (index === 0) {
                        galleryThumbs.slideTo(totalSlide - 1);
                    } else if (nextIndex % slidesPerView === 0) {
                        galleryThumbs.slidePrev();
                    }
                } else if (direction === 'right') {
                    if (index === photos.length - 1) {
                        galleryThumbs.slideTo(0);
                    } else if (nextIndex % slidesPerView === 0) {
                        galleryThumbs.slideNext();
                    }
                }
                this.reset();
                this.getWidthHeight(photos[nextIndex].photo);
                this.setState({ index: nextIndex, photo: photos[nextIndex] || {} });
            };
        });
    }

    handleSlideTo = (index) => {
        const { galleryThumbs } = this;
        const { photos } = this.props;
        if (galleryThumbs) {
            $('.swiper-wrapper .active-nav').removeClass('active-nav');
            $('.swiper-wrapper .swiper-slide').eq(index).addClass('active-nav');
            this.reset();
            this.getWidthHeight(photos[index].photo);
            this.setState({ index, photo: photos[index] });
        }
    }

    //  判断图片宽高之比，确定渲染高度百分比或高度百分比
    getWidthHeight = (photo) => {
        /* 获取盒子宽高之比 */
        const boxWidth = $('.large_inner_box').width() * 0.8;
        const boxHeight = $('.large_inner_box').height();
        const Ratio1 = boxWidth / boxHeight;
        /* 获取图片宽高之比 */
        let imgNode = document.createElement('img');
        imgNode.src = photo || this.state.photo.photo;
        imgNode.onload = () => {
            const imgWidth = imgNode.width;
            const imgHeight = imgNode.height;
            const Ratio2 = imgWidth / imgHeight;

            if (Ratio2 > Ratio1) {
                $('.large_img').css({
                    width: boxWidth,
                    height: 'auto'
                });
            } else {
                $('.large_img').css({
                    width: (boxHeight / imgHeight) * imgWidth,
                    height: boxHeight
                });
            }
            imgNode = null;
        };
    }

    Close(e) {
        e.stopPropagation();
        const div = document.getElementById('zeus_photo_view');
        const unmountResult = ReactDom.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }

    zoomIn(e) {
        e.stopPropagation();
        $('.large_img').css({
            width: $('.large_img').width() + 100,
            height: 'auto'
        });
    }

    zoomOut(e) {
        e.stopPropagation();
        $('.large_img').css({
            width: $('.large_img').width() - 100,
            height: 'auto'
        });
    }

    rotate(e) {
        e.stopPropagation();
        $('.large_img').css({
            transform: `rotate(${getMatrixParams($('.large_img').css('transform')) + 90}deg)`
        });
    }

    reset = (e) => {
        e && e.stopPropagation();
        $('.large_img').css({
            transform: 'rotate(0deg)'
        });
        $('.drag_box').css({
            top: 0
        });
        this.getWidthHeight();
    }

    render() {
        const { photos } = this.props;
        const { index } = this.state;
        return (
            <div
                className="box large_img_box"
                onClick={ (e) => this.Close(e) }
            >
                <div className="close_btn"><img src={require('./images/close.png')}/></div>
                <div style={ {
                    width: '80%', height: '80%', margin: 'auto', position: 'relative' 
                } }
                onClick={ (e) => e.stopPropagation() }
                >
                    <div
                        className="large_inner_box"
                        onClick={ (e) => e.stopPropagation() }
                    >
                        <dl style={ { top: 0 } }
                            className="drag_box"
                        >
                            <img
                                className="large_img inner_box_img"
                                src={ this.state.photo ? this.state.photo.photo || this.state.photo[0] : '' }
                            />
                        </dl>
                    </div>
                    <div className="btn">
                        <div onClick={ (e) => this.zoomIn(e) }
                            style={ { cursor: 'pointer', marginRight: 20 } }
                        >
                            <img src={require('./images/zoomIn.png')}
                                width="32px"
                            />
                            <div className="font_style">放大</div>
                        </div>
                        <div
                            style={ { marginTop: 30, cursor: 'pointer', marginRight: 20 } }
                            onClick={ (e) => this.zoomOut(e) }
                        >
                            <img src={require('./images/zoomOut.png')}
                                width="32px"
                            />
                            <div className="font_style">缩小</div>
                        </div>
                        <div
                            style={ { marginTop: 30, cursor: 'pointer', marginRight: 20 } }
                            onClick={ (e) => this.rotate(e) }
                        >
                            <img src={require('./images/rotate.png')}
                                width="32px"
                            />
                            <div className="font_style">旋转</div>
                        </div>
                        <div
                            style={ { marginTop: 30, cursor: 'pointer', marginRight: 20 } }
                            onClick={ (e) => this.reset(e) }
                        >
                            <img src={require('./images/reset.png')}
                                width="32px"
                            />
                            <div className="font_style">重置</div>
                        </div>
                    </div>
                    {
                        !this.props.independent
                        && <div className={ 'thumb-container clearfix' }>
                            <div ref={node => { this.left = node; }}
                                style={ { display: photos.length > 1 && index > 0 ? 'block' : 'none' } }
                            >
                                <Icon
                                    className="arrow_icon"
                                    type="arrow-left"
                                />
                            </div>
                            <div style={ { maxWidth: 400 } }>
                                <div className={'swiper-container'}
                                    id="large_img_thumb"
                                >
                                    <div className="swiper-wrapper">
                                        {
                                            photos.map((val, idx) => (
                                                <div
                                                    key={idx}
                                                    onClick={ () => this.handleSlideTo(idx) }
                                                    className={ classnames({
                                                        'swiper-slide': true,
                                                        'active-nav': idx === index
                                                    }) }
                                                    style={ { height: 70 } }
                                                >
                                                    <img
                                                        style={ { width: '100%', height: '100%' } }
                                                        src={ val ? val.photo : '' }
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div ref={node => { this.right = node; }}
                                style={ { display: photos.length > 1 && index < photos.length - 1 ? 'block' : 'none' } }
                            >
                                <Icon
                                    className="arrow_icon"
                                    type="arrow-right"
                                />
                            </div>
                        </div>
                    }
                    {
                        this.props.leftNode ? (
                            <div
                                className={ this.props.independent ? 'tip_independent' : 'tip_message' }
                            >
                                { this.props.leftNode }
                            </div>
                        ) : null
                    }
                </div>

            </div>
        );
    }
}
