import {
    HTTP
} from '../util/http.js'

class ClassicModel extends HTTP {
    getLatest(sCallback) {
        this.request({
            url: 'classic/latest',
            success: (res) => {
                this._setLatestIndex(res.index);
                wx.setStorageSync(this._getKey(res.index), res);
                sCallback(res);
            }
        })
    }

    getClass(index, nextOrPrevious, sCallback) {
        let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
        let classic = wx.getStorageSync(key);
        if (classic) {
            sCallback(classic);
        } else {
            this.request({
                url: `classic/${index}/${nextOrPrevious}`,
                success: (res) => {
                    wx.setStorageSync(this._getKey(res.index), res);
                    sCallback(res);
                }
            });
        }
    }

    isFirst(index) {
        return index == 1 ? true : false;
    }

    isLatest(index) {
        let latestIndex = this._getLatestIndex();
        return index == latestIndex ? true : false;
    }

    getMyFavor(success) {
        const params = {
            url: 'classic/favor',
            success: success
        }
        this.request(params)
    }

    _setLatestIndex(index) {
        wx.setStorageSync('latest', index);
    }

    _getLatestIndex() {
        return wx.getStorageSync('latest');
    }

    _getKey(index) {
        return 'classic-' + index;
    }
}

export {ClassicModel}