const $ = require('jquery');

$.fn.extend({
    // ---元素拖动插件
    dragging() {
        const $this = $(this);
        let xPage;
        let yPage;
        let X;
        let Y;
        const father = $this.parent();
        const hander = $this;
        // ---初始化
        father.css({ position: 'absolute', overflow: 'hidden' });
        $this.css({ position: 'absolute' });
        hander.css({ cursor: 'move' });

        // var faWidth = father.width();
        // var faHeight = father.height();
        // var thisWidth = $this.width()+parseInt($this.css('padding-left'))+parseInt($this.css('padding-right'));
        // var thisHeight = $this.height()+parseInt($this.css('padding-top'))+parseInt($this.css('padding-bottom'));

        let mDown = false;
        let positionX;
        let positionY;
        let moveX;
        let moveY;

        hander.mousedown((e) => {
            father.children().css({ zIndex: '0' });
            $this.css({ zIndex: '1' });
            mDown = true;
            X = e.pageX;
            Y = e.pageY;
            positionX = $this.position().left;
            positionY = $this.position().top;
            return false;
        });

        $(document).mouseup(() => {
            mDown = false;
        });

        $(document).mousemove((e) => {
            xPage = e.pageX;
            moveX = positionX + xPage - X;

            yPage = e.pageY;
            moveY = positionY + yPage - Y;

            function thisAllMove() {
                if (mDown === true) {
                    $this.css({ left: moveX, top: moveY });
                }
            }
            thisAllMove();
        });
    }
});
