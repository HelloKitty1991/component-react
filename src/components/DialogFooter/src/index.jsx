import React from 'react';
import { Button } from 'antd';

const DialogFooter = () => {
    return (
        <div className="modal-footer">
            <Button
                type="cancel"
                onClick={ this.closeDialog }
            >
                        取消
            </Button>
            <Button
                type="submit"
                onClick={ () => {} }
            >
                        提交
            </Button>
        </div>
    );
};

export default DialogFooter;
